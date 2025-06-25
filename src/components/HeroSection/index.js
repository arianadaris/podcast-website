"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Stack_1 = __importDefault(require("@mui/material/Stack"));
var styled_components_1 = __importDefault(require("styled-components"));
var StyledHeroSection = (0, styled_components_1.default)(Stack_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    background: radial-gradient(82.06% 70.78% at 82.43% 22.96%, rgba(8, 134, 231, 0.30) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(91.61% 67.45% at 61.04% 103.32%, rgba(231, 8, 142, 0.10) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(67.16% 96.02% at 9.44% 14.73%, rgba(8, 134, 231, 0.25) 0%, rgba(0, 0, 0, 0.00) 100%), #02030F;\n"], ["\n    background: radial-gradient(82.06% 70.78% at 82.43% 22.96%, rgba(8, 134, 231, 0.30) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(91.61% 67.45% at 61.04% 103.32%, rgba(231, 8, 142, 0.10) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(67.16% 96.02% at 9.44% 14.73%, rgba(8, 134, 231, 0.25) 0%, rgba(0, 0, 0, 0.00) 100%), #02030F;\n"])));
var HeroSection = function (_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsx)(StyledHeroSection, { children: children }));
};
exports.default = HeroSection;
var templateObject_1;
