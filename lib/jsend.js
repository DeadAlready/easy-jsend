/**
 * Created by karl on 30/06/15.
 */
var express = require('express');
function init() {
    function success(data, status) {
        if (data === void 0) { data = 'Done'; }
        if (status === void 0) { status = 200; }
        var message = {
            status: 'success',
            data: data
        };
        if (this.req.log) {
            this.req.log.trace({ message: message }, 'Sending success response');
        }
        this.status(status).json(message);
    }
    function fail(data, status) {
        if (status === void 0) { status = 400; }
        var message = {
            status: 'fail',
            data: data
        };
        if (this.req.log) {
            this.req.log.trace({ message: message }, 'Sending fail response');
        }
        this.status(status).json(message);
    }
    function error(err, status) {
        if (status === void 0) { status = 500; }
        if (typeof err !== 'object') {
            err = {
                message: err
            };
        }
        err.status = 'error';
        if (this.req.log) {
            this.req.log.trace({ message: err }, 'Sending error response');
        }
        this.status(err.code || status).json(err);
    }
    express.response.success = success;
    express.response.fail = fail;
    express.response.error = error;
}
exports.init = init;
//# sourceMappingURL=jsend.js.map