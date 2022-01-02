// NODE_ENV="development"
// # database environment variables
// MYSQL_ROOT_PASSWORD="ea2a6ec5a8fea230a089e5e1da5b00b56b42d0dd757252d1600d3f7f9d53561c9b86017f26e6e8e8d1f2dc518e215f6902181161b9287e3bd05c2a7a5358f525"
// MYSQL_DATABASE="crm"
// MYSQL_PORT=3307
// # app config
// APP_PORT=8080
// APP_PREFIX="api/v1"
// APP_SECRET_TOKEN="4aa42a671f36fa5a01b4640eae7db406970073ba8bfa83420b074c19a0e286cff3d8ed418dfa40d493748016164b0f5986fac0ec700906157f934651e1a6bf1a"

// # google strategy config
// GOOGLE_CLIENT_ID="584576118618-dosui734g677u72dh002gvddhrdmuh4k.apps.googleusercontent.com"
// GOOGLE_SECRET_KEY="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"
// GOOGLE_SUCCESS_REDIREC="http://localhost:8080/api/v1/auth/google/redirect"

export const appConfig = () => ({
  app: {
    port: process.env.APP_PORT || '8080',
    prefix: process.env.APP_PREFIX || 'api/v1',
    secretToken: process.env.APP_SECRET_TOKEN || 'secretToken',
    dbHost: process.env.MYSQL_HOST || 'localhost',
    version: process.env.APP_VERSION || 'localhost',
  },
  database: {
    password: process.env.MYSQL_ROOT_PASSWORD || '123456',
    name: process.env.MYSQL_DATABASE || 'crm',
    port: process.env.MYSQL_PORT || '3306',
  },
  google: {
    id: process.env.GOOGLE_CLIENT_ID || '',
    secret: process.env.GOOGLE_SECRET_KEY || '',
    redirectURL: process.env.GOOGLE_SUCCESS_REDIRECT || '',
  },
});
