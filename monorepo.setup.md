# How to setup a monorepo project with lerna

Lerna : https://github.com/lerna/lerna

### Setup Lerna

<!-- 1. Install lerna `npm install --g lerna` -->

2. Initialize lerna `npx lerna init`

### Setup react app inside /packages

1. Creates main application `npx create-react-app main-app`
2. Creates first sub app `npx create-react-app child-app-1`

### Connect learna with react

1. mark npmClient as npm in lerna.json
   - ` "npmClient": "npm"`
2. Add workspace to lerna package.json

   - "workspaces":[
     "packages/*"
     ],

3. Add prefix for all your app name inside package.json. Ex: `@jithinolickal/root`, `@jithinolickal/main-app`, `@jithinolickal/child-app-1`
4. make changes in child-app-1 and update index.js for just to export the components that needs to be shared
5. Update entry point for child-app-1 inside package.json. `"main":"./src/index.js"`
6. import the component to main-app
   - `import { Button } from '@jithinolickal/child-app-1';`
7. add child as a dependency to main-app (use any one option)
   - manually add child component reference to main app. Ex: `"@jithinolickal/child-app-1": "^0.1.0",`
   - run `lerna add @jithinolickal/child-app-1 --scope=@jithinolickal/main-app`
8. Install craco to configure webpack without ejecting `npm install @craco/craco --save-dev`
9. Create craco.config.js and add configuration (refer file) under /main-app/
10. Update scripts to use craco inside main-app
   - `"start": "craco start"`
11. Remove node_modules from packages (individual apps) - `npx lerna clean -y`
12. Create dependency in root level inside lerna (Installs dependecies from package.json file inside each app and creates one common node_modules)
    - `npx lerna bootstrap`
13. Add scripts to lerna package.json file
    - "scripts": {
      "start": "lerna exec --scope @jithinolickal/main-app -- npm start",
      "new-version": "lerna version --conventional-commits --yes",
      "diff": "lerna diff"
      },

### Start Application

`npm start`


## Possible errors

#### Support for the experimental syntax 'jsx' isn't currently enabled

   - Create new file under child-app-1 - babel.config.js and add below config
   - module.exports = {
     presets:[
     "@babel/preset-env",
     "@babel/preset-react"
     ]
     }
