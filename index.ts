/**
 * Created by karl on 14/07/15.
 */

"use strict";

import expr from "express";

declare global {
  namespace Express {
    interface Response {
      success(data: unknown, status?: number): void;
      fail(data: unknown, status?: number): void;
      error(err: any, status?: number): void;
      partial(
        data: {
          data: unknown[];
          offset: number;
          limit?: number;
          count: number;
        },
        status?: number
      ): void;
    }
  }
}

export function init(express: typeof expr): void {
  function success(data: unknown = "Done", status: number = 200): void {
    const message = {
      status: "success",
      data,
    };
    if (this.req.log) {
      this.req.log.trace({ message }, "Sending success response");
    }
    this.status(status).json(message);
  }

  function fail(data: unknown, status: number = 400): void {
    const message = {
      status: "fail",
      data,
    };

    if (this.req.log) {
      this.req.log.trace({ message }, "Sending fail response");
    }
    this.status(status).json(message);
  }

  function error(err: any, status: number = 500): void {
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

  function partial(
    data: { data: unknown[]; offset: number; limit?: number; count: number },
    status: number = 206
  ): void {
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
