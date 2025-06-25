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
var PrimaryButton_1 = __importDefault(require("@/components/PrimaryButton"));
var react_1 = require("react");
var Error = function () {
    (0, react_1.useEffect)(function () {
        // Hide the scrollbar
        document.body.style.overflow = 'hidden';
        // Cleanup function to reset the overflow style
        return function () {
            document.body.style.overflow = '';
        };
    }, []);
    var handleGoToHome = function () {
        window.location.href = '/';
    };
    return ((0, jsx_runtime_1.jsxs)(Stack_1.default, __assign({ spacing: 4, width: "100%", justifyContent: "center", alignItems: "center", alignSelf: "center", minHeight: "85vh", pt: 24, pb: 12 }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h1", align: "center" }, { children: "404" })), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h6", align: "center" }, { children: "Page Not Found" })), (0, jsx_runtime_1.jsx)(PrimaryButton_1.default, { title: "Go to Home", onClick: handleGoToHome, center: true })] })));
};
exports.default = Error;
