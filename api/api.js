var User = require('../controllers/user');

module.exports = function(app) {
    app.get('/api/validate', function(req, res) {
        var userId = req.session.userId;
        if (userId) {
            User.findUserById(userId, function(err, user) {
                if (err) {
                    res.json(401, {
                        msg: err
                    });
                } else {
                    res.json(user);
                }
            });
        } else {
            res.json(401, null);
        }
    });
    /*
    登陆
    */
    app.post('/api/login', function(req, res) {
        var email = req.body.email;
        if (email) {
            User.findByEmailOrCreate(email, function(err, user) {
                if (err) {
                    res.json(500, {
                        msg: err
                    });
                } else {
                    req.session.userId = user._id;
                    res.json(user);
                }
            });
        } else {
            res.json(403);
        }
    });
    /*
    注销登陆
    */
    app.get('/api/logout', function(req, res) {
        req.session.userId = null;
        res.json(401);
    });
};
