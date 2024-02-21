import fp from 'fastify-plugin'
import fastifyJwt from "@fastify/jwt";

export default fp(async function (app, opts) {
    app.register(fastifyJwt, {
        secret: {
            private: 'path/to/private.pem',
            public: 'path/to/public.pem'
        },
        sign: {
            algorithm: 'ES256',
            issuer: 'info.iutparis.fr'
        },
    })
})
