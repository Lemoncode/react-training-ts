"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
ReactDOM.render(React.createElement("table", null, 
    React.createElement("thead", null, 
        React.createElement("th", null, "Company"), 
        React.createElement("th", null, "Post")), 
    React.createElement("tbody", null, 
        React.createElement("tr", null, 
            React.createElement("td", null, "Lemoncode"), 
            React.createElement("td", null, "JSX / TSX"))
    )), document.getElementById('root'));
