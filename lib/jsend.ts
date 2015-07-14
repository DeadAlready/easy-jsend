/**
 * Created by karl on 30/06/15.
 */

var express = require('express');

export function init() {

    function success(data:any = 'Done', status:number = 200) : void {
        var message = {
            status: 'success',
            data: data
        };
        if(this.req.log) {
            this.req.log.trace({message: message}, 'Sending success response');
        }
        this.status(status).json(message);
    }

    function fail(data:any, status:number = 400):void {

        var message = {
            status: 'fail',
            data: data
        };

        if(this.req.log) {
            this.req.log.trace({message: message}, 'Sending fail response');
        }
        this.status(status).json(message);
    }

    function error(err:any, status:number = 500):void {
        if (typeof err !== 'object') {
            err = {
                message: err
            };
        }
        err.status = 'error';
        if(this.req.log) {
            this.req.log.trace({message: err}, 'Sending error response');
        }
        this.status(err.code || status).json(err);
    }

    express.response.success = success;
    express.response.fail = fail;
    express.response.error = error;
}