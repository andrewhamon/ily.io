import Keen from 'keen-js'

if (process.env.NODE_ENV === 'production') {
  module.exports = new Keen({
    projectId: process.env.PRODUCTION_KEEN_PROJECT_ID,
    writeKey: process.env.PRODUCTION_KEEN_WRITE_KEY
  })
} else {
  module.exports = new Keen({
    projectId: process.env.STAGING_KEEN_PROJECT_ID,
    writeKey: process.env.STAGING_KEEN_WRITE_KEY
  })
}
