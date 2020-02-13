import { User } from "./User";

export class UserStateResponse {
    user: User;
    token: string;
    tokenExpiration: Date;
    message: string;
    success: boolean;

    constructor({user, token, tokenExpiration}) {
        this.user = user;
        this.token = token;
        this.tokenExpiration = tokenExpiration;
    }
}
