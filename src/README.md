# Materialize Angular

## Install
npm install materialize-angular

## Add to angular project
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


## Add Styles
styles.scss -> 

$materialize-fonts-path: '../node_modules/materialize-angular/fonts/assets';
@import 'materialize-angular/styles/materialize-angular.scss';
