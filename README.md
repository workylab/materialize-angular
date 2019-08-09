<p align="center">
  <a href="http://materialize-angular.workylab.com/">
    <img src="https://workylab.com/img/logos/materialize-logo.png" width="150">
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

- [Quickstart](#quickstart)
- [Documentation](#documentation)
- [Supported Browsers](#supported-browsers)
- [Changelog](#changelog)
- [Testing](#testing)
- [Contributing](#contributing)
- [Copyright and license](#copyright-and-license)

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

## Supported Browsers

| Browser   | Supported versions |
| ------------- | ------------- |
| Google Chrome  | 75  |
| Safari  | 12.1  |
| Edge  | 18  |
| Firefox  | 68  |
| Internet Explorer  | 11  |

## Changelog
[Learn about the latest improvements](CHANGELOG.md).

## Contributing
[Workylab](https://github.com/workylab) welcomes contributions to this project. When contributing, please [follow this steps](CONTRIBUTING.md).

## Copyright and license
&copy; 2019 [WorkyLab](https://github.com/workylab) This project is licensed under the MIT License - see the [license file](LICENSE) for details.
