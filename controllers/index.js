const Boom = require('@hapi/boom')
const _ = require('underscore')
const nombresObj = require('../data/nombres_2020.json')
const errorHandler = require('../helpers/errors')

exports.obtenerNombreV1 = async ({ sexo }) => {
    try {
        const arr = !!(sexo) ? nombresObj.filter(obj => obj.sexo === sexo) : nombresObj
        const random = Math.floor(Math.random() * (arr.length - 1))
        const valorRandom = arr[random]
        if (!valorRandom) {
            throw new Boom.Boom(`Error del valor - { sexo: ${sexo}, random: ${random} }`)
        } else {
            const picked = _.pick(valorRandom, ['nombre', 'sexo'])
            return picked
        }
    } catch (error) {
        throw errorHandler(error)
    }
}
