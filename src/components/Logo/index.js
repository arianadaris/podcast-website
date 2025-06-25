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
var logo_png_1 = __importDefault(require("@/assets/logo.png"));
var Link_1 = __importDefault(require("../Link"));
var LogoComponent = function (_a) {
    var width = _a.width;
    return (0, jsx_runtime_1.jsx)(Link_1.default, __assign({ to: "/" }, { children: (0, jsx_runtime_1.jsx)("img", { src: logo_png_1.default, alt: "Logo", style: { width: width } }) }));
};
exports.default = LogoComponent;
