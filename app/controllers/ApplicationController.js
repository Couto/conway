define(['controllers/GameController'], function (GameController) {

    'use strict';

    function ApplicationController() {
        this.gameController = new GameController();

    }

    ApplicationController.prototype = {

        constructor: ApplicationController,

        dealloc: function () {
            if (!this.deallocated) {

                this.gameController.dealloc();
                delete this.gameController;

                this.deallocated = true;
                console.log('[DEALLOC] ApplicationController');

            }
        }

    };

    return ApplicationController;
});
