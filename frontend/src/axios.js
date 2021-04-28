import axios from 'axios'

const instance = axios.create({
    baseURL: "https://bookkeeping01.herokuapp.com"
})

export default instance;