import type {UserWriterDrivenPorts} from "../ports/user-writer-driven.ports";
import type {CreateUpdateUserDTO} from "../core/dto/create-update-user.dto";
import DataProvider from "../../../data-provider";
import {User} from "@prisma/client";
import type {UserEntity} from "../core/entity/user.entity";
import moment from "moment";

export function DatabaseUserWriterAdapter(): UserWriterDrivenPorts {

    const engine = DataProvider;

    async function createUser(dto: CreateUpdateUserDTO): Promise<UserEntity | null> {

        try {

            const user: User =  await engine.user.create({
               data: dto
            });

            return <UserEntity>{
                id: user.id,
                email: user.email,
                name: user.name as string,
                username: user.username,
                password: user.password,
                profileImage: user.profileImage as string || '',
                createdAt: moment(user.createdAt).format('LLLL'),
                updatedAt: moment(user.createdAt).format('LLLL')
            };

        } catch (error) {

            //TODO: HANDLE THE ERROR
            console.log(error);
            return null;

        }



    }

    return {
        createUser
    };
}
