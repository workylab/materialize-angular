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
    <img src="https://circleci.com/gh/workylab/materialize-angular/tree/master.svg?style=svg" alt="Circle CI badge">
  </a>
  <a href="https://badge.fury.io/js/materialize-css">
    <img src="https://badge.fury.io/js/materialize-angular.svg" alt="npm version badge">
  </a>
  <a href="https://david-dm.org/workylab/materialize-angular">
    <img src="https://david-dm.org/workylab/materialize-angular.svg" alt="dependencies Status badge">
    </a>
  <a href="https://david-dm.org/workylab/materialize-angular#info=devDependencies">
    <img src="https://david-dm.org/workylab/materialize-angular/dev-status.svg" alt="devDependency Status badge">
  </a>
  <a href="https://spectrum.chat/materialize">
    <img alt="Join the community on Spectrum" src="https://withspectrum.github.io/badge/badge.svg" />
  </a>
</p>

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
styles.scss -> 

$materialize-fonts-path: '../node_modules/materialize-angular/fonts/assets';
@import 'materialize-angular/styles/materialize-angular.scss';
