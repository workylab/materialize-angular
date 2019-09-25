/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { config } from '../../config';
import { HTMLVisualizerModel } from './html-visualizer.model';

@Component({
  selector: `${ config.components.prefix }-html-visualizer`,
  templateUrl: './html-visualizer.component.html'
})
export class HTMLVisualizerComponent implements HTMLVisualizerModel, OnInit {
  static readonly ATTRIBUTE_CLASS = `${ config.components.prefix }-html-visualizer-attribute`;
  static readonly VALUE_CLASS = `${ config.components.prefix }-html-visualizer-value`;
  static readonly SYMBOL_CLASS = `${ config.components.prefix }-html-visualizer-symbol`;

  static readonly defaultProps: HTMLVisualizerModel = {
    className: '',
    html: ''
  };

  @Input() className: string = HTMLVisualizerComponent.defaultProps.className;
  @Input() html: string = HTMLVisualizerComponent.defaultProps.html;

  public htmlContent: SafeHtml;
  public prefix = config.components.prefix;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.htmlContent = this.render(this.html);
  }

  render(html: string): string {
    const tags = this.splitByTags(html);
    const lines = [];

    let depth = 0;

    for (let i = 0; i < tags.length; i++) {
      const currentTag = tags[i];
      const nextTag = tags[i + 1];
      const lastTag = tags[i + 2];

      const result = this.createLineLogic(currentTag, nextTag, lastTag, depth, i);

      depth = result.depth;
      i = result.cycle;
      lines.push(result.line);
    }

    return lines.join('<br />');
  }

  createNode(content: string, className: string) {
    let escapedContent = content.replace(/&/g, '&amp;');

    escapedContent = escapedContent.trim();
    escapedContent = escapedContent.replace(/\[\[/g, '&#123&#123;');
    escapedContent = escapedContent.replace(/\]\]/g, '&#125&#125;');

    escapedContent = escapedContent.replace(/</g, '&lt;');
    escapedContent = escapedContent.replace(/>/g, '&gt;');

    escapedContent = escapedContent.replace(/(\S+)="([^']*?)"/g, match => {
      const value = match.match(/"([^']*?)"/g);
      const attribute = match.match(/(\S+)=/g);
      const attributeValidated = (attribute && attribute[0]) || '';
      const valueValidated = (value && value[0]) || '';

      const attributeTag = `<span class="${ HTMLVisualizerComponent.ATTRIBUTE_CLASS }">${ attributeValidated }</span>`;
      const valueTag = `<span class="${ HTMLVisualizerComponent.VALUE_CLASS }">${ valueValidated }</span>`;

      return attributeTag + valueTag;
    });

    escapedContent = escapedContent.replace(/(&lt;\/|&lt;)/g, match =>
      `<span class="${ HTMLVisualizerComponent.SYMBOL_CLASS }">&lt;${ match.includes('/') ? '/' : '' }</span>`
    );

    escapedContent = escapedContent.replace(/(\/&gt;|&gt;)/g, match =>
      `<span class="${ HTMLVisualizerComponent.SYMBOL_CLASS }">${ match.includes('/') ? '/' : '' }&gt;</span>`
    );

    return `<span class="${ className }">${ escapedContent }</span>`;
  }

  indentNode(depth: number, content: string) {
    const indentationBase = '&emsp;&emsp;';
    const indentation = indentationBase.repeat(depth);

    return `${ indentation }${ content }`;
  }

  splitByTags(xml: string): Array<string> {
    const tags = xml.split(/(<\/?[^>]+>)/g);
    const cleanedTags = tags.filter(line => line.trim() !== '');

    return cleanedTags;
  }

  isTag(contentNode: string): boolean {
    return (/<[^>!]+>/).test(contentNode);
  }

  isOpeningTag(contentNode: string): boolean {
    if (this.isTag(contentNode) && !this.isClosingTag(contentNode) && !this.isSelfClosingTag(contentNode)) {
      return true;
    }

    return false;
  }

  isClosingTag(contentNode: string): boolean {
    return (/<\/+[^>]+>/).test(contentNode);
  }

  isSelfClosingTag(contentNode: string): boolean {
    return (/<[^>]+\/>/).test(contentNode);
  }

  createLineLogic(firstTag: string, middleTag: string, lastTag: string, depth: number, cycle: number): any {
    if (this.isOpeningTag(firstTag) && this.isClosingTag(middleTag)) {
      const openNode = this.createNode(firstTag, 'tag');
      const closeNode = this.createNode(middleTag, 'tag');

      return {
        cycle: cycle + 1,
        depth: depth,
        line: this.indentNode(depth, `${ openNode }${ closeNode }`)
      };
    }

    if (this.isOpeningTag(firstTag) && !this.isTag(middleTag)) {
      const openNode = this.createNode(firstTag, 'tag');
      const contentNode = this.createNode(middleTag, 'string');
      const closeNode = this.createNode(lastTag, 'tag');

      return {
        cycle: cycle + 2,
        depth: depth,
        line: this.indentNode(depth, `${ openNode }${ contentNode }${ closeNode }`)
      };
    }

    if (this.isSelfClosingTag(firstTag)) {
      const selfClosingNode = this.createNode(firstTag, 'tag');

      return {
        cycle: cycle,
        depth: depth,
        line: this.indentNode(depth, selfClosingNode)
      };
    }

    if (this.isClosingTag(firstTag)) {
      const closeNode = this.createNode(firstTag, 'tag');

      return {
        cycle: cycle,
        depth: depth - 1,
        line: this.indentNode(depth - 1, closeNode)
      };
    }

    return {
      cycle: cycle,
      depth: depth + 1,
      line: this.indentNode(depth, this.createNode(firstTag, 'text'))
    };
  }
}
