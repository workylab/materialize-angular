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
  <a href="https://codeclimate.com/github/codeclimate/codeclimate/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/b87b6059adefcd07fbd8/maintainability" alt="Codeclimate analyze" />
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
## Documentation
## Supported Browsers
## Changelog
## Testing
## Contributing
## Copyright and license
&copy; 2019 [WorkyLab](https://github.com/workylab) This project is licensed under the MIT License - see the [license file](LICENSE) for details.
## Install
npm install materialize-angular

## Add to angular project
```bash
angular.json -> 
  {
    ...
    "projects": {
      [your-project-name]: {
        ...
        "architect": {
          ...
          "build": {
            ...
            "options": {
              ...
              "assets": [
                ...
                {
                  "glob": "**/*",
                  "input": "./node_modules/materialize-angular/fonts/assets",
                  "output": "src/assets/fonts/"
                }
                ...
              ]
              ...
            }
            ...
          }
          ...
        }
        ...
      }
    }
    ...
  }
```

## Add Styles
```bash
styles.scss -> 

$materialize-fonts-path: '../node_modules/materialize-angular/fonts/assets';
@import 'materialize-angular/styles/materialize-angular.scss';
```
