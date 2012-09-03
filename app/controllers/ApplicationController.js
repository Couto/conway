define([
    'controllers/GameController',
    'controllers/TimerController'
], function (GameController, TimerController) {

    'use strict';

    function ApplicationController() {
        this.gameController = new GameController();
        this.timerController = new TimerController();
    }

    ApplicationController.prototype = {

        constructor: ApplicationController,

        dealloc: function () {
            if (!this.deallocated) {

                this.timerController.dealloc();
                delete this.timerController;

                this.gameController.dealloc();
                delete this.gameController;

                this.deallocated = true;
                console.log('[DEALLOC] ApplicationController');

            }
        }

    };

    return ApplicationController;
});
