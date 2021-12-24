import { GET_IDEA, GET_IDEAS, GET_IDEAS_BY_TADER_ID  } from '../actions/types'

const DEFAULT_STATE = {
    ideas: [],
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case GET_IDEAS:
            return { ...state, ideas: action.payload }
        case GET_IDEA:
            return {...state, idea: action.payload }
        case GET_IDEAS_BY_TADER_ID: 
            return {...state, ideas: action.payload}
        default:
            return state;
    }
}
