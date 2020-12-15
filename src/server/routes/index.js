const db = require("../models");
const {
    tokenName,
    checkToken,
    getToken,
    revokeToken,
    signToken,
} = require("../jwt");

module.exports = (router) => {
    router.route("/Login").get((req, res) => {
        let token = getToken(req);
        if (!token) {
            token = signToken({ user: "me" });
            res.cookie(tokenName, token);
        }
        res.json({ success: true });
    });
    router.route("/Check").get((req, res) => {
        const token = getToken(req);
        res.json({ success: !!token });
    });
    router.route("/Logout").get((req, res) => {
        revokeToken(req);
        res.clearCookie(tokenName);
        res.json({ success: true });
    });
    router.route("/Test/protected").get(checkToken, (req, res) => {
        res.json({ success: true, data: ["Pig", "Cow", "Duck"] });
    });
};
