#!/usr/bin/env node

/*
 * Update: This example is based on the depracated Twitter 1.0 API. To make
 * This work with the 1.1 API, you should just need to add authentication,
 * and updated the API requests to use the new URL structure, such as:

     https://api.twitter.com/1.1/search/tweets.json?q=node.js
 
 * /end update
 *
 * A working example to illustrate callback management patterns. This code
 * calls the twitter search API for recent posts on node.js, then pulls the
 * username from each tweet, calls the twitter user lookup api to get the
 * real name and number of followers of each twitter user, and prints this
 * data to the console.
 *
 * This example shows the user of the async.js waterfall control flow to
 * create a much more manageable code structure.
 */

var http = require('http'),
    async = require('async');

async.waterfall([
    // Twitter search for recent node.js posts
    function(callback) {
        http.get('http://search.twitter.com/search.json?q=node.js', function(res) {
            tweets = '';

            res.on('data', function (chunk) {
                tweets += chunk;
            });

            res.on('end', function() {
                var jtweets = JSON.parse(tweets);
                callback(null, jtweets);
            });
        });
    },
    // parse username of each Twitter user
    function(jtweets, callback) {
        for(var tweet in jtweets['results']) {
        //for(var tweet = 0;tweet < 1;tweet++) { // single iteration, for testing to avoid rate limit
            var username = jtweets['results'][tweet]['from_user']
            callback(null, username);
        }
    },
    // Query Twitter API for user info, get name and followers
    function(username, callback) {
        http.get('http://api.twitter.com/1/users/lookup.json?screen_name=' + username, function(res) {
            user_info = ''
            res.on('data', function(chunk) {
                user_info += chunk;
            });

            res.on('end', function() {
                user = JSON.parse(user_info)[0];
                callback(null, user['name'], user['followers_count']);
            });
        });
    }],

  // callback
  function (err, name, followers) {
      console.log('Name: ' + user['name'] + ' -- Followers: ' + user['followers_count']);
  }
);
