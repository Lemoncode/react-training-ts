# 00 Boilerplate

In this sample we are going to setup the basic plumbing to "build" our project and launch it in a dev server.

We will setup an initial npm project, give support to TypeScript, and install React.
Then we will create a **helloworld.ts** sample.

Summary steps:

- Prerequisites: Install Node.js
- Initialize **package.json** (with `npm init`)
- Install:
    - [Webpack 2](https://github.com/webpack/webpack) and [webpack-dev-server 2](https://github.com/webpack/webpack-dev-server) and loaders.
    - [TypeScript](https://github.com/Microsoft/TypeScript).
    - [Bootstrap](https://github.com/twbs/bootstrap).
    - [React and ReactDOM](https://github.com/facebook/react).
    - [React router](https://github.com/reacttraining/react-router) for navigation.
    - [lc-form-validation](https://github.com/Lemoncode/lcFormValidation) for validations.
    - [toastr](https://github.com/CodeSeven/toastr) for toast notifications.
- Setup **webpack.config.js**
- Create a js file.
- Create a simple HTML file.

# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.9.1) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Create and navigate to the folder where you are going to create the empty project.

- Execute `npm init`, you will be prompted to answer some information request
about the project (e.g. set name to _sample-app_ and description to _Sample working with React,TypeScript and Webpack 2_).
Once you have successfully fullfilled them a **package.json** file we will generated.

 ```
 npm init
 ```

- Install **webpack** as a development dependency.

 ```
 npm install webpack --save-dev
 ```
- Install **webpack-dev-server** locally, as a development dependency (the reason to install it locally and not globally is to be easy to setup, e.g. can be launched on a clean machine without having to install anything globally but nodejs).

 ```
 npm install webpack-dev-server --save-dev
 ```

- Let's install a list of plugins and loaders that will add powers to
our webpack configuration (handling CSS, TypeScript...).

 ```
 npm install css-loader style-loader extract-text-webpack-plugin@beta file-loader url-loader html-webpack-plugin awesome-typescript-loader --save-dev
 ```

- In order to launch `webpack-dev-server`, modify the **package.json** file an add the following property `"start": "webpack-dev-server --inline",` under the scripts object. It allows us to launch webpack from the command line through npm typing `npm start`.

- Let's install locally TypeScript (version 2.0 or newer):

 ```
 npm install typescript --save-dev
 ```

- We need as well to drop a **tsconfig.json** file in the root folder of our project

 ```json
 {
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "declaration": false,
      "noImplicitAny": false,
      "jsx": "react",
      "sourceMap": true,
      "noLib": false,
      "suppressImplicitAnyIndexErrors": true
    },
    "compileOnSave": false,
    "exclude": [
      "node_modules"
    ]
  }
 ```

- Let's install bootstrap:

 ```
 npm install bootstrap --save
 ```

- Let's install React and ReactDOM to work with ReactJS and typings for ts development:

 ```
 npm install react react-dom --save
 npm install @types/react @types/react-dom --save-dev
 ```

- Let's install React Router, it's a complete routing library for React and typings for ts development:

 ```
 npm install react-router --save
 npm install @types/react-router --save-dev
 ```

- Let's install lc-form-validation, it's a framework agnostic library to validate forms based on TypeScript:

 ```
 npm install lc-form-validation --save
 ```

- Let's install toastr, it's a simple JavaScript toast notifications library and typings for ts development. (Installing jQuery because it's a dependency):

 ```
 npm install toastr jquery --save
 npm install @types/toastr --save-dev
 ```

- Now, our **package.json** file should looks something like:

 ```json
 {
   "name": "sample-app",
   "version": "1.0.0",
   "description": "Sample working with React,TypeScript and Webpack 2",
   "main": "index.js",
   "scripts": {
     "start": "webpack-dev-server --inline"
   },
   "repository": {
     "type": "git",
     "url": "git+https://github.com/Lemoncode/react-training-ts.git"
   },
   "keywords": [
     "react",
     "training",
     "typescript"
   ],
   "author": "Lemoncode",
   "license": "ISC",
   "bugs": {
     "url": "https://github.com/Lemoncode/react-training-ts/issues"
   },
   "homepage": "https://github.com/Lemoncode/react-training-ts#readme",
   "devDependencies": {
     "@types/react": "^15.0.8",
     "@types/react-dom": "^0.14.23",
     "@types/react-router": "^3.0.2",
     "@types/toastr": "^2.1.32",
     "awesome-typescript-loader": "^3.0.4-rc.0",
     "css-loader": "^0.26.1",
     "extract-text-webpack-plugin": "^2.0.0-rc.3",
     "file-loader": "^0.10.0",
     "html-webpack-plugin": "^2.28.0",
     "style-loader": "^0.13.1",
     "typescript": "^2.1.6",
     "url-loader": "^0.5.7",
     "webpack": "^2.2.1",
     "webpack-dev-server": "^2.3.0"
   },
   "dependencies": {
     "bootstrap": "^3.3.7",
     "jquery": "^3.1.1",
     "lc-form-validation": "^0.1.7",
     "react": "^15.4.2",
     "react-dom": "^15.4.2",
     "react-router": "^3.0.2",
     "toastr": "^2.1.2"
   }
 }
 ```

- Let's create a subfolder called **src**.

 ```sh
 mkdir src
 ```

- Let's create a basic **main.ts** file (under **src** folder):

 ```javascript
 document.write("Hello from main.ts !");
 ```

- Let's create a basic **index.html** file (under **src** folder):

 ```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div class="well">
      <h1>Sample app</h1>
    </div>
  </body>
</html>
 ```

- Now it's time to create a basic **webpack.config.js** file, this configuration will
 include plumbing for:
 - Launching a web dev server.
 - Transpiling from TypeScript to JavaScript.
 - Setup Twitter Bootstrap (including fonts, etc...).
 - Generating the build under a **dist** folder.

 ```javascript
 var path = require('path');
 var webpack = require('webpack');
 var HtmlWebpackPlugin = require('html-webpack-plugin');

 var basePath = __dirname;

 module.exports = {
   context: path.join(basePath, "src"),
   resolve: {
       extensions: ['', '.js', '.ts', '.tsx']
   },

   entry: [
     './main.ts',
     '../node_modules/bootstrap/dist/css/bootstrap.css'
   ],
   output: {
     path: path.join(basePath, 'dist'),
     filename: 'bundle.js'
   },

   devtool: 'source-map',

   devServer: {
        contentBase: './dist', // Content base
        inline: true, // Enable watch and live reload
        host: 'localhost',
        port: 8080,
        stats: 'errors-only'
   },

   module: {
     loaders: [
       {
         test: /\.(ts|tsx)$/,
         exclude: /node_modules/,
         loader: 'ts-loader'
       },
       {
         test: /\.css$/,
         loader: 'style-loader!css-loader'
       },
       // Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
       // Using here url-loader and file-loader
       {
         test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
         loader: 'url?limit=10000&mimetype=application/font-woff'
       },
       {
         test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
         loader: 'url?limit=10000&mimetype=application/octet-stream'
       },
       {
         test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
         loader: 'file'
       },
       {
         test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
         loader: 'url?limit=10000&mimetype=image/svg+xml'
       }
     ]
   },
   plugins: [
     // Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
     new HtmlWebpackPlugin({
       filename: 'index.html', // Name of file in ./dist/
       template: 'index.html', // Name of template in ./src
       hash: true
     })
   ]
 }
 ```

- Run webpack with:

 ```
 npm start
 ```
