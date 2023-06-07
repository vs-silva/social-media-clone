import type {UserServiceReaderDrivenPorts} from "../ports/user-service-reader-driven.ports";
import {AxiosInstance} from "axios";
import {ApiEngine} from "../../../api-engine";
import {ApiEngineHeaderConstants} from "../../../api-engine/constants/api-engine-header.constants";
import Eventbus from "../../../eventbus";
import {ApiEngineResourceEndpointConstants} from "../../../api-engine/constants/api-engine-resource-endpoint.constants";
import {UserServiceResponseFieldsConstants} from "../core/constants/user-service-response-fields.constants";
import type {UserResponseDTO} from "../../../server/business/user/core/dto/user-response.dto";

export function RestApiReaderAdapter(): UserServiceReaderDrivenPorts {

    const apiEngine: AxiosInstance = ApiEngine(ApiEngineResourceEndpointConstants.ROOT, Eventbus);

    async function refresh(resource: string): Promise<string | null> {

        try {
            const response = await apiEngine.get(resource);
            const accessToken = response.data[`${UserServiceResponseFieldsConstants.ACCESS_TOKEN}`];
            apiEngine.defaults.headers.common[`${ApiEngineHeaderConstants.AUTHORIZATION}`] = `Bearer ${accessToken}`;

            return accessToken;

        } catch (error) {
            return null;
        }
    }

    async function getUserInfo(resource: string): Promise<UserResponseDTO | null> {

        try {
            const response = await apiEngine.get(resource);
            return response.data;
        } catch (error) {
            return null;
        }

    }

    return {
      refresh,
      getUserInfo
    };
}
