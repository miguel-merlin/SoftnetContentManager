import axios from 'axios';

export default axios.create({
    baseURL: "http://176.24.7.152:8080/v1/"
})