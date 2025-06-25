"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Stack_1 = __importDefault(require("@mui/material/Stack"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var HeroSection_1 = __importDefault(require("@/components/HeroSection"));
var Nav_1 = __importDefault(require("@/components/Nav"));
var Socials_1 = __importDefault(require("@/components/Socials"));
var Footer = function () {
    return ((0, jsx_runtime_1.jsx)(HeroSection_1.default, { children: (0, jsx_runtime_1.jsxs)(Stack_1.default, __assign({ direction: "row", justifyContent: "space-between", alignItems: "center", width: "100%", px: 4, py: 8 }, { children: [(0, jsx_runtime_1.jsxs)(Typography_1.default, __assign({ variant: "h5", sx: { lineHeight: 0.8 } }, { children: ["808s &", (0, jsx_runtime_1.jsx)("br", {}), "Coldtakes"] })), (0, jsx_runtime_1.jsx)(Nav_1.default, {}), (0, jsx_runtime_1.jsx)(Socials_1.default, {})] })) }));
};
exports.default = Footer;
