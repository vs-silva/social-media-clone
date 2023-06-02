import {AxiosInstance} from "axios/index";
import {ApiEngine} from "../../api-engine";
import Eventbus from "../../eventbus";
import {ApiEngineResourceEndpointConstants} from "../../api-engine/constants/api-engine-resource-endpoint.constants";
import {ApiEngineHeaderConstants} from "../../api-engine/constants/api-engine-header.constants";
import {ApiEngineResponseFieldsConstants} from "../../api-engine/constants/api-engine-response-fields.constants";
import type {UserAuthDTO} from "../../server/business/user/core/dto/user-auth.dto";

export const UserStoreIdentifier = 'user-store';

export function UserStore() {

    const apiEngine: AxiosInstance = ApiEngine(ApiEngineResourceEndpointConstants.ROOT, Eventbus);

    const userAuthData = ref(<UserAuthDTO>{
        username: '',
        password: ''
    });

    const user = ref(null);
    const accessToken = ref(null);

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
            accessToken.value = response.data[`${ApiEngineResponseFieldsConstants.ACCESS_TOKEN}`];
            apiEngine.defaults.headers.common[`${ApiEngineHeaderConstants.AUTHORIZATION}`] = `Bearer ${accessToken.value}`;
        } catch (error) {
            accessToken.value = null;
            return;
        }

    }

    async function getUser(): Promise<void> {

        try {
            const response = await apiEngine.get(ApiEngineResourceEndpointConstants.USER);
            user.value = response.data;
        } catch (error) {
            user.value = null;
        }

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
