/**
 * Created by karl on 30/06/15.
 */

var express = require('express');

export function init() {

    function makePartial(data):void {
        var model = data.model;
        var opts = data.opts;
        var search = data.search;
        var result = data.result;
        var $this = this;

        if(result.length < opts.limit && opts.skip === 0) {
            $this.success(result);
            return;
        }
        model.find(search).count(function (err, count) {
            if(err) {
                if($this.req.log) {
                    $this.req.log.error({error: err}, 'Failed to look for count');
                }
                $this.error('Failed to retrieve count');
                return;
            }
            $this.partial({
                limit: opts.skip + opts.limit - 1,
                offset: opts.skip,
                count: count,
                data: result
            });
        });
    }

    function partial(data: any, status:number = 206):void {

        if(!data.limit && data.data && data.data.length) {
            data.limit = data.offset + (data.data.length - 1);
        }

        var header = data.offset + '-' + data.limit + '/' + data.count;
        this.header('Content-Range', header);

        if(this.req.log) {
            this.req.log.trace({header: header}, 'Sending partial response');
        }

        this.success(data.data, status);
    }

    express.response.partial = partial;
    express.response.makePartial = makePartial;
}