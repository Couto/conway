define([
    'pubsub',
    'views/CellView'
], function (pubsub, CellView) {

    'use strict';

    /**
     * CellView
     * @param {Object} coordinates Object containing x and y coordinates
     */
    function GridView(width, height) {
        this.width = width;
        this.height = height;
        this.element = document.createElement('div');
        this.element.setAttribute('class', 'grid');
    }

    GridView.prototype = {

        constructor: GridView,

        build: function () {
            var w = this.width - 1,
                h = this.height - 1,
                line, cell;

            for (w; w >= 0; w -= 1) {
                line = document.createElement('div');
                line.setAttribute('class', 'line l' + w);

                h = this.height - 1;
                for (h; h >= 0; h -= 1) {
                    cell = new CellView({x: w, y: h});
                    line.appendChild(cell.element);
                    pubsub.publish('game:added', cell);
                }

                this.element.appendChild(line);
            }

            this.bind();

            return this.element;
        },

        bind: function () {
            this.element.addEventListener('mousedown', this.mousedownHandler.bind(this));
            this.element.addEventListener('mouseup', this.mouseupHandler.bind(this));
            this.element.addEventListener('mousemove', this.mousemoveHandler.bind(this));
            this.element.addEventListener('click', this.clickHandler.bind(this));
        },

        unbind: function () {
            this.element.removeEventListener('mousedown', this.mousedownHandler.bind(this));
            this.element.removeEventListener('mouseup', this.mouseupHandler.bind(this));
            this.element.removeEventListener('mousemove', this.mousemoveHandler.bind(this));
            this.element.removeEventListener('click', this.clickHandler.bind(this));
        },

        dealloc: function () {
            if (!this.deallocated) {

                this.unbind();

                delete this.width;
                delete this.height;

                this.element.parentNode.removeChild(this.element);

                this.deallocated = true;

                console.log('[DEALLOC] GridView');
            }
        },

        mousedownHandler: function (evt) {
            evt.preventDefault();
            this.mouseIsDown = true;
            this.hoveredElements = [];
        },

        mouseupHandler: function (evt) {
            evt.preventDefault();
            this.mouseIsDown = false;
            this.hoveredElements = null;
        },

        mousemoveHandler: function (evt) {
            evt.preventDefault();
            var element = evt.target;

            if (this.mouseIsDown) {
                if (element.classList.contains('cell') && this.hoveredElements.indexOf(element) === -1) {
                    this.hoveredElements.push(element);
                    if (element.classList.contains('alive')) {
                        pubsub.publish('game:died', element.id);
                    } else {
                        pubsub.publish('game:alive', element.id);
                    }
                }
            }
        },

        clickHandler: function (evt) {

            var element = evt.target,
                elementClassList = element.classList;

            evt.preventDefault();

            if (elementClassList.contains('cell') && elementClassList.contains('alive')) {
                pubsub.publish('game:died', element.id);
            } else {
                pubsub.publish('game:alive', element.id);
            }
        }

    };

    return GridView;
});
