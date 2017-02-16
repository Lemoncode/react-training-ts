# 06 Validations

We will take as startup point sample _05 EditTraining_.

In this sample we will add validations to edit form.

Summary steps:

- Install [validate.js](https://github.com/ansman/validate.js) for validations.
- Create _ValidationComponent_.
- Create TrainingErrors model.
- Create single field validation.
- Create form validation.

## Steps to build it

- Let's install validate.js, it's a JavaScript library for validations. We'll use require for import this lib:

 ```
 npm install validate.js --save
 ```

 - Add lib as vendor:

 ### ./webpack.config.js
 ```javascript
 entry: {
   ...
   vendor: [
     ...
     'react-infinite-calendar',
     'react-addons-css-transition-group',
     'moment',
     'react-modal',
+    'validate.js',
   ],
 ```

- We can start to create a validation component that it's going to style input components when errors occurs:

### ./src/common/components/form/validation.tsx
```javascript

```

- Updating input:

### ./src/common/components/form/input.tsx

- Updating inputButton:

### ./src/common/components/form/inputButton.tsx

- Updating checkBox:

### ./src/common/components/form/checkBox.tsx
