"use strict";
const redux_1 = require('redux');
const comm_1 = require('./comm');
const visibilityFilter_1 = require('./visibilityFilter');
const stateApp = redux_1.combineReducers({
    search: comm_1.search,
    edit_type: comm_1.edit_type,
    grid_items: comm_1.grid_items,
    visibilityFilter: visibilityFilter_1.default
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = stateApp;
