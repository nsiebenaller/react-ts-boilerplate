require("dotenv").config();
module.exports = {
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB,
        host: process.env.DB_HOST,
        dialect: "postgres",
    },
    development: {
        username: process.env.DB_USER || "postgres",
        password: process.env.DB_PWD || "postgres",
        database: process.env.DB || "mydb",
        host: process.env.DB_HOST || "127.0.0.1",
        dialect: "postgres",
    },
};
