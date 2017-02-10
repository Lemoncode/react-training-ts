"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
var company_1 = require('./company');
ReactDOM.render(React.createElement(company_1.default, {wrongAttribute: "Lemoncode"}), document.getElementById('root'));
