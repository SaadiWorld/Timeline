const User = require("../../../models/user");
//var mongoosePaginate = require('mongoose-paginate-v2');

var express = require('express');
var router = express.Router();
const checkAuth = require('../../../lib/middleware/check-auth');

var Event = require('../../../models/event');


module.exports = function (router) {

    // When a GET request is made to the homepage
    router.get('/', checkAuth, function (req, res) {
        const { page, limit } = req.query;
        // // Same as
        // const page = req.query.page;
        // const perPage = req.query.perPage;
        const options = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(limit, 10),
            skip: ((page - 1) * limit)
        };

        Event.find({ post_by: req.userData.userId }, { title: 1, description: 1, date: 1 }, options, function (err, events) {       // Curly braces to find and get all events
            if (err) {
                return res.status(401).json({
                    message: "Invalid arguements!",
                });
            }
            else {

                // res.render('timeline', {
                //     title: "Your timeline",
                //     events: events
                // });
                return res.status(200).json({
                    success: true,
                    events: events
                });
            }
        }).sort({ date: -1 });
    });


    // 'Add Event' GET Route
    router.get('/add', checkAuth, function (req, res) {
        // res.render('add_event', {
        //     title: "Add new event"
        // });
        return res.status(200).json({
            success: true,
            message: "You can view this page now!",
        });
    });


    // 'Add Event' POST Route
    router.post('/add', checkAuth, function (req, res) {
        // req.checkBody('title', 'Title is required').notEmpty();
        // req.checkBody('description', 'Description is required').notEmpty();
        // // req.checkBody('post_by', 'Post_By is required').notEmpty();

        // // Get Errors
        // let errors = req.validationErrors();

        // if (errors) {
        //     // res.render('add_event', {
        //     //     title: 'Add new event',
        //     //     errors: errors
        //     // });
        //     return res.status(200).json({
        //         success: false,
        //         message: "Something went wrong",
        //     });
        // } else {
        let event = new Event();
        event.title = req.body.title;
        event.description = req.body.description;
        event.post_by = req.userData.userId;

        event.save(function (err) {
            if (err) {
                console.log(err);
                return;
            } else {
                // req.flash('success', 'Event published on timeline');
                // res.redirect('/timeline');
                return res.status(200).json({
                    success: true,
                    message: "You can view this page now!",
                });
            }
        });
        //      }
    });


    // 'Update Event' GET Route
    router.get('/edit/:id', checkAuth, function (req, res) {
        let query = { _id: req.params.id }

        // Now we will update
        Event.findOne(query, function (err, event) {
            if (event.post_by != req.userData.userId) {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized to view this!"
                });
            }
            return res.json({
                success: true,
                title: event.title,
                description: event.description
            });
        });
    });


    // 'Update Event' POST Route
    router.post('/edit/:id', checkAuth, function (req, res) {
        let event = {};
        event.title = req.body.title;
        event.description = req.body.description;

        let query = { _id: req.params.id }

        // Now we will update
        Event.findOne(query, function (err, event2) {
            if (event2.post_by != req.userData.userId) {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized to view this!"
                });
            }
            Event.update(query, event, function (err) {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: "Something went wrong!",
                    });
                }
            })
            return res.json({
                success: true,
                message: "Event sucessfully updated!"
            });
        });
    });


    // 'Delete Event' DELETE Route
    router.delete('/delete/:id', checkAuth, function (req, res) {

        let query = { _id: req.params.id }

        // Now we will delete
        Event.findOne(query, function (err, event) {
            // checking if 'id' in query is invalid
            if (err) {
                return res.status(401).json({
                    message: "Invalid Request!"
                });
            }

            // checking if was valid but is deleted now from the database
            else if (!event || event.post_by == null) {
                return res.status(401).json({
                    message: "Cannot find event!"
                });
            }

            // so that user cannot delete anyone else's event
            else if (event.post_by != req.userData.userId) {
                return res.status(401).json({
                    message: "You are not authorized to view this!",
                });
            }

            Event.remove(query, function (err) {
                if (err) {
                    return res.status(401).json({
                        message: "Something went wrong!",
                    });
                }
                // req.flash('success', 'Your event is successfully deleted.');
                res.send({
                    success: "true",
                    status: "200",
                    responseType: "string",
                    response: "success"
                });
            })

        });
    });
};
