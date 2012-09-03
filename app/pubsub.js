/**
 * Publish/Subscribe Object
 */
define({
    /**
     * [cache description]
     * @type {Object}
     */
    cache : {},

    /**
     * [publish description]
     * @param  {[type]} name [description]
     * @param  {[type]} args [description]
     * @return {[type]}      [description]
     */
    publish: function (name) {
        'use strict';

        var args = Array.prototype.slice.call(arguments, 1),
            topic = {},
            i = 0;

        if (this.cache[name]) {
            topic = this.cache[name],
            i = topic.fn.length - 1;

            for (i; i >= 0; i -= 1) {
                topic.fn[i].apply(topic.ctx[i], args);
            }
        }

        return this;
    },
    /**
     * [subscribe description]
     * @param  {String}   name [description]
     * @param  {Function} cb   [description]
     * @param  {Object}   [ctx][description]
     * @return {Array}        [description]
     */
    subscribe: function (name, cb, ctx) {
        'use strict';
        console.log("subscribed: %s", name);
        if (!this.cache[name]) {
            this.cache[name] = {
                fn: [],
                ctx: []
            };
        }

        this.cache[name].fn.push(cb);
        this.cache[name].ctx.push(ctx || this);

        return [name, cb, ctx];
    },
    /**
     * [unsubscribe description]
     * @param  {[type]} handler [description]
     * @return {[type]}         [description]
     */
    unsubscribe: function (handler) {
        'use strict';

        if (handler) {
            var topic = this.cache[handler[0]],
                fn = handler[1],
                ctx = handler[2],
                i = 0;

            if (topic) {
                i = topic.fn.length - 1;
                for (i; i >= 0; i -= 1) {
                    if (topic.fn[i] === fn && topic.ctx[i] === ctx) {
                        topic.fn.splice(i, 1);
                        topic.ctx.splice(i, 1);
                    }
                }
            }
        }

        return this;
    }

});
