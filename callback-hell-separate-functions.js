/**
 * The callback hell example from callback-hell.js, refactored 
 * to be more manageable by separating callbacks into individual
 * methods.
 */

var db = require('somedatabaseprovider');

http.get('/recentposts', afterRecentPosts);

function afterRecentPosts(req, res) {
  db.openConnection('host', creds, function(err, conn) {
    afterDBConnected(res, conn);
  });
}

function afterDBConnected(res, conn) {
  res.param['posts'].forEach(post) {
    conn.query('select * from users where id=' + post['user'], afterQuery);
  }
}

function afterQuery(err, results) {
  conn.close();
  res.send(results[0]);
}