import axios from '../Api/axiosSCM'

const DATA_URL = "gruposBusiness"
const DEL_URL = "grupos"
const IMG_URL = "recursosOrden"
const ADD_REC = "recursos"
const ADD_GROUP = "grupos"
const ACT_GROUP = "grupos"
const FETCH_GRUPO = "gruposId"
const DEL_REC = "recursos"
const ORDER_REC = "orderRecursos"
const DEL_REC_ID = "recurso"
const GET_GROUP = "gruposId"

const fetchData = async (businessId) => {
    try {
        const response = await axios.get(`${DATA_URL}/${businessId}`);
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

const delGroup = async (id) => {
    try {
        const response = await axios.delete(`${DEL_URL}/${id}`);
        console.log(response);
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}


const getRecursosByGroup = async (id, businessId) => {
    try {
        const response = await axios.get(`${IMG_URL}/${businessId}/${id}`)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

const addGroup = async (nombreGrupo, isDefault, autoplay, businessId) => {
    try {
        const response = await axios.post(ADD_GROUP, JSON.stringify({
            businessId: businessId,
            grupoName: nombreGrupo,
            isDefault: isDefault,
            autoplay: autoplay,
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response)
        return response
    } catch (error) {
        return error
    }
}

const fetchGrupoInfo = async (id) => {
    const grupoId = id;
    try {
        const response = await axios.get(`${FETCH_GRUPO}/${grupoId}`);
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

const actGrupo = async (grupoId, nombreGrupo, isDefault, autoplay) => {
    try {
        const response = await axios.patch(`${ACT_GROUP}/${grupoId}`, JSON.stringify({
            grupoName: nombreGrupo,
            isDefault: isDefault,
            autoplay: autoplay,
        }), {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

const addRecurso = async (selectedFile, tiempoTransicion, grupoId, businessId) => {
    const formData = new FormData();
    for (let i = 0; i < selectedFile.length; i++) {
        formData.append('image', selectedFile[i])
    }
    formData.append('businessId', businessId)
    formData.append('tiempoTransicion', tiempoTransicion)
    formData.append('grupoId', grupoId)
    try {
        const response = await axios.post(ADD_REC, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response);
        return response
    } catch (error) {
        console.log(error)
    }
}

const deleteRecursosByGroup = async (grupoId, businessId) => {
    try {
        const response = await axios.delete(`${DEL_REC}/${businessId}/${grupoId}`)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

const reOrderRecursos = async (listaRecursos) => {
    try {
        const response = await axios.patch(ORDER_REC, ({
            listaRecursos: listaRecursos
        }))
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

const delRecursoById = async (id) => {
    try {
        const response = await axios.delete(`${DEL_REC_ID}/${id}`)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

const getAutoplay = async (id) => {
    try {
        const response = await axios.get(`${GET_GROUP}/${id}`)
        console.log(response)
        return response.grupo.autoplay
    } catch (error) {

    }
}

export {
    fetchData,
    delGroup,
    getRecursosByGroup,
    addGroup,
    addRecurso,
    actGrupo,
    deleteRecursosByGroup,
    fetchGrupoInfo,
    reOrderRecursos,
    delRecursoById,
    getAutoplay,
}; 
