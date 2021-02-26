"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var morgan_1 = __importDefault(require("morgan"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var express_session_1 = __importDefault(require("express-session"));
var index_1 = __importDefault(require("./routes/index"));
var products_1 = __importDefault(require("./routes/products"));
var adminProd_1 = __importDefault(require("./routes/adminProd"));
var dbconnect_1 = __importDefault(require("./config/dbconnect"));
var login_reg_1 = __importDefault(require("./controller/login-reg"));
var login_reg_2 = __importDefault(require("./controller/login-reg"));
var contact_1 = __importDefault(require("./controller/contact"));
// LOAD Configure
dotenv_1.default.config({ path: '/config/config.env' });
dbconnect_1.default();
var app = express_1.default();
// const LocalStrategy = import('passport-local').Strategy;
app.use(cors_1.default());
// app.options('*', cors());
// view engine setup
app.set('views', path_1.default.join(__dirname, '../', 'views'));
app.set('view engine', 'ejs');
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, '../', 'public')));
// app.use()
app.use(express_session_1.default({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use(function (req, res, next) {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});
app.use('/', index_1.default);
//app.use('/cart', indexRouter);
app.use('/products', products_1.default);
app.use('/adminProd', adminProd_1.default);
app.use('/', login_reg_1.default);
app.use('/', login_reg_2.default);
app.use('/', contact_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, _next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
//# sourceMappingURL=app.js.map