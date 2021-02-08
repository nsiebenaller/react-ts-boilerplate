const bcrypt = require("bcryptjs");

const saltRounds = 10;

function compare(text, hash) {
    return new Promise((resolve) => {
        bcrypt.compare(text, hash, (_err, result) => {
            resolve(result);
        });
    });
}
function encrypt(text) {
    return new Promise((resolve) => {
        bcrypt.hash(text, saltRounds, (err, hash) => {
            resolve(hash);
        });
    });
}

module.exports = {
    compare,
    encrypt,
};
