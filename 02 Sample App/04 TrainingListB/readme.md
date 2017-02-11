# 04 TrainingListB

We will take as startup point sample _03 TrainingListA_.

In this sample we will render table of trainings with a second approach, we will use [React virtualized](https://github.com/bvaughn/react-virtualized).

Summary steps:

- Install react virtualized.
- Replace HTML table by react virtualized table.

## Steps to build it

- We need to install react-virtualized (it has react-addons-shallow-compare as dependency) and typings:

```
npm install react-addons-shallow-compare --save
npm install react-virtualized --save
npm install @types/react-virtualized --save-dev
```

- Add lib as vendor and vendorStyles:

### ./webpack.config.js
```javascript
entry: {
  ...
  vendor: [
    ...
    'toastr',
+   'react-addons-shallow-compare',
+   'react-virtualized',
  ],
  vendorStyles: [
    '../node_modules/bootstrap/dist/css/bootstrap.css',
    '../node_modules/toastr/build/toastr.css',
+   '../node_modules/react-virtualized/styles.css',
  ],
```
