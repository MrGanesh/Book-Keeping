import {
USER_PROFILE_REQUEST,
USER_PROFILE_SUCCESS,
USER_PROFILE_FAIL

} from '../../actions/books/actionTypes'

const userProfileReducer =(state={},action)=>{
    switch(action.type){
        case USER_PROFILE_REQUEST:
            return {
              loading: true,
            };
          case USER_PROFILE_SUCCESS:
            return {
              user: action.payload,
            };
      
          case USER_PROFILE_FAIL:
            return {
              error: action.payload,
              loading: false,
            };
            default:
                return state
    }
}

export {userProfileReducer}