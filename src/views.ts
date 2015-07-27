/// <reference path="./ext/react.d.ts" />

import {App} from './app';


export function loadingView(app: App) {
    return React.DOM.div
        ( {}
        , 'Loading...'
        );
}

export function indexView(app: App) {
    return React.DOM.div
        ( {}
        , 'Welcome to the Avers App Template '
        , React.DOM.a({ href: '/not-found' }, 'go to another page')
        );
}

export function notFoundView(app: App) {
    return React.DOM.div
        ( {}
        , 'Not Found '
        , React.DOM.a({ href: '/' }, 'back to index')
        );
}
