<p align="center">
  <a href="http://materialize-angular.workylab.com/">
    <img src="https://res.cloudinary.com/workylab/image/upload/v1567652656/materialize-angular_logo.png" width="150">
  </a>
</p>

<h3 align="center">Materialize Angular</h3>

<p align="center">
  Materialize Angular, easiest way to create awesome websites.
  <br>
  <a href="http://materialize-angular.workylab.com/"><strong>-- Check our site --</strong></a>
  <br>
  <br>
  <a href="https://circleci.com/gh/workylab/materialize-angular">
    <img src="https://circleci.com/gh/workylab/materialize-angular/tree/master.svg?style=svg" alt="Circle CI badge" />
  </a>
  <a href="https://badge.fury.io/js/materialize-angular">
    <img src="https://badge.fury.io/js/materialize-angular.svg" alt="npm version badge" />
  </a>
  <a href="https://david-dm.org/workylab/materialize-angular">
    <img src="https://david-dm.org/workylab/materialize-angular.svg" alt="dependencies Status badge" />
    </a>
  <a href="https://david-dm.org/workylab/materialize-angular#info=devDependencies">
    <img src="https://david-dm.org/workylab/materialize-angular/dev-status.svg" alt="devDependency Status badge" />
  </a>
  <a href="https://spectrum.chat/materialize">
    <img src="https://withspectrum.github.io/badge/badge.svg" alt="Join the community on Spectrum" />
  </a>
  <a href="https://codeclimate.com/github/workylab/materialize-angular/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/b87b6059adefcd07fbd8/maintainability" />
  </a>
  <a href="https://codeclimate.com/github/workylab/materialize-angular/test_coverage">
    <img src="https://api.codeclimate.com/v1/badges/b87b6059adefcd07fbd8/test_coverage" />
  </a>
  <a href="https://npmjs.com/package/materialize-angular">
    <img src="https://img.shields.io/npm/dm/materialize-angular.svg" alt="Monthly npm downloads" />
  </a>
</p>

## Table of contents

