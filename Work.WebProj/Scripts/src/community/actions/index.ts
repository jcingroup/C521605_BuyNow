import $ = require('jquery');

let nextTodoId = 0
export const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    }
}

export const setVisibilityFilter = (filter) => {

    let r = {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }

    //console.log('check r', r);
    return r;
}

export const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
}

export const setInputValue = (name, value) => {
    return {
        type: 'setInputValue',
        value,
        name
    }
}

export const ajaxGridItem = () => {

    return dispatch => {
        //dispatch(requestPosts(subreddit))
        return $.get('/api/Community?page=1')
            .done((data, textStatus, jqXHRdata) => {
                dispatch(getGridItem(data));
            })
    }
}

const getGridItem = (data) => {
    return {
        type: 'load',
        items: data.rows
    }
}
