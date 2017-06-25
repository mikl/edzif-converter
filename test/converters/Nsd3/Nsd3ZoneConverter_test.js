'use strict'

const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const { getZoneConverter } = require('../../../src/converters/Nsd3')

lab.experiment('NSD3 zone conversion', () => {
  const converter = getZoneConverter()

  lab.test('Full valid zone', (done) => {
    const validZone = require('../../fixtures/zone_full_valid')
    const output = converter.generate(validZone)

    Code.expect(output).to.be.a.string()
    Code.expect(output).to.include('43200 IN A 10.0.0.1\n')
    Code.expect(output).to.include('_submission._tcp 43200 IN SRV undefined 10 587 mail.example.com\n')
    Code.expect(output).to.include('_dmarc 43200 IN TXT ("v=DMARC1; p=reject")')
    done()
  })

  lab.test('Multiple valid zones', (done) => {
    const zones = require('../../fixtures/multiple_valid_zones')
    const output = converter.generateMultiple(zones)

    Code.expect(output).to.be.an.object()
    Code.expect(output).to.have.length(3)
    Code.expect(output['example.com']).to.include('www 43200 CNAME example.com\n')
    Code.expect(output['example.net']).to.include('300 IN A 192.168.1.38\n')
    done()
  })

  lab.test('nsd.conf fragment generation', (done) => {
    const zones = require('../../fixtures/multiple_valid_zones')
    const output = converter.generateConfiguration(zones)

    Code.expect(output).to.be.a.string()
    Code.expect(output).to.match(/zone:\n\s+name: "example.net."\n\s+zonefile: "example.net.zone"/)
    done()
  })
})
