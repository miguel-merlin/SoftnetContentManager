const Recurso = require('../models/Recurso')
const sharp = require('sharp');
const AppError = require('../utils/appError');

async function addRecurso(req, res, next) {
    try {
        const {
            grupoId,
            imgUrl,
            tiempoTransicion,
            businessId,
        } = req.body

        if (!req.files) {
            next();
        }
        let listRecursos = [];
        for (let i = 0; i < req.files.length; i++){
            let orden;
            const recursosOrden = await Recurso.find({ $and: [{ businessId: req.body.businessId }, { grupoId: req.body.grupoId }] })
    
            if (recursosOrden.length === 0) {
                orden = 0;
            } else {
                let len = recursosOrden.length
                let index = 0
                let max = 0
                for (let i = 0; i < len; i++) {
                    if (recursosOrden[i].orden > max) {
                        index = i
                    } else {
                        continue;
                    }
                }
                orden = recursosOrden[index].orden + 1
            }
            
            const recursos = Recurso({
                grupoId,
                imgUrl,
                tiempoTransicion,
                businessId,
                orden,
            })
            
            req.files[i].originalname = `${req.files[i].fieldname}-${Date.now()}.jpeg`
            const filename = req.files[i].originalname
    
            await sharp(req.files[i].buffer)
                //.resize(500, 500)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`./storage/imgs/${req.files[i].originalname}`);
    
            recursos.setImgUrl(filename)
            const recursoStored = await recursos.save()
            listRecursos.push(recursoStored)
        }
        res.status(201).send({ listRecursos })
    } catch (e) {
        return next(new AppError(`No se pudo subir el recuros ${e}`, 400))
    }
}

async function getAllRecursos(req, res) {
    const recursos = await Recurso.find().lean().exec()
    res.status(200).send({ recursos })
}

async function getRecursoById(req, res, next) {
    const id = req.params.id
    try {
        const recurso = await Recurso.findById(id)
        res.status(200).send({ recurso })
    } catch (error) {
        return next(new AppError(`No se pudo encontrar el recurso ${error}`, 500))
    }
}

async function getRecursosByGroup(req, res, next) {
    const grupoId = req.params.grupoId
    const businessId = req.params.businessId
    try {
        const recursos = await Recurso.find({ $and: [{ businessId: businessId }, { grupoId: grupoId }] })
        res.status(200).send({ recursos })
    } catch (error) {
        return next(new AppError(`No se pudieron encontrar los recursos ${error}`, 500))
    }
}

async function deleteRecursoById(req, res, next) {
    const id = req.params.id
    try {
        const delRecurso = await Recurso.findByIdAndDelete(id)
        res.status(200).send({ delRecurso })
    } catch (error) {
        return next(new AppError(`No se encontro el grupo ${error}`, 500))
    }
}

async function updateRecursoId(req, res, next) {
    const id = req.params.id
    try {
        await Recurso.findByIdAndUpdate(id, { $set: req.body })
        const updtRecurso = await Recurso.findById(id);
        res.status(200).send({ updtRecurso })
    } catch (error) {
        return next(new AppError(`No se pudo actualizar el grupo ${error}`, 500))
    }
}

async function getRecursosByOrden(req, res, next) {
    const grupoId = req.params.grupoId
    const businessId = req.params.businessId
    let arregloRecursos;
    try {
        const recursos = await Recurso.find({ $and: [{ businessId: businessId }, { grupoId: grupoId }] })
        arregloRecursos = recursos
        arregloRecursos.sort(function (a, b) {
            return parseFloat(a.orden) - parseFloat(b.orden)
        });
        res.status(201).send(arregloRecursos)
    } catch (error) {
        return next(new AppError(`No se pudieron encontrar las URLS ${error}`, 400))
    }
}

async function deleteByBusinessIdAndGroupId(req, res, next) {
    const grupoId = req.params.grupoId
    const businessId = req.params.businessId
    try {
        const deletedRecursos = await Recurso.deleteMany({ $and: [{ businessId: businessId }, { grupoId: grupoId }] })
        res.status(200).send(deletedRecursos)
    } catch (error) {
        next(new AppError(`No se han podido eliminar los recursos ${error}`, 500))
    }
}

module.exports = {
    addRecurso,
    getAllRecursos,
    getRecursoById,
    getRecursosByGroup,
    deleteRecursoById,
    updateRecursoId,
    getRecursosByOrden,
    deleteByBusinessIdAndGroupId,
}