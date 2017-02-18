'use strict'

const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const records = require('../../../src/converters/GenericZoneFile/records')

lab.experiment('GenericZoneFile records conversion', () => {
  lab.test('A record (localhost)', (done) => {
    const output = records.A('localhost', 43200, '127.0.0.1')

    Code.expect(output).to.be.a.string()
    Code.expect(output).to.equal('localhost 43200 IN A 127.0.0.1')
    done()
  })

  lab.test('AAAA record (localhost)', (done) => {
    const output = records.AAAA('localhost', 43200, '2001:db8::ff00:42:8329')

    Code.expect(output).to.be.a.string()
    Code.expect(output).to.equal('localhost 43200 IN AAAA 2001:db8::ff00:42:8329')
    done()
  })

  lab.test('CNAME record (www)', (done) => {
    const output = records.CNAME('www', 43200, 'example.net')

    Code.expect(output).to.be.a.string()
    Code.expect(output).to.equal('www 43200 CNAME example.net')
    done()
  })

  lab.test('MX record (mail)', (done) => {
    const output = records.MX('@', 43200, 10, 'smtp.example.net')

    Code.expect(output).to.be.a.string()
    Code.expect(output).to.equal('@ 43200 MX 10 smtp.example.net')
    done()
  })

  lab.test('NS record (ns1)', (done) => {
    const output = records.NS('@', 19999, 'ns1.example.net')

    Code.expect(output).to.be.a.string()
    Code.expect(output).to.equal('@ 19999 IN NS ns1.example.net')
    done()
  })

  lab.test('SOA record (example)', (done) => {
    const output = records.SOA('ns1.example.net', 'admin.example.net', 1486414023, 3600, 7200, 864000, 3600)

    Code.expect(output).to.be.a.string()
    Code.expect(output).to.equal('ns1.example.net IN SOA admin.example.net (1486414023 3600 7200 864000 3600)')
    done()
  })

  lab.test('SRV record (imap)', (done) => {
    const output = records.SRV('_imap._tcp.example.net.', 86400, 1, 10, 143, 'imap.example.net.')

    Code.expect(output).to.be.a.string()
    Code.expect(output).to.equal('_imap._tcp.example.net. 86400 IN SRV 1 10 143 imap.example.net.')
    done()
  })

  lab.test('TXT record (SPF)', (done) => {
    const output = records.TXT('@', 86400, 'v=spf1 mx -all')

    Code.expect(output).to.be.a.string()
    Code.expect(output).to.equal('@ 86400 IN TXT ("v=spf1 mx -all")')
    done()
  })
})

lab.experiment('GenericZoneFile recordsTypeDispatch rendering', () => {
  lab.test('a TXT record (example.net)', (done) => {
    const record = {
      prefix: 'test',
      record_type: 'TXT',
      text_content: 'this is a test',
      ttl: 360
    }
    const output = records.recordTypeDispatch(record)

    Code.expect(output).to.be.a.string()
    Code.expect(output).to.equal('test 360 IN TXT ("this is a test")')
    done()
  })

  lab.test('an invalid record type', (done) => {
    const record = {
      prefix: 'test',
      record_type: 'BALJEPIS',
      text_content: 'this is a test',
      ttl: 360
    }

    try {
      const output = records.recordTypeDispatch(record)

      Code.fail('Rendering invalid types should throw an error.')
    } catch (e) {
      Code.expect(e.message).to.startWith('EDZIFCONVERR-001')
      done()
    }
  })
})
