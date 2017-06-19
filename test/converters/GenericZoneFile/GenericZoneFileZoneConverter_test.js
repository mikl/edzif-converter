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

  lab.test('File name generation', (done) => {
    const validZone = require('../../fixtures/zone_full_valid')
    const output = converter.generateFileName(validZone)

    Code.expect(output).to.be.a.string()
    Code.expect(output).to.only.include('example.com.zone')
    done()
  })

  lab.test('Multiple valid zones', (done) => {
    const zones = require('../../fixtures/multiple_valid_zones')
    const output = converter.generateMultiple(zones)

    console.log(output['example.com'])

    Code.expect(output).to.be.an.object()
    Code.expect(output).to.have.length(3)
    Code.expect(output['example.com']).to.include('www 43200 CNAME example.com\n')
    Code.expect(output['example.net']).to.include('300 IN A 192.168.1.38\n')
    done()
  })
})
