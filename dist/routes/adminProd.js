"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var adminProd_1 = require("../controller/adminProd");
var router = express_1.default.Router();
/* GET users details. */
router.get('/', adminProd_1.getAll);
router.get('/:id', adminProd_1.getOne);
router.post('/', adminProd_1.dataPost);
router.put('/:id', adminProd_1.update);
router.delete('/:id', adminProd_1.deletedData);
router.get('/count', adminProd_1.count);
exports.default = router;
//# sourceMappingURL=adminProd.js.map