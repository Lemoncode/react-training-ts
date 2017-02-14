# 05 EditTraining

We will take as startup point sample _04 TrainingListB_.

In this sample we will build an edit form and apply validations.

Summary steps:

- Install [react-infinite-calendar](https://github.com/clauderic/react-infinite-calendar), [moment](https://github.com/moment/moment) and [react-modal](https://github.com/reactjs/react-modal).
- Navigate to edit training form by id.
- Build common forms components.
- Build DatePicker modal component.
- Build TrainingFormComponent.
- Build TrainingEditPage.
- Add form validations.

## Steps to build it

- Install [react-infinite-calendar](https://github.com/clauderic/react-infinite-calendar) and [react-addons-css-transition-group](https://www.npmjs.com/package/react-addons-css-transition-group) dependency. This library has not typings, so we have to import using [webpack-env](https://www.npmjs.com/package/@types/webpack-env) `require` method:

```
npm install react-infinite-calendar react-addons-css-transition-group --save
```

- Install [moment](https://github.com/moment/moment) to work with Dates. This library has typings for TypeScript:

```
npm install moment --save
```

- Install [react-modal](https://github.com/reactjs/react-modal) and typings to open calendar as modal window:

```
npm install react-modal --save
npm install @types/react-modal --save-dev
```

- Add libraries as vendor and vendorStyles:

### ./webpack.config.js
```javascript
entry: {
  ...
  vendor: [
    ...
    'toastr',
    'react-addons-shallow-compare',
    'react-virtualized',
+   'react-infinite-calendar',
+   'react-addons-css-transition-group',
+   'moment',
+   'react-modal',
  ],
  vendorStyles: [
    '../node_modules/bootstrap/dist/css/bootstrap.css',
    '../node_modules/toastr/build/toastr.css',
    '../node_modules/react-virtualized/styles.css',
+   '../node_modules/react-infinite-calendar/styles.css',
  ],
```

- We can start to create a blank TrainingEditPage, to work with navigation:

### ./src/pages/training/edit/page.tsx

```javascript
import * as React from 'react';

export const TrainingEditPage = () => {
  return (
    <div>Training Edit page</div>
  );
}

```

- Add route constant:

### ./src/common/constants/routeConstants.ts
```javascript
const trainingRoute = '/training';

export const routeConstants = {
  default: '/',
  training: {
    list: `${trainingRoute}/list`,
+   edit: `${trainingRoute}/edit`,
+   editWithParams: `${trainingRoute}/edit/:id`,
  },
};

```

- And route:

### ./src/routes.tsx
```javascript
import * as React from 'react';
import {Route, IndexRoute} from 'react-router';
import {routeConstants} from './common/constants/routeConstants';
import {App} from './app';
import {LoginPageContainer} from './pages/login/pageContainer';
import {TrainingListPageContainer} from './pages/training/list/pageContainer';
+ import {TrainingEditPage} from './pages/training/edit/page';

export const AppRoutes = (
  <Route path={routeConstants.default} component={App}>
    <IndexRoute component={LoginPageContainer} />
    <Route path={routeConstants.training.list} component={TrainingListPageContainer} />
+   <Route path={routeConstants.training.editWithParams} component={TrainingEditPage} />
  </Route>
);

```

- Finally, update _TrainingRowComponent_ to navigate to TrainingEditPage by training Id:

### ./src/pages/training/list/components/trainingRow.tsx
```javascript
import * as React from 'react';
+ import {Link} from 'react-router';
import {Training} from '../../../../models/training';
import {TableRowProps, TableRowComponent} from '../../../../common/components/tableRow';
const classNames: any = require('./trainingRowStyles');
+ import {routeConstants} from '../../../../common/constants/routeConstants';

// https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md
// https://github.com/bvaughn/react-virtualized/blob/master/source/Table/defaultRowRenderer.js
interface Props extends TableRowProps {
  rowData: Training;
}

// We can use spread operator for React properties too
// https://facebook.github.io/react/docs/jsx-in-depth.html#spread-attributes
export const TrainingRowComponent = (props: Props) => {
  return (
    <TableRowComponent
      {...props}
      rowKey={props.key}
      // We have enable camelCase parser in webpack.config.js
      className={`${props.className} ${classNames.rowStriped}`}
    >
      <input type="checkbox" checked={props.rowData.isActive} disabled/>
      <span>{props.rowData.name}</span>
      <a href={props.rowData.url} target="blank">{props.rowData.url}</a>
-     <a className=" btn btn-primary"><i className="glyphicon glyphicon-pencil" /></a>
+     <Link
+       to={`${routeConstants.training.edit}/${props.rowData.id}`}
+       className=" btn btn-primary"
+     >
+       <i className="glyphicon glyphicon-pencil" />
+     </Link>
    </TableRowComponent>
  );
}

```

- Once we have navigation, we can start with creating _TrainingFormComponent_.
  We're going to move input component to _./src/common/components/form_ folder because we'll create some form components
  and group them in this folder.

### ./src/pages/login/components/form.tsx
```javascript
import * as React from 'react';
import {LoginCredentials} from '../../../models/loginCredentials';
- import {InputComponent} from '../../../common/components/input';
+ import {InputComponent} from '../../../common/components/form/input';

```

### ./src/common/components/form/input.tsx
```javascript
import * as React from 'react';

- interface Props {
+ export interface InputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: any;
+ className?: string;
+ disabled?: boolean;
+ children?: React.ReactNode | React.ReactNode[];
}

- export const InputComponent = (props: Props) => {
+ export const InputComponent = (props: InputProps) => {
  return (
-   <div className="form-group">
+   <div className={`form-group ${props.className}`}>
      <label htmlFor={props.name}>
        {props.label}
      </label>
      <input
        type={props.type}
        className="form-control"
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
+       disabled={props.disabled}
      />
+       {props.children}
    </div>
  );
}

```

### ./src/common/components/form/inputButton.tsx
```javascript
import * as React from 'react';
import {InputComponent, InputProps} from './input';
const classNames: any = require('./inputButtonStyles');

interface Props extends InputProps {
  onClick: () => void;
  buttonClassName: string;
  icon: string;
}

export const InputButtonComponent = (props: Props) => {
  return (
    <InputComponent
      {...props}
      className={`${props.className} input-group ${classNames.inputComponent}`}
    >
      <div className={`input-group-btn ${classNames.button}`}>
        <span className={props.buttonClassName} onClick={props.onClick}>
          <i className={props.icon} />
        </span>
      </div>
    </InputComponent>
  );
};

```

### ./src/common/components/form/inputButtonStyles.css
```css
.input-component {
  padding: 0 15px!important;
  float: left!important;
}

.input-component > input {
  border-top-left-radius: 4px!important;
  border-bottom-left-radius: 4px!important;
}

.button {
  padding-top: 25px!important;
}

```

### ./src/common/components/form/checkbox.tsx
```javascript
import * as React from 'react';

interface Props {
  label: string;
  name: string;
  value: boolean;
  onChange: any;
  className?: string;
}

export const CheckBoxComponent = (props: Props) => {
  return (
    <div className={`checkbox ${props.className}`}>
      <label htmlFor={props.name}>
        <input
          type="checkbox"
          name={props.name}
          checked={props.value}
          onChange={props.onChange}
        />
        {props.label}
      </label>
    </div>
  );
}

```

- Building TrainingFormComponent:

### ./src/pages/training/edit/components/trainingForm.tsx
```javascript
import * as React from 'react';
import * as moment from 'moment';
import {Training} from '../../../../models/training';
import {InputComponent} from '../../../../common/components/form/input';
import {CheckBoxComponent} from '../../../../common/components/form/checkBox';
import {InputButtonComponent} from '../../../../common/components/form/inputButton';

interface Props {
  training: Training;
  onChange: (fieldName: string, value: any) => void;
  save: (training: Training) => void;
}

export class TrainingFormComponent extends React.Component<Props, {}> {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.save = this.save.bind(this);
  }

  private onChange (event) {
    const fieldName = event.target.name;
    const value = event.target.value;

    this.props.onChange(fieldName, value);
  }

  private onChangeStartDate(date: moment.Moment) {
    this.onChangeDate('startDate', date);
    this.toggleOpenStartDateModal();
  }

  private onChangeEndDate(date: moment.Moment) {
    this.onChangeDate('endDate', date);
    this.toggleOpenEndDateModal();
  }

  private onChangeDate(fieldName: string, date: moment.Moment) {
    const milliseconds = date.valueOf();
    this.props.onChange(fieldName, milliseconds);
  }

  private save(event) {
    event.preventDefault();
    this.props.save(this.props.training);
  }

  public render() {
    return (
      <form className="container">
        <div className="row">
          <InputComponent
            className="col-md-6"
            type="text"
            label="Name"
            name="name"
            onChange={this.onChange}
            value={this.props.training.name}
            placeholder="Name"
          />

          <InputComponent
            className="col-md-6"
            type="text"
            label="Url"
            name="url"
            onChange={this.onChange}
            value={this.props.training.url}
            placeholder="Url"
          />
        </div>

        <div className="row">
          <InputButtonComponent
            className="col-md-6"
            type="text"
            label="Start date"
            name="startDate"
            placeholder="Start date"
            value={moment(this.props.training.startDate).format('YYYY-MM-DD')}
            onChange={this.onChange}
            disabled
            buttonClassName="btn btn-default"
            onClick={() => {})}
            icon="glyphicon glyphicon-calendar"
          />

          <InputButtonComponent
            className="col-md-6"
            type="text"
            label="End date"
            name="endDate"
            placeholder="End date"
            value={moment(this.props.training.endDate).format('YYYY-MM-DD')}
            onChange={this.onChange}
            disabled
            buttonClassName="btn btn-default"
            onClick={() => {})}
            icon="glyphicon glyphicon-calendar"
          />
        </div>

        <div className="row">
          <CheckBoxComponent
            className="col-md-6"
            label="Active"
            name="isActive"
            onChange={this.onChange}
            value={this.props.training.isActive}
          />
        </div>

        <div className="row">
          <div className="form-group pull-right">
            <div className="col-md-1">
              <button type="button" className="btn btn-lg btn-success" onClick={this.save}>
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
};

```

- Now it's time to create the _DatePickerModalComponent_:

### ./src/common/components/datePickerModal/datePickerModal.tsx
```javascript
import * as React from 'react';
import * as Modal from 'react-modal';
import {Moment} from 'moment';
const classNames: any = require('./datePickerModalStyles');

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: number;
  onChange: (selectedDate: Moment) => void;
}

export const DatePickerModalComponent = (props: Props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      contentLabel="Date Picker Modal"
      onRequestClose={props.onClose}
      className={`${classNames.modal} modal-dialog modal-open`}
      overlayClassName={classNames.overlay}
    >
      <h1>This is a modal</h1>
    </Modal>
  );
};

```

### ./src/common/components/datePickerModal/datePickerModalStyles.css
```css
.modal {
  padding: 10px;
  outline: none;
  height: 95%;
}

.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1040;
  background-color: rgba(0,0,0,0.5);
}

```

### ./src/common/components/datePickerModal/components/datePicker.tsx
```javascript
import * as React from 'react';
import {Moment} from 'moment';
import {AutoSizer} from 'react-virtualized';
const ReactCalendar: any = require('react-infinite-calendar');
const InfiniteCalendar = ReactCalendar.default;
const classNames: any = require('./datePickerStyles');

interface Props {
  onClose: () => void;
  selectedDate: number;
  onChange: (selectedDate: Moment) => void;
}

export const DatePickerComponent = (props: Props) => {
  return (
    <AutoSizer>
    {
      ({width, height}) =>
      <div>
        <button
          type="button"
          className={`close ${classNames.closeButton}`}
          onClick={props.onClose}
        >
          <span>&times;</span>
        </button>
        <InfiniteCalendar
          width={width}
          height={height}
          selectedDate={props.selectedDate}
          afterSelect={props.onChange}
          showHeader={false}
        />
      </div>
    }
    </AutoSizer>
  );
};

```

### ./src/common/components/datePickerModal/components/datePickerStyles.css
```css
.close-button {
  position: absolute;
  z-index: 2;
  top: 20px;
  right: 25px;
}

```

- Updating _DatePickerModalComponent_:

### ./src/common/components/datePickerModal/datePickerModal.tsx
```javascript
import * as React from 'react';
import * as Modal from 'react-modal';
import {Moment} from 'moment';
+ import {DatePickerComponent} from './components/datePicker';
const classNames: any = require('./datePickerModalStyles');

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: number;
  onChange: (selectedDate: Moment) => void;
}

export const DatePickerModalComponent = (props: Props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      contentLabel="Date Picker Modal"
      onRequestClose={props.onClose}
      className={`${classNames.modal} modal-dialog modal-open`}
      overlayClassName={classNames.overlay}
    >
      <DatePickerComponent
        onClose={props.onClose}
        selectedDate={props.selectedDate}
        onChange={props.onChange}
      />
    </Modal>
  );
};

```

- Extract date format to a constants:

### ./src/common/constants/formatConstants.ts
```javascript
export const formatConstants = {
  shortDate: 'YYYY-MM-DD',
};

```

- Updating _TrainingFormComponent_:

### ./src/pages/training/edit/components/trainingForm.tsx
```javascript
import * as React from 'react';
import * as moment from 'moment';
import {Training} from '../../../../models/training';
import {InputComponent} from '../../../../common/components/form/input';
import {CheckBoxComponent} from '../../../../common/components/form/checkBox';
import {InputButtonComponent} from '../../../../common/components/form/inputButton';
+ import {DatePickerModalComponent} from '../../../../common/components/datePickerModal';
+ import {formatConstants} from '../../../../common/constants/formatConstants';

interface Props {
  training: Training;
  onChange: (fieldName: string, value: any) => void;
  save: (training: Training) => void;
}

+ interface State {
+  isOpenStartDateModal: boolean;
+  isOpenEndDateModal: boolean;
+}

- export class TrainingFormComponent extends React.Component<Props, {}> {
+ export class TrainingFormComponent extends React.Component<Props, State> {
  constructor() {
    super();

+   this.state = {
+     isOpenStartDateModal: false,
+     isOpenEndDateModal: false,
+   };

    this.onChange = this.onChange.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
+   this.toggleOpenStartDateModal = this.toggleOpenStartDateModal.bind(this);
+   this.toggleOpenEndDateModal = this.toggleOpenEndDateModal.bind(this);
    this.save = this.save.bind(this);
  }

  private onChange (event) {
    const fieldName = event.target.name;
    const value = event.target.value;

    this.props.onChange(fieldName, value);
  }

  private onChangeStartDate(date: moment.Moment) {
    this.onChangeDate('startDate', date);
    this.toggleOpenStartDateModal();
  }

  private onChangeEndDate(date: moment.Moment) {
    this.onChangeDate('endDate', date);
    this.toggleOpenEndDateModal();
  }

  private onChangeDate(fieldName: string, date: moment.Moment) {
    const milliseconds = date.valueOf();
    this.props.onChange(fieldName, milliseconds);
  }

+ private toggleOpenStartDateModal() {
+   this.toggleOpenModal('isOpenStartDateModal');
+ }

+ private toggleOpenEndDateModal() {
+   this.toggleOpenModal('isOpenEndDateModal');
+ }

+ private toggleOpenModal(fieldName) {
+   this.setState({
+     ...this.state,
+     [fieldName]: !this.state[fieldName]
+   });
+ }

  private save(event) {
    event.preventDefault();
    this.props.save(this.props.training);
  }

  public render() {
    return (
      <form className="container">
        <div className="row">
          <InputComponent
            className="col-md-6"
            type="text"
            label="Name"
            name="name"
            onChange={this.onChange}
            value={this.props.training.name}
            placeholder="Name"
          />

          <InputComponent
            className="col-md-6"
            type="text"
            label="Url"
            name="url"
            onChange={this.onChange}
            value={this.props.training.url}
            placeholder="Url"
          />
        </div>

        <div className="row">
          <InputButtonComponent
            className="col-md-6"
            type="text"
            label="Start date"
            name="startDate"
            placeholder="Start date"
            value={moment(this.props.training.startDate).format('YYYY-MM-DD')}
            onChange={this.onChange}
            disabled
            buttonClassName="btn btn-default"
            onClick={() => {})}
            icon="glyphicon glyphicon-calendar"
          />

+         <DatePickerModalComponent
+           isOpen={this.state.isOpenStartDateModal}
+           onClose={this.toggleOpenStartDateModal}
+           selectedDate={this.props.training.startDate}
+           onChange={this.onChangeStartDate}
+         />

          <InputButtonComponent
            className="col-md-6"
            type="text"
            label="End date"
            name="endDate"
            placeholder="End date"
            value={moment(this.props.training.endDate).format('YYYY-MM-DD')}
            onChange={this.onChange}
            disabled
            buttonClassName="btn btn-default"
            onClick={() => {})}
            icon="glyphicon glyphicon-calendar"
          />

+         <DatePickerModalComponent
+           isOpen={this.state.isOpenEndDateModal}
+           onClose={this.toggleOpenEndDateModal}
+           selectedDate={this.props.training.endDate}
+           onChange={this.onChangeEndDate}
+         />
        </div>

        <div className="row">
          <CheckBoxComponent
            className="col-md-6"
            label="Active"
            name="isActive"
            onChange={this.onChange}
            value={this.props.training.isActive}
          />
        </div>

        <div className="row">
          <div className="form-group pull-right">
            <div className="col-md-1">
              <button type="button" className="btn btn-lg btn-success" onClick={this.save}>
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
};

```
