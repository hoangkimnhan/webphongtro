import actionTypes from "../actions/actionTypes";
const initState = {
    posts: [],
    msg: '',
    // count: 0,
    // newPosts: []
}

const postReducer = (state = initState, action) => {
   
    switch (action.type) {
        case actionTypes.GET_POSTS:
            return {
                ...state,
                posts: action.posts || [],
                msg: action.msg || '',

            }
        case actionTypes.GET_POSTS_LIMIT:
            return {
                        ...state,
                        posts: action.posts || [],
                        msg: action.msg || '',
                        count: action.count || 0
            }
        case actionTypes.GET_NEW_POST:
            return {
                ...state,
                msg: action.msg || '',
                newPosts: action.newPosts || []
            }
        case actionTypes.GET_ONEPOST:
                return {
                    ...state,
                    msg: action.msg || '',
                    posts: action.posts || []
                }
        default:
            return state;
    }

}

export default postReducer