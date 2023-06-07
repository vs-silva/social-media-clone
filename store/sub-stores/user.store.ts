import {AxiosInstance} from "axios/index";
import {ApiEngine} from "../../api-engine";
import Eventbus from "../../eventbus";
import User from "../../integration/user";
import {ApiEngineResourceEndpointConstants} from "../../api-engine/constants/api-engine-resource-endpoint.constants";
import type {UserAuthDTO} from "../../server/business/user/core/dto/user-auth.dto";
import type {UserResponseDTO} from "../../server/business/user/core/dto/user-response.dto";

export const UserStoreIdentifier = 'user-store';

export function UserStore() {

    const apiEngine: AxiosInstance = ApiEngine(ApiEngineResourceEndpointConstants.ROOT, Eventbus);

    const userAuthData = ref(<UserAuthDTO>{
        username: '',
        password: ''
    });

    const user = ref< UserResponseDTO | null>(null);
    const accessToken = ref<string | null>(null);

    async function userAuthLoginHandler(dto: UserAuthDTO): Promise<void> {

        const response = await User.login(<UserAuthDTO>{
            username: dto.username,
            password: dto.password
        });

        if(!response) {
            user.value = null;
            return;
        }

        user.value = response;
    }

    async function refreshToken(): Promise<void> {

        const response = await User.refreshToken();

        if(!response) {
            accessToken.value = null;
            return;
        }

        accessToken.value = response;
        await renewAccessToken();
    }

    async function getUser(): Promise<void> {

        const response = await User.getUser();

        if(!response) {
            user.value = null;
            return;
        }

        user.value = response;

    }

    async function renewAccessToken(): Promise<void> {

        if(!accessToken.value) {
            return;
        }

        const result = await User.decodeAccessToken(accessToken.value);

        if(!result) {
            return;
        }

        setTimeout(async () => {
            await refreshToken();
        }, result.renewCountTimer);

    }

    return {
        userAuthData,
        user,
        accessToken,
        userAuthLoginHandler,
        refreshToken,
        getUser
    };
}
