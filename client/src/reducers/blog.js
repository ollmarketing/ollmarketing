import { CREATE_BLOG, GET_BLOGS, GET_BLOG, GET_BLOGS_BY_TAGS  } from '../actions/types'

const DEFAULT_STATE = {
    blogs: [],
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case CREATE_BLOG:
            return { ...state, blog: action.payload }
        case GET_BLOGS: 
            return {...state, blogs: action.payload}
        case GET_BLOG: 
            return {...state, blog: action.payload}
        case GET_BLOGS_BY_TAGS: 
            return {...state, blogs: action.payload}
        default:
            return state;
    }
    
}