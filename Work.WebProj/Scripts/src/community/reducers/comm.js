"use strict";
var update = require('react-addons-update');
var search_state = {
    key: 'Hi'
};
exports.search = function (state, action) {
    if (state === void 0) { state = search_state; }
    switch (action.type) {
        case 'setInputValue':
            var struct = (_a = {},
                _a[action.name] = { $set: action.name.value },
                _a
            );
            var n_state = update(state, struct);
            return n_state;
        default:
            return state;
    }
    var _a;
};
exports.edit_type = function (state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case 'setInputValue':
        case 'load':
            return 0;
        default:
            return state;
    }
};
exports.grid_items = function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case 'load':
            return action.items;
        case 'clear':
            return [];
        default:
            return state;
    }
};
