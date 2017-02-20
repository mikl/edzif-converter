'use strict'

class GenericZoneFileZoneConverter {
  constructor (recordConverter) {
    this.recordConverter = recordConverter
  }

  generate (zone) {
    const contents = []

    if (zone.records) {
      for (let record of zone.records) {
        contents.push(this.recordConverter.recordTypeDispatch(record))
      }
    }

    return contents.join('\n')
  }
}

module.exports = GenericZoneFileZoneConverter
