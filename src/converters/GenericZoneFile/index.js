'use strict'

const GenericZoneFileRecordConverter = require('./GenericZoneFileRecordConverter')
const GenericZoneFileZoneConverter = require('./GenericZoneFileZoneConverter')

/**
 * Return a zone converter instance with default configuration.
 */
function getZoneConverter () {
  const recordConverter = new GenericZoneFileRecordConverter()
  return new GenericZoneFileZoneConverter(recordConverter)
}

module.exports = {
  getZoneConverter
}
