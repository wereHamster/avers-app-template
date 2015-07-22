import * as Avers from './lib/avers';
import {App, mkApp, refresh, loadView} from './app';
import {indexView} from './views';


export default function() {
    console.info('Starting app...');

    // Create the application instance. Pass all required configuration to the
    // constructor.
    let app = mkApp();

    // Attach a listener to watch for changes. Refresh the application UI
    // when any change happens. This is the main rendering loop of the
    // application. The 'console.info' shows you how frequently the application
    // data changes.
    Avers.attachGenerationListener(app.data.aversH, () => {
        console.info('Generation', app.data.aversH.generationNumber);
        refresh(app);
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
        loadView(app, () => {
            return indexView(app);
        });
    });

    page();
}