const config = useRuntimeConfig();

export default {
    dbConnectionString: config.databaseURL,
    accessTokenSecret: config.jwtAccessToken,
    refreshTokenSecret: config.jwtRefreshToken
};
