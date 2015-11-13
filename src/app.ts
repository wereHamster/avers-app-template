/// <reference path="./env/config.d.ts" />
/// <reference path="./ext/react.d.ts" />
/// <reference path="./ext/react-dom.d.ts" />

import * as Avers from './lib/avers';
import {Account} from './storage';



export class App {
    constructor
      ( public containerElement : Element
      , public data             : Data
      , public mkViewFn         : (app: App) => any
      ) {}
}


export const infoTable = new Map<string, Avers.ObjectConstructor<any>>();
infoTable.set('account', Account);



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


export function
refresh(app: App): void {
    ReactDOM.render(app.mkViewFn(app), app.containerElement);
}

export function
loadView(app: App, mkViewFn: (app: App) => __React.ReactElement<any>): void {
    app.mkViewFn = mkViewFn;
    refresh(app);
}
