import * as Avers from './lib/avers';


export class Account {
    login : string;
}
Avers.definePrimitive(Account, 'login', '');
