/* Copyright G. Hemingway @2017 - All rights reserved */
"use strict";

import * as _ from 'lodash'

module.exports = (app) => {

    // Handle POST to create a user session (i.e. log on)
    app.post('/v1/session', function(req, res) {
        if (!req.body || !req.body.username || !req.body.password) {
            res.status(400).send({ error: 'username and password required' });
        } else {
            let user = _.findWhere(app.users, { username: req.body.username.toLowerCase() });
            if (!user || user.password !== req.body.password) {
                if (user) console.log(`Password: ${user.password} vs. ${req.body.password}`);
                else console.log(`User not found: ${req.body.username}: [${app.users.map((user)=>user.username)}]`);
                res.status(401).send({ error: 'unauthorized' });
            } else {
                res.status(201).send({
                    username:       user.username,
                    primary_email:  user.primary_email
                });
            }
        }
    });

    // Handle POST to create a new user account
    app.post('/v1/user', function(req, res) {
        let data = req.body;
        if (!data ||
            !data.username ||
            !data.password ||
            !data.first_name ||
            !data.last_name ||
            !data.city ||
            !data.primary_email) {
            res.status(400).send({ error: 'username, password, first_name, last_name, city and primary_email required' });
        } else {
            let user = _.findWhere(app.users, { username: data.username.toLowerCase() });
            if (user) {
                res.status(400).send({ error: 'username already in use' });
            } else {
                let newUser = _.pick(data, 'username', 'first_name', 'last_name', 'password', 'city', 'primary_email');
                app.users.push(newUser);
                res.status(201).send({
                    username:       data.username,
                    primary_email:  data.primary_email
                });
            }
        }
    });

    // Handle GET to fetch user information
    app.get('/v1/user/:username', function(req, res) {
        let user = _.findWhere(app.users, { username: req.params.username.toLowerCase() });
        if (!user) {
            res.status(404).send({ error: 'unknown user' });
        } else {
            user = _.pick(user, 'username', 'first_name', 'last_name', 'city', 'primary_email');
            user.games = app.games.map(game => {
                let g = _.clone(game);
                g.moves = g.moves ? g.moves.length : 0;
                // Give the game a duration instead of just a start time
                g.duration = Date.now() - g.startTime;
                delete g.startTime;
                return g;
            });
            res.status(200).send(user);
        }
    });

    //Handle POST to create a new campaign
    app.post('/v1/campaign', function(req,res){
        let data = req.body;
        if( !data ||
            !data.name ||
            !data.description ||
            !data.deadline ||
            !data.limit     ||
            !data.owner) {
                res.status(400).send({error: "something went wrong"});
            } else {
                let newCampaign = {
                    id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10),
                    name: data.name,
                    description: data.description,
                    deadline: data.deadline,
                    limit: data.limit,
                    owner: data.owner,
                };
                app.campaigns.push(newCampaign);
                res.status(201).send({
                    id: newCampaign.id
                });
            }
    });
    //Handle GET to fetch a campaign
    app.get('/v1/campaign/:id',function(req,res){
            let campaign = _.findWhere(app.campaigns, {id: req.params.id.toLowerCase()});
            console.log(app.campaigns);
            if (!campaign) {
                res.status(404).send({ error: 'unknown campaign id'});
            } else {
                res.status(200).send(campaign);
            }
    })

    //Handle GET to fetch all campaigns of specific user
    //app.get('/v1/donatedCampaigns/:address', function)


   app.get('/v1/campaigns', function(req,res){
      res.status(200).send(app.campaigns);
   });

    // Provide end-point to request shuffled deck of cards and initial state - for testing
    app.get('/v1/cards/shuffle', (req, res) => {
        res.send(Solitare.shuffleCards(false));
    });
    app.get('/v1/cards/initial', (req, res) => {
        res.send(Solitare.initialState());
    });

};
