import {describe, expect, it, vi} from "vitest";
import {faker} from "@faker-js/faker";
import type {CreateUpdateUserDTO} from "../core/dto/create-update-user.dto";
import type {UserDTO} from "../core/dto/user.dto";
import User from "../index";
import {SymbolKind} from "vscode-languageserver-types";
import Null = SymbolKind.Null;

describe('User service tests', () => {

    const idRegex = /\b[0-9a-f]{24}\b/;

    const fakeCreateUser: CreateUpdateUserDTO = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: faker.internet.password()
    };

    it('save should create a new user', async () => {

        const spy = vi.spyOn(User, 'save');
        const result = await User.save(fakeCreateUser);

        expect(spy).toHaveBeenCalledOnce();
        expect(spy).toHaveBeenCalledWith(fakeCreateUser);

        expect(result).toBeTruthy();
        expect(result?.id).toBeTruthy();
        expect(result?.id).toMatch(idRegex);

        expect(result).toStrictEqual(expect.objectContaining(<UserDTO>{
            id: expect.any(String),
            email: expect.any(String),
            name: expect.any(String),
            username: expect.any(String),
            profileImage: expect.any(String),
            profileCreateDate: expect.any(String),
            profileLastUpdateDate: expect.any(String),
        }));

    });

});
