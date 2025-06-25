"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var react_1 = require("@iconify/react");
var Link_1 = __importDefault(require("../Link"));
var styled_components_1 = __importDefault(require("styled-components"));
var StyledStack = (0, styled_components_1.default)(Stack_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    border-color: rgba(255, 255, 255, 0.1);\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 100px;\n"], ["\n    border-color: rgba(255, 255, 255, 0.1);\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 100px;\n"])));
var Socials = function () {
    return ((0, jsx_runtime_1.jsxs)(StyledStack, __assign({ direction: "row", spacing: 2, p: 1 }, { children: [(0, jsx_runtime_1.jsx)(Link_1.default, __assign({ to: "https://instagram.com", hover: true }, { children: (0, jsx_runtime_1.jsx)(react_1.Icon, { icon: "mdi:instagram", height: "30" }) })), (0, jsx_runtime_1.jsx)(Link_1.default, __assign({ to: "https://spotify.com", hover: true }, { children: (0, jsx_runtime_1.jsx)(react_1.Icon, { icon: "mdi:spotify", height: "30" }) })), (0, jsx_runtime_1.jsx)(Link_1.default, __assign({ to: "https://facebook.com", hover: true }, { children: (0, jsx_runtime_1.jsx)(react_1.Icon, { icon: "akar-icons:facebook-fill", height: "30" }) }))] })));
};
exports.default = Socials;
var templateObject_1;
