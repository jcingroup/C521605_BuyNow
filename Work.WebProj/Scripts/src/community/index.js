"use strict";
require('babel-polyfill');
const React = require('react');
const react_dom_1 = require('react-dom');
const react_redux_1 = require('react-redux');
const redux_1 = require('redux');
const GridFormPart_1 = require('./components/GridFormPart');
const reducers_1 = require('./reducers');
const actions_1 = require('./actions');
const redux_thunk_1 = require('redux-thunk');
const createLogger = require('redux-logger');
const loggerMiddleware = createLogger();
const store = redux_1.createStore(reducers_1.default, redux_1.applyMiddleware(redux_thunk_1.default));
store.dispatch(actions_1.ajaxGridItem());
var dom = document.getElementById('page_content');
react_dom_1.render(React.createElement(react_redux_1.Provider, {store: store}, React.createElement(GridFormPart_1.default, null)), dom);
