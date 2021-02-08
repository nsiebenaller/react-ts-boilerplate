const expressJWT = require("express-jwt");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET || "secret";
const tokenName = process.env.TOKEN_NAME || "token";
const tokenExpiresIn = "1d";

let blacklist = [];
function updateBlacklist() {
    return new Promise(() => {
        const now = new Date().getTime();
        blacklist = blacklist.filter((token) => {
            const verifiedToken = jwt.verify(token, secret);
            if (!verifiedToken) return false;
            const { exp } = verifiedToken;
            if (!exp) return null;
            const expire = parseInt(exp * 1000);
            if (expire < now) return false;
            return true;
        });
    });
}

const checkToken = expressJWT({
    secret,
    algorithms: ["HS256"],
    getToken: (req) => {
        const token = req.cookies[tokenName];
        if (!token) return null;
        if (blacklist.includes(token)) return false;
        const verifiedToken = jwt.verify(token, secret);
        if (!verifiedToken) return false;
        const { exp, revoked } = verifiedToken;
        if (!exp) return false;

        // Check revoked
        if (revoked) return false;

        // Check expired
        const now = new Date().getTime();
        const expire = parseInt(exp * 1000);
        if (expire < now) return false;

        return token;
    },
});

const getToken = (req) => {
    const token = req.cookies[tokenName];
    if (!token) return null;
    if (blacklist.includes(token)) return null;
    try {
        const verifiedToken = jwt.verify(token, secret);
        if (!verifiedToken) return null;
        const { exp, revoked } = verifiedToken;
        if (!exp) return null;

        // Check revoked
        if (revoked) return false;

        // Check if expired
        const now = new Date().getTime();
        const expire = parseInt(exp * 1000);
        if (expire < now) return null;

        return verifiedToken;
    } catch (e) {
        console.error(e);
        return null;
    }
};

const revokeToken = (req) => {
    const token = req.cookies[tokenName];
    if (!token) return;
    blacklist.push(token);
    updateBlacklist();
};

const signToken = (data) => {
    updateBlacklist();
    return jwt.sign(data, secret, { expiresIn: tokenExpiresIn });
};

module.exports = {
    secret,
    tokenName,
    checkToken,
    getToken,
    revokeToken,
    signToken,
};
