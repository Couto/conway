define([
    'views/ApplicationView',
    'controllers/ApplicationController'
], function (ApplicationView, ApplicationController) {

    'use strict';

    function Application() {
        this.applicationView = {};
        this.applicationController = {};
    }

    Application.prototype = {

        constructor: Application,

        start: function () {
            this.applicationController = new ApplicationController();
            this.applicationView = new ApplicationView();

        },

        end: function () {
            console.log("ended");
            this.applicationView.dealloc();
            this.applicationController.dealloc();
        }
    };

    return Application;

});
