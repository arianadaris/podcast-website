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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Button_1 = __importDefault(require("@mui/material/Button"));
var Stack_1 = __importDefault(require("@mui/material/Stack"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var CustomButton = function (_a) {
    var label = _a.label, children = _a.children, _b = _a.isSpaceBetween, isSpaceBetween = _b === void 0 ? false : _b, props = __rest(_a, ["label", "children", "isSpaceBetween"]);
    return ((0, jsx_runtime_1.jsx)(Button_1.default, __assign({ sx: { width: isSpaceBetween ? '100%' : 'fit-content' } }, props, { children: (0, jsx_runtime_1.jsxs)(Stack_1.default, __assign({ direction: "row", justifyContent: isSpaceBetween ? 'space-between' : 'flex-start', alignItems: "center", spacing: 2, width: isSpaceBetween ? '100%' : 'fit-content' }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h6", color: "text.primary" }, { children: label })), children] })) })));
};
exports.default = CustomButton;
