const Code = require('@hapi/code')
const Lab = require('@hapi/lab')

const { expect } = Code
const { suite, test, beforeEach, afterEach } = exports.lab = Lab.script()

const { init } = require('../src/lib/server')

suite('nombres', () => {
    let server

    beforeEach(async () => {
        server = await init()
    })

    afterEach(async () => {
        await server.stop()
    })

    test('regresa cualquier tipo de nombre', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/v1/nombre',
        })

        const payload = JSON.parse(res.payload)

        expect(res.statusCode).to.equal(200)
        expect(payload).to.be.object()
        expect(payload).to.include(['sexo', 'nombre'])
    })

    test('regresa cualquier nombre de mujer', { skip: false }, async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/v1/nombre?sexo=mujer',
        })
        const payload = JSON.parse(res.payload)

        expect(res.statusCode).to.equal(200)
        expect(payload).to.be.object()
        expect(payload).to.include(['sexo', 'nombre'])
        expect(payload).to.include({ sexo: 'mujer' })
    })

    test('regresa cualquier nombre de hombre', { skip: false }, async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/v1/nombre?sexo=hombre',
        })
        const payload = JSON.parse(res.payload)

        expect(res.statusCode).to.equal(200)
        expect(payload).to.be.object()
        expect(payload).to.include(['sexo', 'nombre'])
        expect(payload).to.include({ sexo: 'hombre' })
    })

    test('regresa error por valor de query erronea', { skip: false }, async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/v1/nombre?sexo=xD',
        })
        const payload = JSON.parse(res.payload)

        expect(res.statusCode).to.equal(400)
        expect(payload).to.be.object()
        expect(payload).to.include(['message', 'error'])
        expect(payload).to.include({ message: 'Invalid request query input' })
    })

    test('regresa error por valor de query erronea', { skip: false }, async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/v1/nombre?setso=en-etseso',
        })
        const payload = JSON.parse(res.payload)

        expect(res.statusCode).to.equal(400)
        expect(payload).to.be.object()
        expect(payload).to.include(['message', 'error'])
        expect(payload).to.include({ message: 'Invalid request query input' })
    })
})
