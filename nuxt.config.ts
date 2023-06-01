// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
    typescript: {
        typeCheck: true
    },
    runtimeConfig: {
        databaseURL: process.env.DATABASE_URL,
        jwtAccessToken: process.env.JWT_ACCESS_TOKEN_SECRET,
        jwtRefreshToken: process.env.JWT_REFRESH_TOKEN_SECRET,
    }
});
