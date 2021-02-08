const db = require("../models");
const security = require("./security");

module.exports = (router) => {
    security(router);
};
