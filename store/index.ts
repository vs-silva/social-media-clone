import {defineStore} from "pinia";
import {UserStore, UserStoreIdentifier} from "./sub-stores/user.store";
import {TweetStore, TweetStoreIdentifier} from "./sub-stores/tweet.store";

export default {
    useUserStore: defineStore(UserStoreIdentifier, UserStore),
    useTweetStore: defineStore(TweetStoreIdentifier, TweetStore)
};
