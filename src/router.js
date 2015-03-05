var express = require('express');
var _ = require('underscore');

var utils = require('./utils')

module.exports = function (source) {
    //http://expressjs.com/api.html#router
    var router = express.Router();

    var db = low(source);
    if (_.isObject(source)) {
        db = low();
        db.object = source;
    }

    // GET /:resource/:id
    function show(req, res, next) {
        //http://expressjs.com/api.html#req.params
        //TODO 目前不严重 id 是否合法
        var id = req.params.id;
        var resource = db(req.params.resource).get(id);

        if (resource) {
            res.jsonp(resource);
        } else {
            //http://expressjs.com/api.html#res.status
            res.status(404).jsonp({});
        }
    }

    // POST /:resource
    function create (req, res, next) {
        //req.body
        for (var key in req.body) {
            req.body[key] = utils.toNative(req.body[key]);
        }

        var resource = db(req.params.resource).insert(req.body);

        res.jsonp(resource);
    }



    // PUT /:resource/:id
    // PATCH /:resource/:id
    function update (req, res, next) {
        var id = req.params.id;
        var resource = db(req.params.resource).update(id, req.body);

        //req.body
        for (var key in req.body) {
            req.body[key] = utils.toNative(req.body[key]);
        }

        if (resource) {
            res.jsonp(resource);
        } else {
            res.status(404).jsonp({});
        }
    }


    // DELETE /:resource/:id
    function destory (req, res, next) {
        var id = req.params.id;
        db(req.params.res).remove(id);

    }


    //show all data
    router.get('/db', function (req, res, next) {
        //http://expressjs.com/api.html#res.jsonp
        res.jsonp(db.object);
    });


    router.route('/:resource')
          .get(list)
          .post(create);

    router.router('/:resource/:id')
          .get(show)
          .put(update)
          .patch(update)
          .delete(destory)



};