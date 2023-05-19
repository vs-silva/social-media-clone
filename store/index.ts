import {defineStore} from "pinia";
import {UserStore, UserStoreIdentifier} from "./sub-stores/user.store";

export default {
    useUserStore: defineStore(UserStoreIdentifier, UserStore)
};
