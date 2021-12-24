import { CREATE_BROKER, GET_BROKERS, GET_BROKER  } from '../actions/types'

const DEFAULT_STATE = {
    brokers: [],
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case CREATE_BROKER:
            return { ...state, broker: action.payload }
        case GET_BROKERS:
            return { ...state, brokers: action.payload }
        case GET_BROKER:
                return { ...state, broker: action.payload }
        default:
            return state;
    }
    
}