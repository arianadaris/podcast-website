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
var Box_1 = __importDefault(require("@mui/material/Box"));
var HeroSection_1 = __importDefault(require("./HeroSection"));
var MeetTheTeam_1 = __importDefault(require("./MeetTheTeam"));
var WeeklyArtist_1 = __importDefault(require("./WeeklyArtist"));
var MailingList_1 = __importDefault(require("./MailingList"));
var styled_components_1 = __importDefault(require("styled-components"));
var GradientBackground = (0, styled_components_1.default)(Box_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: radial-gradient(circle at top left, rgba(30, 32, 75, 0.2) 0%, rgba(0, 0, 0, 0) 50%),\n              radial-gradient(circle at bottom right, rgba(30, 32, 75, 0.2) 0%, rgba(0, 0, 0, 0) 50%);\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: -1;\n"], ["\n  background: radial-gradient(circle at top left, rgba(30, 32, 75, 0.2) 0%, rgba(0, 0, 0, 0) 50%),\n              radial-gradient(circle at bottom right, rgba(30, 32, 75, 0.2) 0%, rgba(0, 0, 0, 0) 50%);\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: -1;\n"])));
var ContentWrapper = (0, styled_components_1.default)(Stack_1.default)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  &::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 200px;\n    background: linear-gradient(180deg, rgba(10, 3, 30, 0.8) 0%, rgba(10, 3, 30, 0) 100%);\n    pointer-events: none;\n    z-index: -1;\n  }\n"], ["\n  position: relative;\n  &::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 200px;\n    background: linear-gradient(180deg, rgba(10, 3, 30, 0.8) 0%, rgba(10, 3, 30, 0) 100%);\n    pointer-events: none;\n    z-index: -1;\n  }\n"])));
var Home = function () {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(GradientBackground, {}), (0, jsx_runtime_1.jsxs)(ContentWrapper, __assign({ width: "100%", spacing: { xs: 12, md: 16 }, pb: 12 }, { children: [(0, jsx_runtime_1.jsx)(HeroSection_1.default, {}), (0, jsx_runtime_1.jsx)(WeeklyArtist_1.default, {}), (0, jsx_runtime_1.jsx)(MeetTheTeam_1.default, {}), (0, jsx_runtime_1.jsx)(MailingList_1.default, {})] }))] }));
};
exports.default = Home;
var templateObject_1, templateObject_2;
