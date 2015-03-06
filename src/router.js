var express = require('express');
var _ = require('underscore');
var low = require('lowdb');

low.mixin(require('yc-db-json'))

var utils = require('./utils')

module.exports = function (source) {
    //http://expressjs.com/api.html#router
    var router = express.Router();

    if (_.isObject(source)) {
        var db = low();
        db.object = source;
    } else {
        var db = low(source);
    }


    function list (req, res, next) {
        var filters = {};
        var array;

        var _start = req.query._start;
        var _end = req.query._end;
        var _sort = req.query._sort;
        var _order = req.query._order;

        delete req.query._start;
        delete req.query._end;
        delete req.query._sort;
        delete req.query._order;

        if (req.query.q) {
            var q = req.query.q.toLowerCase();

            array = db(req.params.resource).filter(function (obj) {
                for (var key in obj) {
                    var value = obj[key];
                    //indexOf q
                    if (_.isString(value) && value.toLowerCase().indexOf(q) !== -1) {
                        return true;
                    }
                }
            });

        } else {

            for (var key in req.query) {
                //TODO
                if (key !== 'callback' && key !== '_') {
                    filters[key] = utils.toNative(req.query[key]);
                }
            }

            if (_(filters).isEmpty()) {
                array = db(req.params.resource).value();
            } else {
                array = db(req.params.resource).filter(filters);
            }

        }

        //TODO Sort
        if (_sort) {
            _order = _order || 'ASC';

            array = _.sortBy(array, function(element) {
                return element[_sort];
            });

            if (_order === 'DESC') {
                array.reverse();
            }
        }

        //TODO 分页
        if (_end) {
            _start = _start || 0;
            res.setHeader('X-Total-Count', array.length);
            res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
        
            array = array.slice(_start, _end);
        }

        res.jsonp(array);

    }

    // GET /:resource/:id
    function show(req, res, next) {
        //http://expressjs.com/api.html#req.params
        //TODO 目前不严重 id 是否合法
        var id = +req.params.id;
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
        var id = +req.params.id;
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

    router.route('/:resource/:id')
          .get(show)
          .put(update)
          .patch(update)
          .delete(destory)

    return router;

};