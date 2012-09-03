define(['../pubsub'], function (pubsub) {

    'use strict';

    /**
     * CellView
     * @param {Object} coordinates Object containing x and y coordinates
     */
    function CellView(coordinates) {
        this.coordinates = coordinates;
        this.id = 'x' + this.coordinates.x + 'y' + this.coordinates.y;
        this.alive = false;
        this.element = document.createElement('div');
        this.element.setAttribute('id', this.id);
        this.element.setAttribute('class', 'cell');
    }

    CellView.prototype = {

        constructor: CellView,

        /**
         * die
         * Set the CellView as being dead
         * @chainable
         */
        die: function () {
            this.element.classList.remove('alive');
            this.alive = false;
            pubsub.publish('cell:died', this.id, this.coordinates, this);

            return this;
        },

        /**
         * rebirth
         * set the CellView as being alive again
         * @chainable
         */
        rebirth: function () {
            this.element.classList.add('alive');
            this.alive = true;
            pubsub.publish('cell:rebirthed', this.id, this.coordinates, this);

            return this;
        },

        dealloc: function () {
            if (!this.deallocated) {
                delete this.id;
                delete this.coordinates;
                delete this.alive;

                this.element.parentNode.removeChild(this.element);
                delete this.element;

                this.deallocated = true;
                console.log('[DEALLOC] CellView');
            }
        }

    };

    return CellView;
});
