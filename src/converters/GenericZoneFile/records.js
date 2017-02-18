'use strict'

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

function SOA (nameserver, contact, serial, refresh, retry, expire, ttl) {
  return `${nameserver} IN SOA ${contact} (${serial} ${refresh} ${retry} ${expire} ${ttl})`
}

function SRV (prefix, ttl, weight, priority, port, hostname) {
  return `${prefix} ${ttl} IN SRV ${weight} ${priority} ${port} ${hostname}`
}

function TXT (prefix, ttl, content) {
  return `${prefix} ${ttl} IN TXT ("${content}")`
}

module.exports = {
  A,
  AAAA,
  CNAME,
  MX,
  NS,
  SOA,
  SRV,
  TXT
}
