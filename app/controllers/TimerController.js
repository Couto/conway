define(['pubsub'], function (pubsub) {

    'use strict';

    function Timer() {
        this.timer = null;
        this.startedAt = null;
        this.pausedAt = null;
    }

    Timer.prototype = {

        constructor: Timer,

        start: function () {
            if (!this.timer) {

                this.startedAt = Date.now();
                this.timer = setTimeout(function () {
                    pubsub.publish('timer:tick');
                }.bind(this), this.interval);

            }

            return this;
        },
        stop: function () {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
                pubsub.publish('timer:stopped');
            }

            return this;
        },
        pause: function () {
            if (this.timer) {
                this.pausedAt = Date.now();
                clearTimeout(this.timer);
                this.timer = null;
                pubsub.publish('timer:paused');
            }
        },
        resume: function () {
            if (!this.timer) {
                this.timer = setTimeout(this.start.bind(this), this.pausedAt - this.startedAt);
                pubsub.publish('timer:resumed');
            }
        },

        dealloc: function () {
            if (!this.deallocated) {
                if (this.timer) { clearTimeout(this.timer); }
                delete this.timer;
                delete this.startedAt;
                delete this.pausedAt;

                this.deallocated = true;
                console.log('[DEALLOC] timer');
            }
        }
    };

    return Timer;

});
