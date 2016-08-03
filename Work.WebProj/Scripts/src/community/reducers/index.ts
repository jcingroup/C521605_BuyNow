import { combineReducers } from 'redux'
import {search, edit_type, grid_items} from './comm'
import visibilityFilter from './visibilityFilter'

const stateApp = combineReducers({
    search,
    edit_type,
    grid_items,
    visibilityFilter
})

export default stateApp
