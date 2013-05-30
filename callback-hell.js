/** 
 * Some example of non-functional code to illustrate callback hell.
 */

/* 
 This is a small, likely snippet of code which pulls recent posts
 from a web service API, opens a connection to a database of 
 some kind, queries for the users who made the posts, and sends 
 these users in the http response. This is made to illustrate how 
 quickly simple functionalty can devolve into 'callback hell'.
*/

var db = require('somedatabaseprovider');
http.get('/recentposts', function(req, res) { //get recent posts 
  db.openConnection('host', creds, function(err, conn) { // open database connection
    res.param['posts'].forEach(post) {
      conn.query('select * from users where id=' + post['user'], function(err, results) {
        conn.close();
        res.send(results[0]);
      });
    }
  });
});


/*
 This is the same thing as the example above, except I've added gratuitous 
 exception handling. The effects of callback hell are exacerbated by the 
 needs fo real, production code.
*/
// what if we add exception handling?
var db = require('somedatabaseprovider');
try {
  http.get('/recentposts', function(req, res) { //get recent posts 
    try {
      db.openConnection('host', creds, function(err, conn) { // open database connection
        res.param['posts'].forEach(post) {
          try {
            conn.query('select * from users where id=' + post['user'], function(err, results) {
              conn.close();
              res.send(results[0]);
            });
          } catch(e) {/* handle exception */}
        }
      });
    } catch(e) {/* handle exception */}
  });
} catch(e) {/* handle exception */}
