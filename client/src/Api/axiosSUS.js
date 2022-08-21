import axios from 'axios';

export default axios.create({
    baseURL: "https://softnet-user-service-dot-stxi-dev-339915.uc.r.appspot.com/api/v1/",
    headers: {
        'x-api-key': "KU/27HYWsByAGtTv"
    },
});