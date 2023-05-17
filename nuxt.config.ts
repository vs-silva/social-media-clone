// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    typescript: {
        typeCheck: true
    },
    runtimeConfig: {
        jwtAccessToken: process.env.JWT_ACCESS_TOKEN_SECRET,
        jwtRefreshToken: process.env.JWT_REFRESH_TOKEN_SECRET,
    }
});
