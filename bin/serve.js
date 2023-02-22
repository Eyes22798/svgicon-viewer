const path = require('path')
const Fastify = require('fastify').default
const findAvailablePort = require('../utils/portfinder.js')

module.exports = async function (indexHtml) {
  const fastify = Fastify({ logger: false })
  const fastifyStatic = require('fastify-static')
  const assetsPath = path.join(__dirname, '../dist')

  fastify.register(fastifyStatic, {
    root: assetsPath,
    wildcard: '**/!(*.html)'
  })

  fastify.get('/', (req, res) => {
    res.type('text/html').send(indexHtml)
  })

  findAvailablePort(5001, 5010, async (err, port) => {
    if (err) {
      console.error(err)
    } else {
      try {
        await fastify.listen(port, '0.0.0.0')
        console.log(`server listening on http://localhost:${port}`)
      } catch (err) {
        fastify.log.error(err)
      }
    }
  })
}
