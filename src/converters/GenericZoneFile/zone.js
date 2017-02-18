'use strict'

const records = require('./records')

function generate (zone) {
  const contents = []

  if (zone.records) {
    for (let record of zone.records) {
      contents.push(records.recordTypeDispatch(record).trim())
    }
  }

  return contents.join('\n')
}

module.exports = { generate }
