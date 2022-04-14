require('../config')
const Hapi = require('@hapi/hapi')
const Qs = require('qs')

const Server = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 8888,
        host: process.env.HOST || '0.0.0.0',
        query: {
            parser: (query) => Qs.parse(query)
        },
    })

    server.route(require('../routes'))

    return server
}

exports.init = async () => {
    try {
        const server = await Server()
        await server.initialize()
        return server
    } catch (error) {
    }
}

exports.start = async () => {
    try {
        const server = await Server()
        await server.start()
        console.log(server.info.uri)
        return server
    } catch (error) {
    }
}

process.on('uncaughtException', (err) => {
    console.error(err)
    process.exit(1)
})
