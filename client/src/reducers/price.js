import { GET_PRICES  } from '../actions/types'

const DEFAULT_STATE = {
    prices: [],
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case GET_PRICES: 
            return {...state, prices: action.payload }
        default:
            return state;
    }
    
}