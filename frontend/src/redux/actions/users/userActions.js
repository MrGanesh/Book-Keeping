import axios from '../../../axios';
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
} from '../books/actionTypes';

const registerUserAction  = (name,email,password)=>{
    return async dispatch=>{
        try{
            dispatch({
                type: USER_REGISTER_REQUEST
            })

            const config = {
                headers: {
                  'Content-Type': 'application/json',
                },
              };

              const {data} = await axios.post('/register',{name,email,password},config)
              // console.log("data for register user auth data",data)
              dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data.user,
              });

              localStorage.setItem('userAuthData', JSON.stringify(data));
              localStorage.setItem('token', JSON.stringify(data.token));

        }catch(error){
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: error.response && error.response.data.message,
              });
        }
    }
}


const  loginUserAction = (email,password)=>{
    return async dispatch=>{
        try{

            dispatch({
                type: USER_LOGIN_REQUEST
            })

            const config = {
                headers: {
                  'Content-Type': 'application/json',
                },
              };

              const { data } = await axios.post('/login',{email,password},config)
                //  console.log("data from login user action",data)
                if(!data.error){
                  // console.log("data success",data.user)
                  dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: data.user,
                    
                  });
                  //Save the user into localstorage
                  localStorage.setItem('userAuthData', JSON.stringify(data));
                  localStorage.setItem('token', JSON.stringify(data.token));
                }else{
                  // console.log("data error",data.error)
                  dispatch({
                    type: USER_LOGIN_FAIL,
                    payload: data.error,
                  });
                }
              

        } catch(error){
            console.log(error)
        }
    }
}


const logoutUserAction = ()=>{
    return async dispatch=>{
        try{
            localStorage.removeItem('userAuthData');
            dispatch({
                type: USER_LOGOUT_SUCCESS,
              });

        } catch(error){

        }
    }
}

const getUserProfileAction=()=>{
  return async (dispatch,getState)=>{
    const {userInfo} = getState().userLogin
    //  console.log("in get user profile",userInfo)
    try{
       dispatch({
         type: USER_PROFILE_REQUEST
       })
      //  const config ={
      //    headers:{
      //     //  authorization: `Bearer ${userInfo.token}`
      //      'authorization': 'Bearer '+localStorage.getItem('token')
      //    }
      //  }
       const {data} = await axios.get('/profile',{
         id:userInfo._id
       })
        // console.log("user profile data",data)
       dispatch({
         type: USER_PROFILE_SUCCESS,
         payload: data
       })
    }catch(error){
      dispatch({
        type: USER_PROFILE_FAIL,
        payload: error.response && error.response.data.message
      })
    }
  }
}

export {registerUserAction,loginUserAction, logoutUserAction,getUserProfileAction}