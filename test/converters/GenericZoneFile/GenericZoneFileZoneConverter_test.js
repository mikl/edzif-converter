'use strict'

const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const { getZoneConverter } = require('../../../src/converters/GenericZoneFile')

lab.experiment('GenericZoneFile zone conversion', () => {
  const converter = getZoneConverter()

  lab.test('Empty zone', (done) => {
    const emptyZone = {}
    const output = converter.generate(emptyZone)

    Code.expect(output).to.be.a.string()
    Code.expect(output).to.equal('')
    done()
  })

  lab.test('Full valid zone', (done) => {
    const validZone = require('../../fixtures/zone_full_valid')
    const output = converter.generate(validZone)

    Code.expect(output).to.be.a.string()
    Code.expect(output).to.include('43200 IN A 10.0.0.1\n')
    Code.expect(output).to.include('_submission._tcp 43200 IN SRV undefined 10 587 mail.example.com\n')
    Code.expect(output).to.include('_dmarc 43200 IN TXT ("v=DMARC1; p=reject")')
    done()
  })
})
