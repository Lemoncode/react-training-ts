"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
var company_1 = require('./company');
var name = 1;
ReactDOM.render(React.createElement(company_1.default, {name: name}), document.getElementById('root'));
