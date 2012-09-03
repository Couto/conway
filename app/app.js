define(['Application'], function (Application) {
    'use strict';

    var conways = new Application();
    conways.start();

    // Equivalent to jQuery.ready
    document.addEventListener('DOMContentLoaded', conways.start.bind(conways));
    window.addEventListener('unload', conways.end.bind(conways));

});
