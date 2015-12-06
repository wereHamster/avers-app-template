import * as Avers from 'avers';
import {Data, App, config, infoTable, loadView} from './app';
import {loadingView, indexView, notFoundView} from './views';
import {Handle, DocumentEmitter, processStyleProperties} from "inline-style-emitter";



function mkApp(): App {
    let aversH = new Avers.Handle
        ( config.apiHost
        , (<any>window).fetch.bind(window)
        , window.performance.now.bind(window.performance)
        , infoTable
        );

    let data = new Data(aversH);

    return new App
        ( data
        , loadingView
        );
}

export default function() {
    console.info('Starting app...');

    // References to the DOM resources which we'll be using to show the
    // application. One is the container element where we render the React
    // virtual DOM into, the other is a handle to the stylesheet object into
    // which we'll insert CSS rules.
    let containerElement = document.getElementById('root')
      , styleEmitterH    = new Handle(new DocumentEmitter(document));

    // Create the application instance. Pass all required configuration to the
    // constructor.
    let app = mkApp();

    // Attach a listener to watch for changes. Refresh the application UI
    // when any change happens. This is the main rendering loop of the
    // application. The 'console.info' shows you how frequently the application
    // data changes.
    Avers.attachGenerationListener(app.data.aversH, () => {
        console.info('Generation', app.data.aversH.generationNumber);

        let rootReactElement = processStyleProperties(styleEmitterH, React, app.mkViewFn(app));
        ReactDOM.render(rootReactElement, containerElement);
    });

    // This template uses page.js for the router. If you target modern browsers
    // you may get away with a more straightforward implementation and listen
    // to the hashchange events directly.
    setupRoutes(app);

    // The app template makes use of the Avers Session. First thing we try to
    // do is to restore an existing session. The views will use the information
    // that is stored in the session object to determine what to show.
    Avers.restoreSession(app.data.session);

    // Expose some useful tools on 'window' to make them easily accessible from
    // the developer console. This part is entirely optional, though
    // I recommend to keep it even in production. It doesn't add any significant
    // overhead and gives you easy access to the application state.
    (<any>window).Avers = Avers;
    (<any>window).app   = app;
}


declare var page;
function setupRoutes(app: App) {
    page('/', () => {
        loadView(app, app => {
            return indexView(app);
        });
    });


    // Your router MUST have a catch-all handler, otherwise you'll get
    // a redirect loop on the client!

    page('*', () => {
        loadView(app, app => {
            return notFoundView(app);
        });
    });

    page();
}
