"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var products_1 = require("../controller/products");
var router = express_1.default.Router();
/* GET users details. */
router.get('/', products_1.getAll);
router.get('/:id', products_1.getOne);
router.post('/', products_1.dataPost);
router.put('/:id', products_1.update);
router.delete('/:id', products_1.deletedData);
router.get('/count', products_1.count);
exports.default = router;
//# sourceMappingURL=products.js.map