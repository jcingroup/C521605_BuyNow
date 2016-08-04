import update = require('react-addons-update');

let search_state = {
    key: 'Hi'
};

export const search = (state = search_state, action) => {
    //console.log('state', 'search', state);
    switch (action.type) {
        case 'setInputValue':
            let struct = {
                [action.name]: { $set: action.name.value }
            };
            let n_state = update(state, struct);
            return n_state;
        default:
            return state
    }
}

export const edit_type = (state = IEditType.none, action: Redux.Action): IEditType => {
    //console.log('state', 'edit_type', state);
    switch (action.type) {
        case 'setInputValue':

        case 'load':
            return IEditType.none

        default:
            return state
    }
}

export const grid_items = (state = [], action): Array<server.Community> => {
    //console.log('state', 'grid_items', state);
    switch (action.type) {
        case 'load':
            //console.log('state', 'grid_items', 'load', action.items);
            return action.items;
        case 'clear':
            return [];

        default:
            return state
    }
}