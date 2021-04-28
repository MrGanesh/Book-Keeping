import axios  from '../../../axios'
import {CREATE_BOOK_REQUEST,CREATE_BOOK_SUCCESS,CREATE_BOOK_FAIL,
    FETCH_BOOK_REQUEST,FETCH_BOOK_SUCCESS,FETCH_BOOK_FAIL} from './actionTypes'

const createBookAction = bookData=>{
    return async dispatch=>{
        try{

            dispatch({
                type: CREATE_BOOK_REQUEST
                })
        
                const config ={
                    'Content-Type':"application/json"
                }
                // console.log("book data",bookData)
                // console.log("config",config)
                const {data} = await axios.post('/api/book-creation',bookData,config)
            // console.log("data present",data)
                dispatch({
                    type:CREATE_BOOK_SUCCESS,
                    payload:data.savedbook
                })
        
        }catch(error){
            dispatch({
                 type:CREATE_BOOK_FAIL,
                 payload: error.response && error.response.data.message   
            })
        }
    }

}

const fetchBookAction =()=>{
    return async (dispatch)=>{
        try{
            dispatch({
                type : FETCH_BOOK_REQUEST
            })

            const config={
                headers:{
                    "Content-Type":"application/json",
                     "Authorization":"Bearer "+localStorage.getItem("token")
                   
                }
            }
            // console.log("Bearer "+localStorage.getItem("token"))
            const {data} = await axios.get('/api/book-fetch',config)
            // console.log("fetching data",data)
            dispatch({
                type : FETCH_BOOK_SUCCESS,
                payload:data.book
            })

        } catch(error){
            dispatch({
                type : FETCH_BOOK_FAIL,
                payload: error.response && error.response.data.message
            })
        }
    }
}

export {createBookAction ,fetchBookAction}