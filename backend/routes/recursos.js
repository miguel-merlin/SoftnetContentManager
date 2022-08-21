const express = require('express')
const upload = require('../libs/storage')
const {addRecurso, getAllRecursos, getRecursoById, deleteRecursoById, getRecursosByGroup, updateRecursoId, getRecursosByOrden, deleteByBusinessIdAndGroupId} = require('../controllers/recursoController')
const api = express.Router()

api.post('/recursos', upload.array('image', 10), addRecurso) //Añadir recursos
api.get('/recursos', getAllRecursos) //Obtener todos los recursos en Base de datos
api.get('/recursoId/:id', getRecursoById) //Obtener recursos por id
api.delete('/recurso/:id', deleteRecursoById) //Eliminar recurso por id
api.get('/recursosGroup/:grupoId/:businessId', getRecursosByGroup) //Obtener recursos por grupo
api.patch('/recurso/:id', updateRecursoId) //Update recurso con ID
api.get('/recursosOrden/:businessId/:grupoId', getRecursosByOrden) //Get ordered Recursos with businessId and grupoId
api.delete('/recursos/:businessId/:grupoId', deleteByBusinessIdAndGroupId) //Delete recursos by BusinessId and grupoId

module.exports = api