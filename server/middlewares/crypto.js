const crypto = require('crypto')
const CryptoJS = require("crypto-js")

const secret = 'rduQIhZ9MrU4n9jHg46O'
// const verify = (password) => {
//   const encrypted = crypto.createHmac('sha1', config.secret)
//                     .update(password)
//                     .digest('base64')
//   console.log(this.password === encrypted)

//   return this.password === encrypted
// }

const aes = {
  encrypted: data => {
    return CryptoJS.AES.encrypt(data, secret)
  },
  decrypted: data => {
    const bytes = CryptoJS.AES.decrypt(data, secret)
    return bytes.toString(CryptoJS.enc.Utf8)
  }
}

const randomString = (size) => {
  return crypto.randomBytes(size).toString('hex')
}

module.exports = {
  aes,
  randomString
}