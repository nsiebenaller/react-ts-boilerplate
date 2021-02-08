const db = require("../models");
const {
    tokenName,
    checkToken,
    getToken,
    revokeToken,
    signToken,
} = require("../managers/jwtManager");

module.exports = (router) => {
    router.route("/getToken").get((req, res) => {
        let token = getToken(req);
        if (!token) {
            token = signToken({});
            res.cookie(tokenName, token);
        }
        res.json({ success: true });
    });
    router.route("/checkToken").get((req, res) => {
        const token = getToken(req);
        res.json({ success: !!token });
    });
    router.route("/revokeToken").get((req, res) => {
        revokeToken(req);
        res.clearCookie(tokenName);
        res.json({ success: true });
    });
    router.route("/debug").get(checkToken, (req, res) => {
        res.json({ success: true, data: ["Pig", "Cow", "Duck"] });
    });
};
