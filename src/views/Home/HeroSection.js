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
var HeroSection_1 = __importDefault(require("@/components/HeroSection"));
var Stack_1 = __importDefault(require("@mui/material/Stack"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var PrimaryButton_1 = __importDefault(require("@/components/PrimaryButton"));
var Logo_1 = __importDefault(require("@/components/Logo"));
var EpisodeTile_1 = __importDefault(require("@/components/EpisodeTile"));
var rssService_1 = require("@/services/rssService");
var Scrollbar_1 = __importDefault(require("@/components/Scrollbar"));
var styles_1 = require("@mui/material/styles");
var useMediaQuery_1 = __importDefault(require("@mui/material/useMediaQuery"));
var Box_1 = __importDefault(require("@mui/material/Box"));
var styled_components_1 = __importDefault(require("styled-components"));
var GlowText = (0, styled_components_1.default)(Typography_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);\n    letter-spacing: -0.02em;\n"], ["\n    text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);\n    letter-spacing: -0.02em;\n"])));
var EpisodesContainer = (0, styled_components_1.default)(Box_1.default)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    background: rgba(255, 255, 255, 0.03);\n    backdrop-filter: blur(10px);\n    border-radius: 24px;\n    padding: 24px;\n    border: 1px solid rgba(255, 255, 255, 0.1);\n"], ["\n    background: rgba(255, 255, 255, 0.03);\n    backdrop-filter: blur(10px);\n    border-radius: 24px;\n    padding: 24px;\n    border: 1px solid rgba(255, 255, 255, 0.1);\n"])));
var HeroSection = function () {
    var episodes = (0, rssService_1.useGetEpisodes)().data;
    var theme = (0, styles_1.useTheme)();
    var isMobile = (0, useMediaQuery_1.default)(theme.breakpoints.down('md'));
    return ((0, jsx_runtime_1.jsx)(HeroSection_1.default, { children: (0, jsx_runtime_1.jsxs)(Stack_1.default, __assign({ direction: isMobile ? "column" : "row", spacing: 8, pt: isMobile ? 16 : 24, pb: isMobile ? 12 : 20, width: isMobile ? '90%' : '75%', alignSelf: "center" }, { children: [isMobile && ((0, jsx_runtime_1.jsx)(Stack_1.default, __assign({ width: "100%", alignItems: "center" }, { children: (0, jsx_runtime_1.jsx)(Logo_1.default, { width: isMobile ? 200 : 300 }) }))), (0, jsx_runtime_1.jsxs)(Stack_1.default, __assign({ spacing: 8, width: isMobile ? "100%" : "60%", justifyContent: "center" }, { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, { children: [(0, jsx_runtime_1.jsxs)(GlowText, __assign({ variant: "h1", textAlign: isMobile ? "center" : "left", sx: { fontSize: isMobile ? '3rem' : '4rem', fontWeight: 'bold', mb: 2 } }, { children: ["808s &", (0, jsx_runtime_1.jsx)("br", {}), "Coldtakes"] })), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "body1", textAlign: isMobile ? "center" : "left", sx: {
                                        opacity: 0.8,
                                        fontSize: isMobile ? '1rem' : '1.1rem',
                                        lineHeight: 1.6
                                    } }, { children: "Hosted by Maxx, Los, Johan, and Brayden, we cover loads of music topics with an emphasis on Hip Hop. Tune in every weekend to hear our takes and discussions about the music industry!" }))] }), (0, jsx_runtime_1.jsx)(PrimaryButton_1.default, { title: "Subscribe to Podcast", onClick: function () { }, center: isMobile })] })), (0, jsx_runtime_1.jsxs)(Stack_1.default, __assign({ spacing: 4, width: "100%" }, { children: [!isMobile && ((0, jsx_runtime_1.jsx)(Stack_1.default, __assign({ width: "100%", alignItems: "center", mb: 2 }, { children: (0, jsx_runtime_1.jsx)(Logo_1.default, { width: isMobile ? 200 : 300 }) }))), (0, jsx_runtime_1.jsxs)(EpisodesContainer, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h6", sx: { mb: 3, opacity: 0.9 } }, { children: "Latest Episodes" })), (0, jsx_runtime_1.jsx)(Scrollbar_1.default, __assign({ maxHeight: isMobile ? 300 : 400 }, { children: (0, jsx_runtime_1.jsx)(Stack_1.default, __assign({ spacing: 2 }, { children: episodes === null || episodes === void 0 ? void 0 : episodes.slice(0, 10).map(function (episode) { return ((0, jsx_runtime_1.jsx)(EpisodeTile_1.default, { episode: episode }, episode.id)); }) })) }))] })] }))] })) }));
};
exports.default = HeroSection;
var templateObject_1, templateObject_2;
