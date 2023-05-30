import {AxiosInstance} from "axios/index";
import {ApiEngine} from "../../api-engine";
import Eventbus from "../../eventbus";
import {ApiEngineResourceEndpointConstants} from "~/api-engine/constants/api-engine-resource-endpoint.constants";
import type {UserAuthDTO} from "../../server/business/user/core/dto/user-auth.dto";

export const UserStoreIdentifier = 'user-store';

export function UserStore() {

    const apiEngine: AxiosInstance = ApiEngine(ApiEngineResourceEndpointConstants.ROOT, Eventbus);

    const userAuthData = ref(<UserAuthDTO>{
        username: '',
        password: ''
    });

    const user = ref(null);

    async function userAuthLoginHandler(dto: UserAuthDTO): Promise<void> {

        try {

            const response = await apiEngine.post(ApiEngineResourceEndpointConstants.LOGIN, <UserAuthDTO>{
                username: dto.username,
                password: dto.password
            });

            user.value = response.data;

        } catch (error) {
            console.log(error); //TODO: Toaster Message for this
            user.value = null;
            return;
        }
    }

    async function refreshToken(): Promise<void> {

        try {

            const response = await apiEngine.get(ApiEngineResourceEndpointConstants.REFRESH);

            console.log('REFRESHED TOKEN:::',response.data);

        } catch (error) {
            console.log(error); //TODO: Toaster Message for this

            return;
        }

    }

    return {
        userAuthData,
        user,
        userAuthLoginHandler,
        refreshToken
    };
}
