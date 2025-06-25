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
var MailingListForm_1 = __importDefault(require("./MailingListForm"));
var Stack_1 = __importDefault(require("@mui/material/Stack"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var styled_components_1 = __importDefault(require("styled-components"));
var styles_1 = require("@mui/material/styles");
var useMediaQuery_1 = __importDefault(require("@mui/material/useMediaQuery"));
var MailingSection = (0, styled_components_1.default)(Stack_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    background: radial-gradient(82.06% 70.78% at 82.43% 22.96%, rgba(8, 134, 231, 0.30) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(67.16% 96.02% at 9.44% 14.73%, rgba(8, 134, 231, 0.45) 0%, rgba(0, 0, 0, 0.00) 100%), #02030F;\n    background-position: 100% 100%;\n    border-radius: 0 0 50px 50px;\n"], ["\n    background: radial-gradient(82.06% 70.78% at 82.43% 22.96%, rgba(8, 134, 231, 0.30) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(67.16% 96.02% at 9.44% 14.73%, rgba(8, 134, 231, 0.45) 0%, rgba(0, 0, 0, 0.00) 100%), #02030F;\n    background-position: 100% 100%;\n    border-radius: 0 0 50px 50px;\n"])));
var MailingList = function () {
    var theme = (0, styles_1.useTheme)();
    var isMobile = (0, useMediaQuery_1.default)(theme.breakpoints.down('md'));
    return ((0, jsx_runtime_1.jsxs)(MailingSection, __assign({ spacing: 2, py: 8, px: isMobile ? 4 : 16, width: "97.5%", alignSelf: "center" }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: 'h6', sx: { lineHeight: 0.8 } }, { children: "Join Our Mailing List" })), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: 'h1' }, { children: "Stay up to date with 808s!" })), (0, jsx_runtime_1.jsx)(MailingListForm_1.default, {})] })));
};
exports.default = MailingList;
var templateObject_1;
