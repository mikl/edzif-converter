'use strict'

class GenericZoneFileZoneConverter {
  constructor (recordConverter) {
    this.recordConverter = recordConverter
  }

  /**
   * Generate zone file.
   *
   * @param {object} zone
   *
   * @return {string}
   */
  generate (zone) {
    const contents = []

    if (zone.records) {
      for (let record of zone.records) {
        contents.push(this.recordConverter.recordTypeDispatch(record))
      }
    }

    let output = contents.join('\n')

    // If we have output, be sure to end the file with a linebreak.
    if (output) {
      output += '\n'
    }

    return output
  }

  generateFileName (zone) {
    return `${zone.name}.zone`
  }

  generateMultiple (zones) {
    const output = {}

    for (let zone of zones) {
      output[zone.name] = this.generate(zone)
    }

    return output
  }
}

module.exports = GenericZoneFileZoneConverter
