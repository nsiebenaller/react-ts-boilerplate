# Full-Stack React Typescript Boilerplate

Full Stack React Typescript Boilerplate, utilizing Typescript React, Javascript ExpressJS, and Sequelize all powered by SWC with Webpack. Also comes
with extensions for an easy Elastic Beanstalk deploy.

## Quick Start

```bash
# Clone
git clone https://github.com/nsiebenaller/react-ts-boilerplate.git

# Dive inside
cd react-ts-boilerplate

# Install
npm install

# Start development
npm run dev
```

## Deployment

1. Zip all contents except for 'node_modules' & 'package-lock.json'
2. Upload zip to a configured Elastic Beanstalk application
3. (Make sure the database is created and environment variable are set accordingly)

## Environment Variables

```bash
DB_USER = database user (Default for dev: "postgres")
DB_PWD = database password (Default for dev: "postgres")
DB = database name (Default for dev: "mydb")
DB_HOST = database host (Default for dev: "127.0.0.1")
PORT = port for the server to run on (Default: 3000)
SECRET = secret key for signing tokens (Default: "secret")
TOKEN_NAME = token name to be set for authentication jwt (Default: "token")
```
