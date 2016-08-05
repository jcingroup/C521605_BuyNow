"use strict";
var $ = require('jquery');
var nextTodoId = 0;
exports.addTodo = function (text) {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text: text
    };
};
exports.setVisibilityFilter = function (filter) {
    var r = {
        type: 'SET_VISIBILITY_FILTER',
        filter: filter
    };
    return r;
};
exports.toggleTodo = function (id) {
    return {
        type: 'TOGGLE_TODO',
        id: id
    };
};
exports.setInputValue = function (name, value) {
    return {
        type: 'setInputValue',
        value: value,
        name: name
    };
};
exports.ajaxGridItem = function () {
    return function (dispatch) {
        return $.get('/api/Community?page=1')
            .done(function (data, textStatus, jqXHRdata) {
            dispatch(getGridItem(data));
        });
    };
};
var getGridItem = function (data) {
    return {
        type: 'load',
        items: data.rows
    };
};
exports.clearGridItem = function () {
    return {
        type: 'clear'
    };
};
