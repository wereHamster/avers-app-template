/// <reference path="./ext/react.d.ts" />

import {App} from './app';


export function loadingView(app: App) {
    return (
        <div>
            Loading...
        </div>
    );
}

export function indexView(app: App) {
    return (
        <div>
            Welcome to the Avers App Template
            <a href='/not-found'>go to another page</a>
        </div>
    );
}

export function notFoundView(app: App) {
    return (
        <div>
            Not Found
            <a href='/'>back to index</a>
        </div>
    );
}
