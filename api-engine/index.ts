import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {ApiEngineEventTypeConstants} from "./constants/api-engine-event-type.constants";
import type {EventBusEmitter} from "../eventbus/service/event-bus.emitter";

export function ApiEngine(baseURL: string, emitter?: EventBusEmitter): AxiosInstance {

    const engine = axios.create({
        baseURL: baseURL,
        timeout: (60 * 1000),
        timeoutErrorMessage: 'Timeout error. Please verify service availability and network connection.', //TODO - change this I18n
        headers: {
            'Content-Type': 'application/json'
        }
    });

    engine.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        emitter?.emit(ApiEngineEventTypeConstants.SERVICE_REQUEST_STARTED);
        return config;

    },handleRejectError);

    engine.interceptors.response.use((response: AxiosResponse) => {
        emitter?.emit(ApiEngineEventTypeConstants.SERVICE_REQUEST_ENDED);
        return response;
    },handleRejectError);

    function handleRejectError(error: object): object {
        emitter?.emit(ApiEngineEventTypeConstants.SERVICE_REQUEST_ENDED);
        return Promise.reject(error);
    }


    return engine;
}
