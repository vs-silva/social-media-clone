import DataProvider from "../../../data-provider";
import {User} from "@prisma/client";
import type {UserWriterDrivenPorts} from "../ports/user-writer-driven.ports";
import type {UserEntity} from "../core/entity/user.entity";
import type {UserCreateUpdateDTO} from "../core/dto/user-create-update.dto";


export function DatabaseUserWriterAdapter(): UserWriterDrivenPorts {

    const engine = DataProvider;

    async function save(dto: UserCreateUpdateDTO): Promise<UserEntity | null> {

        try {

            const user: User =  await engine.user.create({
                data: dto
            });

            return <UserEntity> {
                id: user.id,
                email: user.email,
                name: user.name as string,
                username: user.username,
                password: user.password,
                profileImage: user.profileImage,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };

        } catch (error) {

            //TODO: HANDLE THE ERROR
            console.log(error);
            return null;

        }

    }

    async function remove(userId: string): Promise<UserEntity | null> {

        try {

            const user: User =  await engine.user.delete({
                where: {
                    id: userId
                }
            });

            return <UserEntity> {
                id: user.id,
                email: user.email,
                name: user.name as string,
                username: user.username,
                password: user.password,
                profileImage: user.profileImage,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };

        } catch (error) {
            return null;
        }

    }

    return {
        save,
        remove
    };
}
