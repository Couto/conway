define(['../pubsub'], function (pubsub) {

    'use strict';

    /**
     * SidebarView
     * @param {Object} coordinates Object containing x and y coordinates
     */
    function SidebarView() {

        this.element = document.body.querySelector('.sidebar');
        this.widthEl = this.element.querySelector('.width');
        this.heightEl = this.element.querySelector('.height');
        this.zoomEl = this.element.querySelector('.zoom');
        this.playEl = this.element.querySelector('.play');
        this.stopEl = this.element.querySelector('.stop');
        this.clearEl = this.element.querySelector('.clear');

        this.bindEvents();
    }

    SidebarView.prototype = {

        constructor: SidebarView,

        bindEvents: function () {
            this.widthEl.addEventListener('change', this.widthChangeHandler.bind(this));
            this.heightEl.addEventListener('change', this.heightChangeHandler.bind(this));
            this.zoomEl.addEventListener('change', this.zoomChangeHandler.bind(this));
            this.playEl.addEventListener('click', this.playClickHandler.bind(this));
            this.stopEl.addEventListener('click', this.stopClickHandler.bind(this));
            this.clearEl.addEventListener('click', this.clearClickHandler.bind(this));
        },

        unbindEvents: function () {
            this.widthEl.removeEventListener('change', this.widthChangeHandler.bind(this));
            this.heightEl.removeEventListener('change', this.heightChangeHandler.bind(this));
            this.zoomEl.removeEventListener('change', this.zoomChangeHandler.bind(this));
            this.playEl.removeEventListener('click', this.playClickHandler.bind(this));
            this.stopEl.removeEventListener('click', this.stopClickHandler.bind(this));
            this.clearEl.removeEventListener('click', this.clearClickHandler.bind(this));
        },

        playClickHandler: function () {
            if (!this.playActive) {
                this.playActive = true;
                this.playEl.classList.add('disabled');
                this.stopEl.classList.remove('disabled');
                this.clearEl.classList.remove('disabled');
                this.widthEl.disabled = true;
                this.heightEl.disabled = true;
                pubsub.publish('sidebar:play');
            }
        },

        stopClickHandler: function () {
            if (this.playActive) {
                this.playActive = false;
                this.playEl.classList.remove('disabled');
                this.stopEl.classList.add('disabled');
                this.widthEl.disabled = false;
                this.heightEl.disabled = false;
                pubsub.publish('sidebar:stop');
            }
        },

        clearClickHandler: function () {
            this.playActive = false;
            this.playEl.classList.remove('disabled');
            this.stopEl.classList.add('disabled');
            this.widthEl.disabled = false;
            this.heightEl.disabled = false;
            pubsub.publish('sidebar:clear');

        },

        widthChangeHandler : function () {
            if (!this.playActive) {
                pubsub.publish('sidebar:width', parseInt(this.widthEl.value, 10));
            }
        },

        heightChangeHandler : function () {
            if (!this.playActive) {
                pubsub.publish('sidebar:height', parseInt(this.heightEl.value, 10));
            }
        },

        zoomChangeHandler : function () {
            pubsub.publish('sidebar:zoom', this.zoomEl.value, 10);
        },

        dealloc: function () {
            if (!this.deallocated) {

                this.unbindEvents();

                this.element.removeChild(this.widthEl);
                this.element.removeChild(this.heightEl);
                this.element.removeChild(this.zoomEl);
                this.element.removeChild(this.playEl);
                this.element.removeChild(this.stopEl);
                this.element.removeChild(this.pauseEl);

                this.element.parentNode.removeChild(this.element);

                delete this.widthEl;
                delete this.heightEl;
                delete this.zoomEl;
                delete this.playEl;
                delete this.stopEl;
                delete this.pauseEl;
                delete this.element;

                this.deallocated = true;
                console.log('[DEALLOC] SidebarView');
            }
        }

    };

    return SidebarView;
});
