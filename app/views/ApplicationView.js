define(['views/GameView'], function (GridView) {

    'use strict';

    function ApplicationView() {
        this.setGridView(20, 20);
    }

    ApplicationView.prototype = {

        constructor: ApplicationView,

        setGridView: function (width, height) {
            this.gridView = new GridView(width, height);
            document.body.appendChild(this.gridView.build());
        },

        unsetGridView: function () {
            this.gridView.dealloc();
            delete this.gridView;
        },

        dealloc: function () {
            if (!this.deallocated) {
                this.gridView.dealloc();
                delete this.gridView;

                this.deallocated = true;
                console.log('[DEALLOC] ApplicationView');
            }
        }

    };

    return ApplicationView;
});
