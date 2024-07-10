"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const secretKey = config_1.default.JWT_SECRET;
const authenticateJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }
    try {
        if (!secretKey) {
            throw new Error("Secret key is not defined");
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.decoded = decoded;
        next();
    }
    catch (ex) {
        return res.status(400).send("Invalid token.");
    }
};
exports.authenticateJWT = authenticateJWT;
// export const fetchUser = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Response | void => {
//   const decoded = (req as any).decoded;
//   if (!decoded || !decoded.id) {
//     return res.status(401).send("Access denied. No user ID found in token.");
//   }
//   const user = getUserById(decoded.id, );
//   if (!user) {
//     return res.status(404).send("User not found");
//   }
//   (req as any).user = user;
//   next();
// };
