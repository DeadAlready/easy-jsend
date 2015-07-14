/**
 * Created by karl on 14/07/15.
 */
/// <reference path='typings/tsd.d.ts' />
'use strict';
var jsend = require('./lib/jsend');
var jsendPartial = require('./lib/jsend-partial');
function init(conf) {
    if (conf === void 0) { conf = { partial: false }; }
    jsend.init();
    if (conf.partial) {
        jsendPartial.init();
    }
}
exports.init = init;
//# sourceMappingURL=index.js.map