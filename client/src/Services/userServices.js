import axios from '../Api/axiosSCM'

const CHECK_URL = "checkGrupos"
const GRUP_URL = "gruposBusiness"
const GET_URL = "recursosOrden"

const checkDefault = async (businessId) => {
    try {
        const response = await axios.get(`${CHECK_URL}/${businessId}`);
        console.log(response)
        return response
        //If there is a group with isDefault true response = grupo object
        //If there is not a group with isDefault false response = [] Empty array
    } catch (error) {
        console.log(error)
        return error
    }
}

const fetchData = async (businessId) => {
    try {
        const response = await axios.get(`${GRUP_URL}/${businessId}`)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
}

const getURLs = async (grupoId, businessId) => {
    try {
        const response = await axios.get(`${GET_URL}/${businessId}/${grupoId}`)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
}

export {checkDefault, fetchData, getURLs}
