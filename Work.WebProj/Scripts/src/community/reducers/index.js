"use strict";
var redux_1 = require('redux');
var comm_1 = require('./comm');
var visibilityFilter_1 = require('./visibilityFilter');
var stateApp = redux_1.combineReducers({
    search: comm_1.search,
    edit_type: comm_1.edit_type,
    grid_items: comm_1.grid_items,
    visibilityFilter: visibilityFilter_1.default
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = stateApp;
