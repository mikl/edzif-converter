'use strict'

class GenericZoneFileRecordConverter {
  constructor(recordPartConverter) {
    this.recordPartConverter = recordPartConverter
  }

  A(prefix, ttl, address) {
    return `${this.formatPrefix(prefix, ttl)} IN A ${address}`
  }

  AAAA(prefix, ttl, address) {
    return `${this.formatPrefix(prefix, ttl)} IN AAAA ${address}`
  }

  CNAME(prefix, ttl, hostname) {
    return `${this.formatPrefix(prefix, ttl)} CNAME ${hostname}`
  }

  MX(prefix, ttl, priority, hostname) {
    return `${this.formatPrefix(prefix, ttl)} MX ${priority} ${hostname}`
  }

  NS(prefix, ttl, hostname) {
    return `${this.formatPrefix(prefix, ttl)} IN NS ${hostname}`
  }

  SOA(primary_server, responsible_person, serial, refresh, retry, expire, minimum_ttl) {
    return `${primary_server} IN SOA ${responsible_person} (${serial} ${refresh} ${retry} ${expire} ${minimum_ttl})`
  }

  SRV(prefix, ttl, weight, priority, port, hostname) {
    return `${this.formatPrefix(prefix, ttl)} IN SRV ${weight} ${priority} ${port} ${hostname}`
  }

  TXT(prefix, ttl, content) {
    return `${this.formatPrefix(prefix, ttl)} IN TXT (${this.formatTXTContent(content)})`
  }

  formatPrefix(prefix, ttl) {
    const output = []

    if (prefix) {
      output.push(prefix)
    }
    else {
      output.push('@')
    }

    if (ttl) {
      output.push(ttl)
    }

    return output.join(' ')
  }

  formatTXTContent(content) {
    // Remove all characters that are not printable ASCII.
    let escapedText = content.replace(/[^\x20-\x7E]+/g, '')

    // Escape backslashes.
    escapedText = escapedText.replace(/\\/g, '\\\\')

    // Escape backticks.
    escapedText = escapedText.replace(/`/g, '``')

    // Escape quotes.
    escapedText = escapedText.replace(/"/g, '\\"')

    // Now we need chunking, since there's a 255 character limit on TXT field values.
    // See http://serverfault.com/a/255676/766
    const chunks = escapedText.match(/.{1,250}/g)

    return '"' + chunks.join('" "') + '"'
  }

  recordTypeDispatch(record) {
    if (record.record_type === 'A') {
      return this.A(record.prefix, record.ttl, record.address)
    }
    else if (record.record_type === 'AAAA') {
      return this.AAAA(record.prefix, record.ttl, record.address)
    }
    else if (record.record_type === 'CNAME') {
      return this.CNAME(record.prefix, record.ttl, record.name)
    }
    else if (record.record_type === 'MX') {
      return this.MX(record.prefix, record.ttl, record.priority, record.name)
    }
    else if (record.record_type === 'NS') {
      return this.NS(record.prefix, record.ttl, record.name)
    }
    else if (record.record_type === 'SOA') {
      return this.SOA(record.primary_server, record.responsible_person, record.serial, record.refresh, record.retry, record.expire, record.minimum_ttl)
    }
    else if (record.record_type === 'SRV') {
      return this.SRV(record.prefix, record.ttl, record.weight, record.priority, record.port, record.name)
    }
    else if (record.record_type === 'TXT') {
      return this.TXT(record.prefix, record.ttl, record.text_content)
    }
    else {
      throw new Error('EDZIFCONVERR-001: No renderer found for record type ' + record.record_type)
    }
  }
}

module.exports = GenericZoneFileRecordConverter
