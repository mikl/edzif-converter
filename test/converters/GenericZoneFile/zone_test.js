'use strict'

const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const zone = require('../../../src/converters/GenericZoneFile/zone')

lab.experiment('GenericZoneFile zone conversion', () => {
  lab.test('Empty zone', (done) => {
    const emptyZone = {}
    const output = zone.generate(emptyZone)

    Code.expect(output).to.be.a.string()
    Code.expect(output).to.equal('')
    done()
  })

  lab.test('Full valid zone', (done) => {
    const validZone = require('../../fixtures/zone_full_valid')
    const output = zone.generate(validZone)

    console.log('Bangalang', output)

    Code.expect(output).to.be.a.string()
    Code.expect(output).to.include('43200 IN A 10.0.0.1\n')
    Code.expect(output).to.include('_submission._tcp 43200 IN SRV undefined 10 587 mail.example.com\n')
    Code.expect(output).to.include('_dmarc 43200 IN TXT ("v=DMARC1; p=reject")')
    done()
  })
})
