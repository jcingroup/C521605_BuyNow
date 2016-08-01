import update = require('react-addons-update');

let search_state = {
    key: 'Hi'
};

export const search = (state = search_state, action) => {
    //console.log('search state', state, action);
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
    switch (action.type) {

        case 'setInputValue':

        default:
            return state
    }
}


//export default search;

//const todo = (state, action) => {
//  switch (action.type) {
//    case 'ADD_TODO':
//      return {
//        id: action.id,
//        text: action.text,
//        completed: false
//      }
//    case 'TOGGLE_TODO':
//      if (state.id !== action.id) {
//        return state
//      }

//      return Object.assign({}, state, {
//        completed: !state.completed
//      })
//    default:
//      return state
//  }
//}

//const todos = (state = [], action) => {
//    //console.log('type',action.type);
//  switch (action.type) {
//    case 'ADD_TODO':
//      return [
//        ...state,
//        todo(undefined, action)
//      ]
//    case 'TOGGLE_TODO':
//      return state.map(t =>
//        todo(t, action)
//      )
//    default:
//      return state
//  }
//}

//export default todos
