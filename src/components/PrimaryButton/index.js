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
var styles_1 = require("@mui/material/styles");
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var styled_components_1 = __importDefault(require("styled-components"));
var NorthEast_1 = __importDefault(require("@mui/icons-material/NorthEast"));
var StyledButton = styled_components_1.default.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    border-radius: 100px;\n    border-color: rgba(255, 255, 255, 0.1);\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 100px;\n    background-color: rgba(255, 255, 255, 0.1);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 10px;\n    width: ", ";\n    padding: 1rem 3rem;\n    align-self: ", ";\n    transition: all 0.3s ease;\n\n    &:hover {\n        cursor: pointer;\n        background-color: ", ";\n    }\n\n    &:disabled {\n        opacity: 0.5;\n        cursor: not-allowed;\n        &:hover {\n            background-color: rgba(255, 255, 255, 0.1);\n        }\n    }\n"], ["\n    border-radius: 100px;\n    border-color: rgba(255, 255, 255, 0.1);\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 100px;\n    background-color: rgba(255, 255, 255, 0.1);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 10px;\n    width: ", ";\n    padding: 1rem 3rem;\n    align-self: ", ";\n    transition: all 0.3s ease;\n\n    &:hover {\n        cursor: pointer;\n        background-color: ", ";\n    }\n\n    &:disabled {\n        opacity: 0.5;\n        cursor: not-allowed;\n        &:hover {\n            background-color: rgba(255, 255, 255, 0.1);\n        }\n    }\n"])), function (_a) {
    var fullWidth = _a.fullWidth;
    return fullWidth ? '100%' : 'fit-content';
}, function (_a) {
    var center = _a.center;
    return center ? 'center' : 'flex-start';
}, function (_a) {
    var theme = _a.theme;
    return theme.palette.primary.light;
});
var PrimaryButton = function (_a) {
    var title = _a.title, _b = _a.center, center = _b === void 0 ? false : _b, disabled = _a.disabled, fullWidth = _a.fullWidth, onClick = _a.onClick, children = _a.children, _c = _a.showArrow, showArrow = _c === void 0 ? true : _c;
    var theme = (0, styles_1.useTheme)();
    return ((0, jsx_runtime_1.jsxs)(StyledButton, __assign({ onClick: onClick, theme: theme, center: center, disabled: disabled, fullWidth: fullWidth }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "body1", color: "text.primary" }, { children: title })), children, showArrow && (0, jsx_runtime_1.jsx)(NorthEast_1.default, { sx: { color: 'white' } })] })));
};
exports.default = PrimaryButton;
var templateObject_1;
