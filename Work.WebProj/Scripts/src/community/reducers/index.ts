import { combineReducers } from 'redux'
import {search, edit_type} from './search'
import visibilityFilter from './visibilityFilter'

const stateApp = combineReducers({
    search,
    edit_type,
    visibilityFilter
})

export default stateApp
