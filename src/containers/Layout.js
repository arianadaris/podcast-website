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
var react_1 = require("react");
var Stack_1 = __importDefault(require("@mui/material/Stack"));
var Header_1 = __importDefault(require("@/components/Header"));
var Footer_1 = __importDefault(require("@/components/Footer"));
var styles_1 = require("@mui/material/styles");
var Box_1 = __importDefault(require("@mui/material/Box"));
var RootStack = (0, styles_1.styled)(Stack_1.default)(function (_a) {
    var theme = _a.theme;
    return ({
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    });
});
var MainContent = (0, styles_1.styled)(Box_1.default)(function (_a) {
    var theme = _a.theme;
    return ({
        flex: 1,
        width: '100%',
    });
});
var Layout = (0, react_1.memo)(function (_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsxs)(RootStack, { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(MainContent, __assign({ component: "main" }, { children: children })), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }));
});
Layout.displayName = 'Layout';
exports.default = Layout;
