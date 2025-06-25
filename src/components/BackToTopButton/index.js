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
var IconButton_1 = __importDefault(require("@mui/material/IconButton"));
var North_1 = __importDefault(require("@mui/icons-material/North"));
var Stack_1 = __importDefault(require("@mui/material/Stack"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var react_1 = require("react");
var react_2 = require("@emotion/react");
var fadeIn = (0, react_2.keyframes)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    from {\n        opacity: 0;\n        transform: translateY(20px);\n    }\n    to {\n        opacity: 1;\n        transform: translateY(0);\n    }\n"], ["\n    from {\n        opacity: 0;\n        transform: translateY(20px);\n    }\n    to {\n        opacity: 1;\n        transform: translateY(0);\n    }\n"])));
var BackToTopButton = function () {
    var _a = (0, react_1.useState)(false), isVisible = _a[0], setIsVisible = _a[1];
    var handleScroll = function () {
        if (window.scrollY > 0) {
            setIsVisible(true);
        }
        else {
            setIsVisible(false);
        }
    };
    var handleBack = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    (0, react_1.useEffect)(function () {
        window.addEventListener('scroll', handleScroll);
        return function () {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (isVisible ? ((0, jsx_runtime_1.jsx)(Stack_1.default, __assign({ direction: "column", justifyContent: "space-between", alignItems: "center", position: "fixed", bottom: '2.5%', right: '2.5%', sx: {
            animation: "".concat(fadeIn, " 0.5s ease-in-out")
        } }, { children: (0, jsx_runtime_1.jsx)(IconButton_1.default, __assign({ onClick: handleBack }, { children: (0, jsx_runtime_1.jsxs)(Stack_1.default, __assign({ alignItems: "center" }, { children: [(0, jsx_runtime_1.jsx)(North_1.default, { sx: { color: 'white' } }), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "body2", color: "text.primary" }, { children: "Back to Top" }))] })) })) }))) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})));
};
exports.default = BackToTopButton;
var templateObject_1;
