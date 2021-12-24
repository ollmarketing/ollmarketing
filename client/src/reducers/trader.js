import { GET_TRADER, GET_TRADERS  } from '../actions/types'

const DEFAULT_STATE = {
    traders: [],
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case GET_TRADERS:
            return { ...state, traders: action.payload }
        case GET_TRADER: 
            return {...state, trader: action.payload }
        default:
            return state;
    }
    
}