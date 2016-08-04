"use strict";
const $ = require('jquery');
let nextTodoId = 0;
exports.addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text: text
    };
};
exports.setVisibilityFilter = (filter) => {
    let r = {
        type: 'SET_VISIBILITY_FILTER',
        filter: filter
    };
    return r;
};
exports.toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id: id
    };
};
exports.setInputValue = (name, value) => {
    return {
        type: 'setInputValue',
        value: value,
        name: name
    };
};
exports.ajaxGridItem = () => {
    return dispatch => {
        return $.get('/api/Community?page=1')
            .done((data, textStatus, jqXHRdata) => {
            dispatch(getGridItem(data));
        });
    };
};
const getGridItem = (data) => {
    return {
        type: 'load',
        items: data.rows
    };
};
exports.clearGridItem = () => {
    return {
        type: 'clear'
    };
};
