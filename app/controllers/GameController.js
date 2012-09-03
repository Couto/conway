define([
    'pubsub',
    'utilities/Timer',
    'collections/CellCollection'
], function (pubsub, Timer, CellCollection) {
    'use strict';

    function GameController() {
        this.collection = new CellCollection();
        this.handlers = {};
        this.generation = 0;
        this.subscribe();

        this.timer = new Timer();
    }

    GameController.prototype = {

        constructor: GameController,

        subscribe: function () {
            this.handlers.gameAdded = pubsub.subscribe('game:added', this.add, this);
            this.handlers.cellAlive = pubsub.subscribe('game:alive', this.setAsAlive, this);
            this.handlers.cellDied = pubsub.subscribe('game:died', this.setAsDead, this);
            this.handlers.clearGame = pubsub.subscribe('sidebar:clear', this.reset, this);
            this.handlers.timerTick = pubsub.subscribe('timer:tick', this.play, this);
        },

        unsubscribe: function () {
            pubsub.unsubscribe(this.handlers.gameAdded);
            pubsub.unsubscribe(this.handlers.cellAlive);
            pubsub.unsubscribe(this.handlers.cellDied);
            pubsub.subscribe(this.handlers.timerTick);
            pubsub.subscribe(this.handlers.timerStopped);
        },

        play: function () {
            this.timer.play();
        },

        stop: function () {
            this.timer.stop();
        },

        pause: function () {
            this.timer.pause();
        },

        resume: function () {
            this.timer.resume();
        },

        reset: function () {
            this.stop();
            this.collection.dealloc();
            this.collection = new CellCollection();
            pubsub.publish('game:reset');
        },

        add: function (cell) {
            this.collection.add(cell);
        },

        setAsAlive: function (id) {
            this.collection.find(id).rebirth();
        },

        setAsDead: function (id) {
            this.collection.find(id).die();
        },

        dealloc: function () {

            if (!this.deallocated) {

                this.unsubscribe();
                this.collection.dealloc();
                this.handlers = null;
                delete this.handlers;
                delete this.generation;

                this.deallocated = true;
                console.log('[DEALLOC] GameController');
            }

        }
    };

    return GameController;

});
