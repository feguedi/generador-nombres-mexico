const Hapi = require('@hapi/hapi')
const {
    obtenerNombreV1,
} = require('../controllers')
const {
    obtenerNombreRequest,
} = require('../schemas/requests')
const errorHandler = require('../helpers/errors')

/**
 * @type Hapi.ServerRoute[]
 */
const routes = [{
    method: 'GET',
    path: '/api/v1/nombre',
    options: {
        validate: {
            query: obtenerNombreRequest,
        }
    },
    async handler(req, h) {
        try {
            const { sexo } = req.query
            return obtenerNombreV1({ sexo })
        } catch (error) {
            throw errorHandler(error)
        }
    },
}]

module.exports = routes
