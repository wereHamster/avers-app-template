import * as Avers from './lib/avers';
import {Account} from './storage';


export class App {
    constructor
      ( public data : Data
      ) {}
}

const infoTable = new Map<string, Avers.ObjectConstructor<any>>();
infoTable.set('account', Account);

export function mkApp(): App {
    let aversH = new Avers.Handle
        ( '//localhost:8080/'
        , (<any>window).fetch.bind(window)
        , window.performance.now.bind(window.performance)
        , infoTable
        );

    let data = new Data(aversH);

    return new App(data);
}



export class Data {

    session : Avers.Session;

    // Add collections, statics, ephemerals and other data which is managed
    // by avers here.
    //
    // clientVersion : Avers.Ephemeral<string>;
    // accountsCollection : Avers.ObjectCollection;


    constructor(public aversH: Avers.Handle) {
        this.session = new Avers.Session(aversH);
    }
}


export function refresh(app: App): void {
}

export function loadView(app: App, mkViewFn: () => any): void {
}
