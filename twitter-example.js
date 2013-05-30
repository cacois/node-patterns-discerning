#!/usr/bin/env node

/*
 * A working example to illustrate callback management patterns. This code
 * calls the twitter search API for recent posts on node.js, then pulls the 
 * username from each tweet, calls the twitter user lookup api to get the 
 * real name and number of followers of each twitter user, and prints this 
 * data to the console.
 *
 * This example shows the standard anonymous function callback method, which 
 * is likely to lead to unmaintainable code.
 */

var http = require('http');

//var users = mongo.getCollection('twitter_users');

// Twitter search for recent node.js posts
http.get('http://search.twitter.com/search.json?q=node.js', function(res) {
    tweets = '';

    res.on('data', function (chunk) {
        tweets += chunk;
    });

    res.on('end', function() {
        jtweets = JSON.parse(tweets);

        //parse username of each Twitter user
        for(var tweet in jtweets['results']) {
        //for(var tweet = 0;tweet < 1;tweet++) { // single iteration, for testing to avoid rate limit
            var username = jtweets['results'][tweet]['from_user']
            console.log('User: ' + username);
            // Query Twitter API for user info, get name and followers
            http.get('http://api.twitter.com/1/users/lookup.json?screen_name=' + username, function(res) {
                user_info = ''
                res.on('data', function(chunk) {
                    user_info += chunk;
                });

                res.on('end', function() {
                    user = JSON.parse(user_info)[0];
                    console.log('Name: ' + user['name'] + ' -- Followers: ' + user['followers_count']);
                });
            });
        }
    });
});

