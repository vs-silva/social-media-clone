<template>

    <div class="flex flex-col h-screen">

        <div class="p-2 my-2 w-min rounded-full hover:bg-blue-50 dark:hover:bg-white/20"
        :class="useTailwindConfig().defaultTransition"
        >

            <nuxt-link to="/">

                <div class="w-8 h-8">
                    <logo-twitter/>
                </div>

            </nuxt-link>

        </div>

        <div class="mt-2 space-y-3">

            <sidebar-left-tab>
                <template v-slot:icon>
                    <home-icon />
                </template>
                <template v-slot:name>
                    Home
                </template>
            </sidebar-left-tab>

            <sidebar-left-tab>
                <template v-slot:icon>
                    <hashtag-icon />
                </template>
                <template v-slot:name>
                    Explore
                </template>
            </sidebar-left-tab>

            <sidebar-left-tab>
                <template v-slot:icon>
                    <bell-icon />
                </template>
                <template v-slot:name>
                    Notifications
                </template>
            </sidebar-left-tab>

            <sidebar-left-tab>
                <template v-slot:icon>
                    <inbox-icon />
                </template>
                <template v-slot:name>
                    Messages
                </template>
            </sidebar-left-tab>

            <sidebar-left-tab>
                <template v-slot:icon>
                    <bookmark-icon />
                </template>
                <template v-slot:name>
                    Bookmarks
                </template>
            </sidebar-left-tab>

            <sidebar-left-tab>
                <template v-slot:icon>
                    <document-text-icon />
                </template>
                <template v-slot:name>
                    Lists
                </template>
            </sidebar-left-tab>

            <sidebar-left-tab>
                <template v-slot:icon>
                    <user-icon />
                </template>
                <template v-slot:name>
                    Profile
                </template>
            </sidebar-left-tab>

            <sidebar-left-tab>
                <template v-slot:icon>
                    <ellipsis-horizontal-circle-icon />
                </template>
                <template v-slot:name>
                    More
                </template>
            </sidebar-left-tab>

        </div>



    </div>

</template>

<script setup lang="ts">
import {HomeIcon} from "@heroicons/vue/24/solid";
import { BellIcon, UserIcon, DocumentTextIcon, InboxIcon, BookmarkIcon, HashtagIcon, EllipsisHorizontalCircleIcon } from "@heroicons/vue/24/outline";

</script>

<style scoped>

</style>
