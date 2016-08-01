"use strict";
const redux_1 = require('redux');
const search_1 = require('./search');
const visibilityFilter_1 = require('./visibilityFilter');
const stateApp = redux_1.combineReducers({
    search: search_1.search,
    edit_type: search_1.edit_type,
    visibilityFilter: visibilityFilter_1.default
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = stateApp;
