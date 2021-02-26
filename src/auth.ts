import {NextFunction, Request, Response} from 'express';

const checker = (req, res, next) => {
    console.log(req.session, req.cookies);
    if (req.session.user && req.cookies.user_sid) {
       next();
    } else {
        res.redirect('/login-register');
        next();
    }    
};

export default checker