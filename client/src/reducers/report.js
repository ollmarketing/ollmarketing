import { CREATE_REPORT, GET_REPORT, GET_REPORTS  } from '../actions/types'

const DEFAULT_STATE = {
    reports: [],
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case CREATE_REPORT:
            return { ...state, report: action.payload }
        case GET_REPORTS: 
            return {...state, reports: action.payload }
        case GET_REPORT: 
            return {...state, report: action.payload }
        default:
            return state;
    }
    
}