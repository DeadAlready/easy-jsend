/**
 * Created by karl on 14/07/15.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
function init(express) {
    function success(data, status) {
        if (data === void 0) { data = "Done"; }
        if (status === void 0) { status = 200; }
        var message = {
            status: "success",
            data: data,
        };
        if (this.req.log) {
            this.req.log.trace({ message: message }, "Sending success response");
        }
        this.status(status).json(message);
    }
    function fail(data, status) {
        if (status === void 0) { status = 400; }
        var message = {
            status: "fail",
            data: data,
        };
        if (this.req.log) {
            this.req.log.trace({ message: message }, "Sending fail response");
        }
        this.status(status).json(message);
    }
    function error(err, status) {
        if (status === void 0) { status = 500; }
        if (typeof err !== "object") {
            err = {
                message: err,
            };
        }
        err.status = "error";
        if (this.req.log) {
            this.req.log.trace({ message: err }, "Sending error response");
        }
        this.status(err.code || status).json(err);
    }
    function partial(data, status) {
        if (status === void 0) { status = 206; }
        if (!data.limit && data.data && data.data.length) {
            data.limit = data.offset + (data.data.length - 1);
        }
        var header = data.offset + "-" + data.limit + "/" + data.count;
        this.header("Content-Range", header);
        if (this.req.log) {
            this.req.log.trace({ header: header }, "Sending partial response");
        }
        this.success(data.data, status);
    }
    Object.assign(express.response, {
        success: success,
        fail: fail,
        error: error,
        partial: partial,
    });
}
exports.init = init;
