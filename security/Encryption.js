const NodeRSA = require("node-rsa");

const public_key ="-----BEGIN PUBLIC KEY-----\n" +
"MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMiEqmEaOj9iSUKjtgyJNKtfBu2oSHbd\n" +
"gHJARr/3H2JLrw/Ku3CZ/u9w6t5TN+YvpYzADe4UU+2qzXCqHZ5aYlECAwEAAQ==\n" +
"-----END PUBLIC KEY-----";


const key_public = new NodeRSA(public_key);

function encryptMessage(message) {
  return key_public.encrypt(message, "base64");
}

module.exports = {
  encryptMessage,
};
