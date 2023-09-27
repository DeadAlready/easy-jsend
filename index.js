/**
 * Created by karl on 14/07/15.
 */
"use strict";
export function init(express) {
    function success(data = "Done", status = 200) {
        const message = {
            status: "success",
            data,
        };
        if (this.req.log) {
            this.req.log.trace({ message }, "Sending success response");
        }
        this.status(status).json(message);
    }
    function fail(data, status = 400) {
        const message = {
            status: "fail",
            data,
        };
        if (this.req.log) {
            this.req.log.trace({ message }, "Sending fail response");
        }
        this.status(status).json(message);
    }
    function error(err, status = 500) {
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
    function partial(data, status = 206) {
        if (!data.limit && data.data && data.data.length) {
            data.limit = data.offset + (data.data.length - 1);
        }
        const header = data.offset + "-" + data.limit + "/" + data.count;
        this.header("Content-Range", header);
        if (this.req.log) {
            this.req.log.trace({ header: header }, "Sending partial response");
        }
        this.success(data.data, status);
    }
    Object.assign(express.response, {
        success,
        fail,
        error,
        partial,
    });
}
