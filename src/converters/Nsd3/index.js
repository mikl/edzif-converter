const Nsd3RecordConverter = require('./Nsd3RecordConverter')
const Nsd3ZoneConverter = require('./Nsd3ZoneConverter')

/**
 * Return a zone converter instance with default configuration.
 */
function getZoneConverter (recordOptions) {
  const recordConverter = new Nsd3RecordConverter(recordOptions)
  return new Nsd3ZoneConverter(recordConverter)
}

module.exports = {
  getZoneConverter
}
