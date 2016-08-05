"use strict";
var visibilityFilter = function (state, action) {
    if (state === void 0) { state = 'SHOW_ALL'; }
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = visibilityFilter;