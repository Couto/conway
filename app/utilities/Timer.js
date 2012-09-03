define(['pubsub'], function (pubsub) {

    'use strict';

    /**
     * Timer - A timer object that publishes a tick message at the end
     * of the specified interval. The timer is infinite unless it's stopped
     *
     * @constructor
     * @param {Number} interval Number of miliseconds between each 'tick'
     */
    function Timer(interval) {
        this.interval = interval || 1000;
        this.timer = null;
        this.startedAt = null;
        this.pausedAt = null;
    }

    Timer.prototype = {

        constructor: Timer,
        /**
         * start - Starts the timer. A tick is fired at the end
         * of every interval
         *
         * @public
         * @fires 'timer:started'
         * @fires 'timer:tick'
         * @chainable
         */
        start: function () {
            if (!this.timer) {

                this.startedAt = Date.now();
                this.timer = setTimeout(function () {
                    pubsub.publish('timer:tick');
                }.bind(this), this.interval);
                pubsub.publish('timer:started');
            }

            return this;
        },

        /**
         * stop - Stops the timer.
         *
         * @public
         * @fires 'timer:stopped'
         * @chainable
         */
        stop: function () {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
                pubsub.publish('timer:stopped');
            }

            return this;
        },

        /**
         * pause - Pauses the timer saving the remaing
         * time left in the interval
         *
         * @public
         * @fires 'timer:paused' {Number} remaing time
         * @chainable
         */
        pause: function () {
            if (this.timer) {
                this.remainingTime = Date.now() - this.startedAt;
                clearTimeout(this.timer);
                this.timer = null;
                pubsub.publish('timer:paused', this.remainingTime);
            }

            return this;
        },

        /**
         * resume - Resumes the timer from the remaing
         * time left in the interval before the pause.
         *
         * @public
         * @fires 'timer:resumed' {Number} remaing time
         * @chainable
         */
        resume: function () {
            if (!this.timer) {
                this.timer = setTimeout(this.start.bind(this), this.remainingTime);
                pubsub.publish('timer:resumed', this.remainingTime);
            }

            return this;
        },

        /**
         * dealloc - Frees the resources consumed by the timer.
         * @public
         */
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
