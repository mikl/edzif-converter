'use strict'

function str (input) {
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

function A (prefix, ttl, address) {
  return `${prefix} ${ttl} IN A ${address}`
}

function AAAA (prefix, ttl, address) {
  return `${prefix} ${ttl} IN AAAA ${address}`
}

function CNAME (prefix, ttl, hostname) {
  return `${prefix} ${ttl} CNAME ${hostname}`
}

function MX (prefix, ttl, priority, hostname) {
  return `${prefix} ${ttl} MX ${priority} ${hostname}`
}

function NS (prefix, ttl, hostname) {
  return `${prefix} ${ttl} IN NS ${hostname}`
}

function SOA (primary_server, responsible_person, serial, refresh, retry, expire, minimum_ttl) {
  return `${primary_server} IN SOA ${responsible_person} (${serial} ${refresh} ${retry} ${expire} ${minimum_ttl})`
}

function SRV (prefix, ttl, weight, priority, port, hostname) {
  return `${prefix} ${ttl} IN SRV ${weight} ${priority} ${port} ${hostname}`
}

function TXT (prefix, ttl, content) {
  return `${prefix} ${ttl} IN TXT ("${content}")`
}

function recordTypeDispatch (record) {
  // Make a copy of the record, so we don't modify the original.
  let copy = Object.assign(record)

  // Coerce optional values to strings.
  copy.prefix = str(copy.prefix)
  copy.ttl = str(copy.ttl)

  if (copy.record_type === 'A') {
    return A(copy.prefix, copy.ttl, copy.address)
  }
  else if (copy.record_type === 'AAAA') {
    return AAAA(copy.prefix, copy.ttl, copy.address)
  }
  else if (copy.record_type === 'CNAME') {
    return CNAME(copy.prefix, copy.ttl, copy.name)
  }
  else if (copy.record_type === 'MX') {
    return MX(copy.prefix, copy.ttl, copy.priority, copy.name)
  }
  else if (copy.record_type === 'NS') {
    return NS(copy.prefix, copy.ttl, copy.name)
  }
  else if (copy.record_type === 'SOA') {
    return SOA(copy.primary_server, copy.responsible_person, copy.serial, copy.refresh, copy.retry, copy.expire, copy.minimum_ttl)
  }
  else if (copy.record_type === 'SRV') {
    return SRV(copy.prefix, copy.ttl, copy.weight, copy.priority, copy.port, copy.name)
  }
  else if (copy.record_type === 'TXT') {
    return TXT(copy.prefix, copy.ttl, copy.text_content)
  }
  else {
    console.log(record)
    throw new Error('EDZIFCONVERR-001: No renderer found for record type ' + copy.record_type)
  }
}

module.exports = {
  A,
  AAAA,
  CNAME,
  MX,
  NS,
  SOA,
  SRV,
  TXT,
  recordTypeDispatch
}
