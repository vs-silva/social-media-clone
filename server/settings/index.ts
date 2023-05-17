export default {
    dbConnectionString: process.env['DATABASE_URL'],
    accessTokenSecret: process.env['JWT_ACCESS_TOKEN_SECRET'],
    refreshTokenSecret: process.env['JWT_REFRESH_TOKEN_SECRET']
};
