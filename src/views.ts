/// <reference path="./ext/react.d.ts" />

import {App} from './app';


export function indexView(app: App) {
    return React.DOM.div
        ( {}
        , 'Welcome to the Avers App Template'
        );
}
