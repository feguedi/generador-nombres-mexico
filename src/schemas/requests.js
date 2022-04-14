const Joi = require('joi')

exports.obtenerNombreRequest = Joi.object({
    sexo: Joi.string().valid('hombre', 'mujer'),
}).label('obtenerNombre')
