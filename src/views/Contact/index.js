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
var ContactForm_1 = __importDefault(require("./ContactForm"));
var shared_1 = require("@/themes/shared");
var styles_1 = require("@mui/material/styles");
var useMediaQuery_1 = __importDefault(require("@mui/material/useMediaQuery"));
var Contact = function () {
    var theme = (0, styles_1.useTheme)();
    var isMobile = (0, useMediaQuery_1.default)(theme.breakpoints.down('md'));
    return ((0, jsx_runtime_1.jsxs)(shared_1.PageContainer, __assign({ pt: 24, pb: 12, spacing: 8, minHeight: "85vh", justifyContent: "flex-start", alignItems: "center", sx: { overflowY: 'auto' } }, { children: [(0, jsx_runtime_1.jsxs)(shared_1.PageHeader, __assign({ spacing: 2, alignSelf: "center" }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h6", textAlign: "center", sx: { opacity: 0.7 } }, { children: "Get in Touch!" })), (0, jsx_runtime_1.jsx)(shared_1.GlowText, __assign({ variant: "h1", textAlign: "center", sx: {
                            fontSize: isMobile ? '3rem' : '4rem',
                            fontWeight: 'bold'
                        } }, { children: "Contact" }))] })), (0, jsx_runtime_1.jsx)(Stack_1.default, __assign({ width: { xs: '90%', md: '33%' }, alignSelf: "center", sx: { mb: 4 } }, { children: (0, jsx_runtime_1.jsx)(shared_1.GlassContainer, { children: (0, jsx_runtime_1.jsx)(ContactForm_1.default, {}) }) }))] })));
};
exports.default = Contact;
