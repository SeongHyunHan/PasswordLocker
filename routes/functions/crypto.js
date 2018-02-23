const jwt = require('jsonwebtoken');

const encrypt = (password) => {
    password = jwt.sign(password, 'passwordLocker').toString();
    return password;
};

const decrypt = (encryptPassword) => {
    const decrypt = jwt.verify(encryptPassword, 'passwordLocker');
    return decrypt;
};

module.exports = {
    encrypt,
    decrypt
}