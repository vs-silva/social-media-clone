export interface UserServiceReaderDrivenPorts {
    refresh(resource: string): Promise<string | null>;
}
