"use strict";
var ajax_1 = require('../../ts-comm/ajax');
exports.setInputValue = function (type, name, value) {
    return {
        type: type,
        value: value,
        name: name
    };
};
exports.ajaxGridItem = function (search) {
    return function (dispatch) {
        return ajax_1.callGet('/api/Community', search)
            .done(function (data, textStatus, jqXHRdata) {
            dispatch(getGridItem(data));
        });
    };
};
var getGridItem = function (data) {
    return {
        type: 'load',
        items: data.rows,
        pageinfo: {
            total: data.total,
            page: data.page,
            records: data.records,
            startcount: data.startcount,
            endcount: data.endcount
        }
    };
};
exports.clearGridItem = function () {
    return {
        type: 'clear'
    };
};
exports.delItemOne = function (id) {
    return {
        type: 'delItemOne'
    };
};
exports.queryGridData = function (search) {
    return {
        type: 'query'
    };
};
exports.operatorInsert = function () {
    return {
        type: 'insert'
    };
};
exports.ajaxOperatorEdit = function (id) {
    return function (dispatch) {
        return ajax_1.callGet('/api/Community', { id: id })
            .done(function (data, textStatus, jqXHRdata) {
            dispatch(getEditData(data));
        });
    };
};
var getEditData = function (data) {
    return {
        type: 'edit',
        field: data.data
    };
};
exports.operatorGrid = function () {
    return {
        type: 'grid'
    };
};
