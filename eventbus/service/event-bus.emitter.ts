export interface EventBusEmitter {
    emit(name: string, value?: unknown): void;
}
