import * as Avers from 'avers';


export class Account {
    login : string;
}
Avers.definePrimitive(Account, 'login', '');
