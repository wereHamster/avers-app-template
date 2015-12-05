/// <reference path="./ext/react.d.ts" />
/// <reference path="./ext/react-dom.d.ts" />

import * as Avers from './lib/avers';
import {Account} from './storage';
import configObject from './config';
import {Handle, processStyleProperties} from "inline-style-emitter";



// -----------------------------------------------------------------------------
// Config
//
// Static coniguration that is loaded during initialiation.

export class Config {
    apiHost : string;
}

Avers.definePrimitive(Config, 'apiHost', '//localhost:8000');

export const config = Avers.mk<Config>(Config, configObject);



// -----------------------------------------------------------------------------
// App

export class App {
    constructor
      ( public containerElement : Element
      , public styleEmitterH    : Handle
      , public data             : Data
      , public mkViewFn         : (app: App) => any
      ) {}
}



// -----------------------------------------------------------------------------
// Avers InfoTable

export const infoTable = new Map<string, Avers.ObjectConstructor<any>>();
infoTable.set('account', Account);



// -----------------------------------------------------------------------------
// Data

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
    let rootReactElement = processStyleProperties(app.styleEmitterH, React, app.mkViewFn(app));
    ReactDOM.render(rootReactElement, app.containerElement);
}

export function
loadView(app: App, mkViewFn: (app: App) => React.ReactElement<any>): void {
    app.mkViewFn = mkViewFn;
    refresh(app);
}