- [Why Materialize Angular](#why-materialize-angular)
- [Quickstart](#quickstart)
- [Documentation](#documentation)
- [Available Features](#available-features)
- [Supported Browsers](#supported-browsers)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [Copyright and license](#copyright-and-license)

## Why Materialize Angular

Materialize Angular is a library to help you easily doing beautiful websites. The goal of the project is to help the user in the creation of websites based on Angular and using the Material Design specification. Also, we are trying to do awesome and best quality components for different website types.

It's a very early version but it is ready for production environments. We're working on LTS versions and try to do the library compatible with different Angular versions.

## Quickstart

#### Step 1: Install npm package:
```bash
  npm install --save materialize-angular
```

#### Step 2: Add styles
Import materialize angular styles by writing the following lines in your `styles.scss`file (it is located in `my-project/src/styles.scss`)

```SASS
$materialize-fonts-path: '~materialize-angular/fonts';

@import '~materialize-angular/styles/materialize-angular.scss';
```

#### Step 3: Import component modules in your app module:
Import just specific components by importing each one like `MaterializeButtonModule`, `MaterializeCardModule`, etc.

```typescript
import { Component, NgModule } from '@angular/core';
import { MaterializeButtonModule, MaterializeCardModule } from 'materialize-angular';

@NgModule({
  imports: [
    MaterializeButtonModule,
    MaterializeCardModule
  ]
})
export class MyModule {}
```

#### Step 4: Use imported components:
Finally use the imported components into your apps components:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-demo',
  template: `
    <materialize-card>
      <materialize-button>Hello From Materialize Angular!</materialize-button>
    </materialize-card>
  `
})
export class MyDemoComponent {}
```

## Documentation

Documentation is available on the [Materialize Angular](https://materialize-angular-guide.workylab.now.sh/home) docs site.

## Available features

| Components       | Docs         |
| ---------------- | ------------ |
| Accordion        | [Docs][1]    |
| Collapsible      | [Docs][2]    |
| Button           | [Docs][3]    |
| Calendar         | [Docs][4]    |
| Dropdown         | [Docs][5]    |
| Glossary         | [Docs][31]   |
| HTML Visualizer  | [Docs][32]   |
| List             | [Docs][6]    |
| List Item        | [Docs][33]   |
| Modal            | [Docs][7]    |
| Scroll Spy       | [Docs][34]   |
| Table            | [Docs][8]    |
| Tooltip          | [Docs][9]    |

| Forms            | Docs         |
| ---------------- | ------------ |
| Button Toggle    | [Docs][10]   |
| Checkbox         | [Docs][11]   |
| Checkbox List    | [Docs][12]   |
| Date Picker      | [Docs][13]   |
| Form Prefix      | [Docs][28]   |
| Form Suffix      | [Docs][29]   |
| Input            | [Docs][14]   |
| Label            | [Docs][15]   |
| Message          | [Docs][15]   |
| Radio            | [Docs][16]   |
| Select           | [Docs][17]   |
| Slider           | [Docs][18]   |
| Switch           | [Docs][19]   |
| Textarea         | [Docs][20]   |

| CSS              | Docs         |
| ---------------- | ------------ |
| Card             | [Docs][21]   |
| Divider          | [Docs][22]   |
| Icon             | [Docs][23]   |
| Ripple           | [Docs][24]   |

| Layout           | Docs         |
| ---------------- | ------------ |
| Drawer           | [Docs][25]   |
| Navbar           | [Docs][26]   |
| Tab              | [Docs][27]   |

 [1]: https://materialize-angular-guide.workylab.now.sh/components/accordion
 [2]: https://materialize-angular-guide.workylab.now.sh/components/collapsible
 [3]: https://materialize-angular-guide.workylab.now.sh/components/button
 [4]: https://materialize-angular-guide.workylab.now.sh/components/calendar
 [5]: https://materialize-angular-guide.workylab.now.sh/components/dropdown
 [6]: https://materialize-angular-guide.workylab.now.sh/components/list
 [7]: https://materialize-angular-guide.workylab.now.sh/components/modal
 [8]: https://materialize-angular-guide.workylab.now.sh/components/table
 [9]: https://materialize-angular-guide.workylab.now.sh/components/tooltip
 [10]: https://materialize-angular-guide.workylab.now.sh/forms/button-toggle
 [11]: https://materialize-angular-guide.workylab.now.sh/forms/checkbox
 [12]: https://materialize-angular-guide.workylab.now.sh/forms/checkbox-list
 [13]: https://materialize-angular-guide.workylab.now.sh/forms/date-picker
 [14]: https://materialize-angular-guide.workylab.now.sh/forms/input
 [15]: https://materialize-angular-guide.workylab.now.sh/forms/label
 [16]: https://materialize-angular-guide.workylab.now.sh/forms/radio
 [17]: https://materialize-angular-guide.workylab.now.sh/forms/select
 [18]: https://materialize-angular-guide.workylab.now.sh/forms/slider
 [19]: https://materialize-angular-guide.workylab.now.sh/forms/switch
 [20]: https://materialize-angular-guide.workylab.now.sh/forms/textarea
 [21]: https://materialize-angular-guide.workylab.now.sh/css/card
 [22]: https://materialize-angular-guide.workylab.now.sh/css/divider
 [23]: https://materialize-angular-guide.workylab.now.sh/css/icon
 [24]: https://materialize-angular-guide.workylab.now.sh/css/ripple
 [25]: https://materialize-angular-guide.workylab.now.sh/layout/drawer
 [26]: https://materialize-angular-guide.workylab.now.sh/layout/navbar
 [27]: https://materialize-angular-guide.workylab.now.sh/layout/tab
 [28]: https://materialize-angular-guide.workylab.now.sh/forms/form-prefix
 [29]: https://materialize-angular-guide.workylab.now.sh/forms/form-suffix
 [30]: https://materialize-angular-guide.workylab.now.sh/forms/message
 [31]: https://materialize-angular-guide.workylab.now.sh/components/glossary
 [32]: https://materialize-angular-guide.workylab.now.sh/components/html-visualizer
 [33]: https://materialize-angular-guide.workylab.now.sh/components/list-item
 [34]: https://materialize-angular-guide.workylab.now.sh/components/scroll-spy
 
 ## Supported Browsers

| Browser           | Supported versions |
| ----------------- | ------------------ |
| Google Chrome     | 75+                |
| Safari            | 12.1+              |
| Edge              | 18+                |
| Firefox           | 68+                |
| Internet Explorer | 11+                |

## Changelog
[Learn about the latest improvements](CHANGELOG.md).

## Contributing
[Workylab](https://github.com/workylab) welcomes contributions to this project. When contributing, please [follow this steps](CONTRIBUTING.md).

## Copyright and license
&copy; 2019 [WorkyLab](https://github.com/workylab) This project is licensed under the MIT License - see the [license file](LICENSE) for details.
