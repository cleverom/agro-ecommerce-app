"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var contact_1 = __importDefault(require("../models/contact"));
var router = express_1.Router();
//GET customer complaints
router.post('/contact', function (req, res) {
    var latestContact = new contact_1.default({
        fullName: req.body.fullName,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
    });
    console.log(latestContact);
    latestContact
        .save()
        .then(function (result) {
        res.status(201).json();
    })
        .catch(function (err) {
        if (err)
            res.send(err);
    });
});
exports.default = router;
//# sourceMappingURL=contact.js.map