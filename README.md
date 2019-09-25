<p align="center">
  <a href="http://materialize-angular.workylab.com/">
    <img src="https://res.cloudinary.com/workylab/image/upload/v1567652656/materialize-angular_logo.png" width="150">
  </a>
</p>

<h3 align="center">Materialize Angular</h3>

<p align="center">
  Materialize Angular, easiest way to create awesome websites.
  <br>
  <a href="https://materialize-angular.workylab.com/"><strong>-- Check our site --</strong></a>
  <br>
  <a href="https://workylab.github.io/materialize-angular"><strong>-- Check our Github pages site --</strong></a>
  <br>
  <br>
  <a href="https://www.patreon.com/materialize_angular"> <img src="https://img.shields.io/endpoint.svg?url=https://shieldsio-patreon.herokuapp.com/materialize_angular" />
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

## Raising funds

`materialize-angular` is not backed by a company (yet :D), so the future of this project depends on you. Become a [Patreon](https://www.patreon.com/materialize_angular), check Github Sponsor or [contact us](https://workylab.com/) directly.

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

Documentation is available on the [Materialize Angular](https://materialize-angular.workylab.com/) docs site. Also, if you can't access to our domain, you can access using our [Github pages](https://workylab.github.io/materialize-angular)

## Available features

| Components       | Docs         |
| ---------------- | ------------ |
| Accordion        | [Docs][1]    |
| Button           | [Docs][2]    |
| Card             | [Docs][3]    |
| Calendar         | [Docs][4]    |
| Collapsible      | [Docs][5]    |
| Icon             | [Docs][6]    |
| Modal            | [Docs][7]    |
| Ripple           | [Docs][8]    |

| Forms            | Docs         |
| ---------------- | ------------ |
| Button Toggle    | [Docs][9]    |
| Checkbox         | [Docs][10]   |
| Input            | [Docs][11]   |
| Label            | [Docs][12]   |
| Message          | [Docs][13]   |
| Radio            | [Docs][14]   |
| Select           | [Docs][15]   |
| Slider           | [Docs][16]   |
| Switch           | [Docs][17]   |
| Textarea         | [Docs][18]   |

| Layout           | Docs         |
| ---------------- | ------------ |
| Drawer           | [Docs][19]   |
| Navbar           | [Docs][20]   |
| Tab              | [Docs][21]   |

 [1]: https://materialize-angular.workylab.com/guide/components/accordion
 [2]: https://materialize-angular.workylab.com/guide/components/button
 [3]: https://materialize-angular.workylab.com/guide/components/card
 [4]: https://materialize-angular.workylab.com/guide/components/calendar
 [5]: https://materialize-angular.workylab.com/guide/components/collapsible
 [6]: https://materialize-angular.workylab.com/guide/components/icon
 [7]: https://materialize-angular.workylab.com/guide/components/modal
 [8]: https://materialize-angular.workylab.com/guide/components/ripple
 [9]: https://materialize-angular.workylab.com/guide/forms/button-toggle
 [10]: https://materialize-angular.workylab.com/guide/forms/checkbox
 [11]: https://materialize-angular.workylab.com/guide/forms/input
 [12]: https://materialize-angular.workylab.com/guide/forms/label
 [13]: https://materialize-angular.workylab.com/guide/forms/message
 [14]: https://materialize-angular.workylab.com/guide/forms/radio
 [15]: https://materialize-angular.workylab.com/guide/forms/select
 [16]: https://materialize-angular.workylab.com/guide/forms/slider
 [17]: https://materialize-angular.workylab.com/guide/forms/switch
 [18]: https://materialize-angular.workylab.com/guide/forms/textarea
 [19]: https://materialize-angular.workylab.com/guide/layout/drawer
 [20]: https://materialize-angular.workylab.com/guide/layout/navbar
 [21]: https://materialize-angular.workylab.com/guide/layout/tab

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
