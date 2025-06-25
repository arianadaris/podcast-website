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
var react_router_dom_1 = require("react-router-dom");
var styled_components_1 = __importDefault(require("styled-components"));
var styles_1 = require("@mui/material/styles");
var StyledLink = (0, styled_components_1.default)(react_router_dom_1.Link)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    color: inherit;\n    text-decoration: none;\n    padding: 0.5rem;\n    border-radius: 100px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: fit-content;\n    transition: 0.15s ease all;\n\n    &:hover {\n        background-color: ", ";\n    }\n"], ["\n    color: inherit;\n    text-decoration: none;\n    padding: 0.5rem;\n    border-radius: 100px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: fit-content;\n    transition: 0.15s ease all;\n\n    &:hover {\n        background-color: ", ";\n    }\n"])), function (_a) {
    var theme = _a.theme, hover = _a.hover;
    return hover ? theme.palette.primary.light : 'initial';
});
var Link = function (_a) {
    var children = _a.children, to = _a.to, _b = _a.hover, hover = _b === void 0 ? false : _b, onClick = _a.onClick;
    var theme = (0, styles_1.useTheme)();
    var handleClick = function (e) {
        if (onClick) {
            onClick();
        }
    };
    return ((0, jsx_runtime_1.jsx)(StyledLink, __assign({ to: to, theme: theme, hover: hover, onClick: handleClick }, { children: children })));
};
exports.default = Link;
var templateObject_1;
