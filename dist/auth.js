"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checker = function (req, res, next) {
    console.log(req.session, req.cookies);
    if (req.session.user && req.cookies.user_sid) {
        next();
    }
    else {
        res.redirect('/login-register');
        next();
    }
};
exports.default = checker;
//# sourceMappingURL=auth.js.map