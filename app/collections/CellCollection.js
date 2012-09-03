define(function () {
    'use strict';

    function CellCollection() {
        this.collection = {};
        this.length = 0;
    }

    CellCollection.prototype = {

        constructor: CellCollection,

        /**
         * add - Adds an instance to the collection
         * @param {Object} cell Cell's instance
         * @fires cellCollection:added
         * @chainable
         */
        add : function (cell) {

            this.collection[cell.id] = cell;
            this.length += 1;

            return this;
        },

        /**
         * remove - Removes an instance to the collection
         * @param {Object} cell Cell's instance
         * @fires collection:removed
         * @returns {Object} removed Cell's instance
         */
        remove : function (cell) {

            var match = this.collection[cell.id];

            if (match) {
                this.collection[cell.id] = null;
                delete this.collection[cell.id];
                this.length -= 1;

                return match;
            }
        },

        /**
         * find - Finds a Cell's inside the collection
         * @param  {String} id Cell's id
         * @return {Object} Cell's instance found
         */
        find : function (id) {

            var match = this.collection[id];

            if (match) {
                return match;
            }
        },

        /**
         * locate - Finds a Cell's instance by its coordinates
         * @param  {Object} coordinates an object containing x and y
         * @return {Object} Cell's instance found
         */
        locate : function (coordinates) {

            var id = 'x' + coordinates.x + 'y' + coordinates.y,
                match = this.collection[id];

            if (match) { return match; }
        },

        /**
         * neighbours - Returns all the direct neighbours of the given cell.
         * @param  {Object} cell Cell's instance
         * @return {Array} array containing all the neighbours found
         */
        neighbours : function (cell) {

            var neighbours = [],
                coordinates = cell.coordinates,
                possibilities = [{
                    x: coordinates.x,
                    y: coordinates.y - 1
                }, {
                    x: coordinates.x - 1,
                    y: coordinates.y
                }, {
                    x: coordinates.x - 1,
                    y: coordinates.y - 1
                }, {
                    x: coordinates.x,
                    y: coordinates.y + 1
                }, {
                    x: coordinates.x + 1,
                    y: coordinates.y
                }, {
                    x: coordinates.x + 1,
                    y: coordinates.y + 1
                }, {
                    x: coordinates.x + 1,
                    y: coordinates.y - 1
                }, {
                    x: coordinates.x - 1,
                    y: coordinates.y + 1
                }],
                i = possibilities.length - 1,
                id = '';



            for (i; i >= 0; i -= 1) {
                id = 'x' + possibilities[i].x + 'y' + possibilities[i].y;
                if (this.collection[id]) {
                    neighbours.push(this.collection[id]);
                }
            }

            return neighbours;
        },
        /**
         * forOwn - Iterates along the collection calling a
         * callback function at each item
         * @param  {Function} cb  Function called at each item
         * @param  {Object}   ctx Context object to bind the callback
         * @chainable
         */
        forOwn: function (cb, ctx) {

            var context = ctx || this,
                k;

            for (k in this.collection) {
                if (this.collection.hasOwnProperty(k)) {
                    cb.call(context, this.collection[k], k);
                }
            }

            return this;
        },

        dealloc: function () {

            if (!this.deallocated) {

                this.forOwn(function (val) {
                    val.dealloc();
                    val = null;
                }, this);

                delete this.collection;
                delete this.length;

                this.deallocated = true;
                console.log('[DEALLOC] CellCollection');
            }
        }

    };

    return CellCollection;
});
