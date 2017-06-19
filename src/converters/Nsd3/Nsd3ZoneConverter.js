const GenericZoneFileZoneConverter = require('../GenericZoneFile/GenericZoneFileZoneConverter')

class Nsd3ZoneConverter extends GenericZoneFileZoneConverter {
  /**
   * Generate config file fragment for NSD3.
   *
   * @param {array} zones
   *   Zone objects.
   *
   * @return {string}
   *   Configuration fragment.
   */
  generateConfiguration (zones) {
    const fragments = []

    for (let zone of zones) {
      const fileName = this.generateFileName(zone)

      // Weird indentation to avoid extraneous whitespace in output, sorry.
      fragments.push(`
zone:
    name: "${zone.name}."
    zonefile: "${fileName}"
`)
    }

    return fragments.join('')
  }
}

module.exports = Nsd3ZoneConverter
