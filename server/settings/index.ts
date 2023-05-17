const config = useRuntimeConfig();

export default {
    accessTokenSecret: config.jwtAccessToken,
    refreshTokenSecret: config.jwtRefreshToken
};
