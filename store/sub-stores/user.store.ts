import {AxiosInstance} from "axios/index";
import {ApiEngine} from "../../api-engine";
import jwt_decode from "jwt-decode";
import Eventbus from "../../eventbus";
import User from "../../integration/user";
import {ApiEngineResourceEndpointConstants} from "../../api-engine/constants/api-engine-resource-endpoint.constants";
import type {UserAuthDTO} from "../../server/business/user/core/dto/user-auth.dto";
import type {UserDTO} from "../../server/business/user/core/dto/user.dto";
import type {UserResponseDTO} from "../../server/business/user/core/dto/user-response.dto";

export const UserStoreIdentifier = 'user-store';

export function UserStore() {

    const apiEngine: AxiosInstance = ApiEngine(ApiEngineResourceEndpointConstants.ROOT, Eventbus);

    const userAuthData = ref(<UserAuthDTO>{
        username: '',
        password: ''
    });

    const user = ref<UserDTO | UserResponseDTO | null>(null);
    const accessToken = ref<string | null>(null);
    const accessTokenExpireTime = ref(0);

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
    }

    async function getUser(): Promise<void> {

        try {
            const response = await apiEngine.get(ApiEngineResourceEndpointConstants.USER);
            user.value = response.data;
        } catch (error) {
            user.value = null;
        }

    }

    async function autoRenewAccessToken(): Promise<void> {

        if(!accessToken.value) {
            return;
        }

        const decodedAccessToken = jwt_decode(accessToken.value as unknown as string) as {userId: string, iat: number, exp: number};
        const timeoutTimer = decodedAccessToken.exp - 60000;

        setTimeout(async () => {
            await refreshToken();
        }, timeoutTimer);
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
