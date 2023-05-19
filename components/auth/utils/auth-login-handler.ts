import {UserAuthDTO} from "../../../server/business/user/core/dto/user-auth.dto";

export async function AuthLoginHandler(dto: UserAuthDTO): Promise<void> {
    console.log('IN THA HOUSE::::',dto);
}
