export class SignUpVM {
    FirstName: string;
    NicName: string;
    Email: string;
    Password: string;


    constructor(firstName: string, NicName: string, email: string, password: string) {
        this.FirstName = firstName;
        this.NicName = NicName;
        this.Email = email;
        this.Password = password;
    }
}
