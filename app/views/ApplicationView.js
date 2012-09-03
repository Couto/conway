define([
    'pubsub',
    'views/GameView',
    'views/SidebarView'
], function (pubsub, GameView, SidebarView) {

    'use strict';

    function ApplicationView() {
        this.gameView = new GameView();
        this.sidebarView = new SidebarView();

        this.handlers = {};
        this.setGameWidth(10);
        this.setGameHeight(10);

        this.element = document.body;
        this.element.querySelector('.field').appendChild(this.gameView.build());
    }

    ApplicationView.prototype = {

        constructor: ApplicationView,

        setGameWidth: function (width) {
            this.gameView.setWidth(width);
        },

        setGameHeight: function (height) {
            this.gameView.setHeight(height);
        },

        subscribe: function () {

        },
        unsubscribe: function () {},

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
