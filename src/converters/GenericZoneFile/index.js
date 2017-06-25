'use strict'

const GenericZoneFileRecordConverter = require('./GenericZoneFileRecordConverter')
const GenericZoneFileZoneConverter = require('./GenericZoneFileZoneConverter')

/**
 * Return a zone converter instance with default configuration.
 */
function getZoneConverter (recordOptions) {
  const recordConverter = new GenericZoneFileRecordConverter(recordOptions)
  return new GenericZoneFileZoneConverter(recordConverter)
}

module.exports = {
  getZoneConverter
}
