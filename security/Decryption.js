const NodeRSA = require('node-rsa');

const private_key = '-----BEGIN RSA PRIVATE KEY-----\n' +
'MIIBOwIBAAJBAMiEqmEaOj9iSUKjtgyJNKtfBu2oSHbdgHJARr/3H2JLrw/Ku3CZ\n' +
'/u9w6t5TN+YvpYzADe4UU+2qzXCqHZ5aYlECAwEAAQJAZaP5yWbGB8MGZ6UcbpZO\n' +
'AGAW3vjiYn480a0LL9tQKT5WNeL44eC6vyKGsD+vIbHVPvWOJsnch/ev6Z5NYm2V\n' +
'0QIhAOUO1Yh9XKGFz6uQy4x51mXfcmXfRgodgi3dotT5UHSzAiEA4Bp4vOpZiLES\n' +
'bAIdPIFFb8HvM2IgCnwg6wX850tYtusCIQChehCs1PuNXuDk6QGl+WpcjOZ/zKP6\n' +
'k4znOp0FGPFQIwIhAMSGcls5KEs2/XC6aekldD8NUzc8Vdzb/gIcviwXZzUBAiBw\n' +
'46juSXi2I57Zhqk81urL4sL3pW+bGgu/kLt+ywYwTg==\n' +
'-----END RSA PRIVATE KEY-----'

const key_private = new NodeRSA(private_key);

function decryptMessage(encryptedMessage) {
  return key_private.decrypt(encryptedMessage, 'utf8');
}

module.exports = {
  decryptMessage
};
