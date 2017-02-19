'use strict'

class GenericZoneFileRecordConverter {
  str(input) {
    if (typeof input === 'string') {
      return input
    }
    else if (typeof input === 'number') {
      return parseInt(input, 10)
    }
    else {
      return ''
    }
  }

  A(prefix, ttl, address) {
    return `${prefix} ${ttl} IN A ${address}`
  }

  AAAA(prefix, ttl, address) {
    return `${prefix} ${ttl} IN AAAA ${address}`
  }

  CNAME(prefix, ttl, hostname) {
    return `${prefix} ${ttl} CNAME ${hostname}`
  }

  MX(prefix, ttl, priority, hostname) {
    return `${prefix} ${ttl} MX ${priority} ${hostname}`
  }

  NS(prefix, ttl, hostname) {
    return `${prefix} ${ttl} IN NS ${hostname}`
  }

  SOA(primary_server, responsible_person, serial, refresh, retry, expire, minimum_ttl) {
    return `${primary_server} IN SOA ${responsible_person} (${serial} ${refresh} ${retry} ${expire} ${minimum_ttl})`
  }

  SRV(prefix, ttl, weight, priority, port, hostname) {
    return `${prefix} ${ttl} IN SRV ${weight} ${priority} ${port} ${hostname}`
  }

  TXT(prefix, ttl, content) {
    return `${prefix} ${ttl} IN TXT ("${content}")`
  }

  recordTypeDispatch(record) {
    // Make a copy of the record, so we don't modify the original.
    let copy = Object.assign(record)

    // Coerce optional values to strings.
    copy.prefix = this.str(copy.prefix)
    copy.ttl = this.str(copy.ttl)

    if (copy.record_type === 'A') {
      return this.A(copy.prefix, copy.ttl, copy.address)
    }
    else if (copy.record_type === 'AAAA') {
      return this.AAAA(copy.prefix, copy.ttl, copy.address)
    }
    else if (copy.record_type === 'CNAME') {
      return this.CNAME(copy.prefix, copy.ttl, copy.name)
    }
    else if (copy.record_type === 'MX') {
      return this.MX(copy.prefix, copy.ttl, copy.priority, copy.name)
    }
    else if (copy.record_type === 'NS') {
      return this.NS(copy.prefix, copy.ttl, copy.name)
    }
    else if (copy.record_type === 'SOA') {
      return this.SOA(copy.primary_server, copy.responsible_person, copy.serial, copy.refresh, copy.retry, copy.expire, copy.minimum_ttl)
    }
    else if (copy.record_type === 'SRV') {
      return this.SRV(copy.prefix, copy.ttl, copy.weight, copy.priority, copy.port, copy.name)
    }
    else if (copy.record_type === 'TXT') {
      return this.TXT(copy.prefix, copy.ttl, copy.text_content)
    }
    else {
      throw new Error('EDZIFCONVERR-001: No renderer found for record type ' + copy.record_type)
    }
  }
}

module.exports = GenericZoneFileRecordConverter
