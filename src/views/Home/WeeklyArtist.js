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
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var PrimaryButton_1 = __importDefault(require("@/components/PrimaryButton"));
var styled_components_1 = __importDefault(require("styled-components"));
var Grid_1 = __importDefault(require("@mui/material/Grid"));
var Box_1 = __importDefault(require("@mui/material/Box"));
var styles_1 = require("@mui/material/styles");
var useMediaQuery_1 = __importDefault(require("@mui/material/useMediaQuery"));
var ArtistSection = (0, styled_components_1.default)(Box_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    background: radial-gradient(748.73% 131.32% at 34.71% 54.60%, rgba(30, 32, 75, 0.60) 0%, rgba(0, 0, 0, 0.00) 100%), #0A031E;\n    border-radius: 32px;\n    border: 1px solid rgba(255, 255, 255, 0.05);\n    backdrop-filter: blur(10px);\n    overflow: hidden;\n    position: relative;\n\n    &::before {\n        content: '';\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        height: 1px;\n        background: linear-gradient(90deg, \n            rgba(255, 255, 255, 0) 0%, \n            rgba(255, 255, 255, 0.2) 50%, \n            rgba(255, 255, 255, 0) 100%);\n    }\n"], ["\n    background: radial-gradient(748.73% 131.32% at 34.71% 54.60%, rgba(30, 32, 75, 0.60) 0%, rgba(0, 0, 0, 0.00) 100%), #0A031E;\n    border-radius: 32px;\n    border: 1px solid rgba(255, 255, 255, 0.05);\n    backdrop-filter: blur(10px);\n    overflow: hidden;\n    position: relative;\n\n    &::before {\n        content: '';\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        height: 1px;\n        background: linear-gradient(90deg, \n            rgba(255, 255, 255, 0) 0%, \n            rgba(255, 255, 255, 0.2) 50%, \n            rgba(255, 255, 255, 0) 100%);\n    }\n"])));
var HighlightText = (0, styled_components_1.default)(Typography_1.default)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    background: linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0.8) 100%);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    text-fill-color: transparent;\n"], ["\n    background: linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0.8) 100%);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    text-fill-color: transparent;\n"])));
var WeeklyArtist = function () {
    var theme = (0, styles_1.useTheme)();
    var isMobile = (0, useMediaQuery_1.default)(theme.breakpoints.down('md'));
    return ((0, jsx_runtime_1.jsx)(ArtistSection, { children: (0, jsx_runtime_1.jsxs)(Grid_1.default, __assign({ container: true, spacing: isMobile ? 4 : 8, sx: {
                width: '90%',
                margin: '0 auto',
                py: isMobile ? 6 : 8,
                px: isMobile ? 2 : 4
            } }, { children: [(0, jsx_runtime_1.jsx)(Grid_1.default, __assign({ item: true, xs: 12, md: 6 }, { children: (0, jsx_runtime_1.jsx)(Box_1.default, __assign({ sx: {
                            height: '100%',
                            minHeight: 300,
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                            borderRadius: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        } }, { children: (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h5", sx: { opacity: 0.5 } }, { children: "Artist Image" })) })) })), (0, jsx_runtime_1.jsx)(Grid_1.default, __assign({ item: true, xs: 12, md: 6 }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, __assign({ sx: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4,
                            alignItems: isMobile ? 'center' : 'flex-start',
                            height: '100%',
                            justifyContent: 'center'
                        } }, { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h6", sx: {
                                            opacity: 0.7,
                                            mb: 1,
                                            textAlign: isMobile ? 'center' : 'left'
                                        } }, { children: "Latest Artist" })), (0, jsx_runtime_1.jsx)(HighlightText, __assign({ variant: "h1", sx: {
                                            fontSize: isMobile ? '2.5rem' : '3.5rem',
                                            mb: 2,
                                            textAlign: isMobile ? 'center' : 'left'
                                        } }, { children: "S.A.M.N X" })), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "body1", textAlign: isMobile ? 'center' : 'left', sx: {
                                            opacity: 0.8,
                                            fontSize: isMobile ? '1rem' : '1.1rem',
                                            lineHeight: 1.6,
                                            maxWidth: '600px'
                                        } }, { children: "Local to Arizona, S.A.M.N X is an up-and-coming Hip Hop music group. 808s & Coldtakes is proud to announce the S.A.M.N X documentary, in partnership with Pascal Productions." }))] }), (0, jsx_runtime_1.jsx)(PrimaryButton_1.default, { title: "Watch Documentary", onClick: function () { }, center: isMobile })] })) }))] })) }));
};
exports.default = WeeklyArtist;
var templateObject_1, templateObject_2;
