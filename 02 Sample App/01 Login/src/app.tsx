import * as React from 'react';
import {LoginPageContainer} from './pages/login/pageContainer';
const classNames: any = require('./appStyles');

export const App = () => {
  return (
    <div className={`container-fluid ${classNames.app}`}>
     <LoginPageContainer />
    </div>
  );
}
