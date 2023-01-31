const bycrypt = require('bcryptjs')

function hashPassword(password) {
    const salt = bycrypt.genSaltSync()
    return bycrypt.hashSync(password, salt)
}

function comparePassword(userPassword, hashPassword) {
    return bycrypt.compareSync(userPassword, hashPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}