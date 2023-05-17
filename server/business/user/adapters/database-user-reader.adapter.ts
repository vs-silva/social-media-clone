import type {UserReaderDrivenPorts} from "../ports/user-reader-driven.ports";
import type {UserEntity} from "../core/entity/user.entity";
import DataProvider from "../../../data-provider";
import {User} from "@prisma/client";
import moment from "moment/moment";

export function DatabaseUserReaderAdapter(): UserReaderDrivenPorts {

    const engine = DataProvider;

    async function getBy(expression: () => {}): Promise<UserEntity | null> {

        try {

            const user: User | null = await engine.user.findUnique({
                where: expression()
            });

            if(!user) {
                return null;
            }

            return <UserEntity>{
                id: user.id,
                email: user.email,
                name: user.name as string,
                username: user.username,
                password: user.password,
                profileImage: user.profileImage as string || '',
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };


        } catch (error) {

            //TODO: HANDLE THE ERROR
            console.log(error);
            return null;

        }

    }

    return {
        getBy
    }
}
