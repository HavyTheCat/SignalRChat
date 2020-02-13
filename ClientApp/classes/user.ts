export class User {
    firstName: string;
    nicname: string;
    photoUrl: string;

    constructor({firstName, lastName, photoUrl}) {
        this.firstName = firstName;
        this.nicname = lastName;
        this.photoUrl = photoUrl;
    }
}
