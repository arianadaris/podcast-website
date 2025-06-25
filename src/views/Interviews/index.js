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
var react_router_dom_1 = require("react-router-dom");
var shared_1 = require("@/themes/shared");
var styles_1 = require("@mui/material/styles");
var useMediaQuery_1 = __importDefault(require("@mui/material/useMediaQuery"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var Stack_1 = __importDefault(require("@mui/material/Stack"));
var Grid_1 = __importDefault(require("@mui/material/Grid"));
var Box_1 = __importDefault(require("@mui/material/Box"));
var Chip_1 = __importDefault(require("@mui/material/Chip"));
var PrimaryButton_1 = __importDefault(require("@/components/PrimaryButton"));
var interviewData_1 = require("@/utils/interviewData");
var PlayArrow_1 = __importDefault(require("@mui/icons-material/PlayArrow"));
var YouTube_1 = __importDefault(require("@mui/icons-material/YouTube"));
var styled_components_1 = __importDefault(require("styled-components"));
var InterviewCard = (0, styled_components_1.default)(shared_1.GlassContainer)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    transition: transform 0.2s ease-in-out;\n    cursor: pointer;\n    width: 100%;\n\n    &:hover {\n        transform: translateY(-4px);\n    }\n"], ["\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    transition: transform 0.2s ease-in-out;\n    cursor: pointer;\n    width: 100%;\n\n    &:hover {\n        transform: translateY(-4px);\n    }\n"])));
var InterviewImage = styled_components_1.default.img(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width: 100%;\n    height: 200px;\n    object-fit: cover;\n    border-radius: 8px;\n    margin-bottom: 1rem;\n"], ["\n    width: 100%;\n    height: 200px;\n    object-fit: cover;\n    border-radius: 8px;\n    margin-bottom: 1rem;\n"])));
var TagsContainer = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n    margin: 1rem 0;\n"], ["\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n    margin: 1rem 0;\n"])));
var Interviews = function () {
    var theme = (0, styles_1.useTheme)();
    var isMobile = (0, useMediaQuery_1.default)(theme.breakpoints.down('md'));
    var navigate = (0, react_router_dom_1.useNavigate)();
    var handleBookInterview = function () {
        navigate('/contact?tab=interview');
    };
    var handlePlayInterview = function (spotifyUrl) {
        window.open(spotifyUrl, '_blank');
    };
    var handleYouTube = function (youtubeUrl) {
        window.open(youtubeUrl, '_blank');
    };
    return ((0, jsx_runtime_1.jsxs)(shared_1.PageContainer, __assign({ pt: isMobile ? 12 : 24, pb: 12, spacing: 8, sx: { overflowY: 'auto' } }, { children: [(0, jsx_runtime_1.jsxs)(shared_1.PageHeader, __assign({ spacing: 4, alignSelf: "center", maxWidth: "800px" }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h6", textAlign: "center", sx: { opacity: 0.7 } }, { children: "Local Artist Spotlight" })), (0, jsx_runtime_1.jsx)(shared_1.GlowText, __assign({ variant: "h1", textAlign: "center", sx: {
                            fontSize: isMobile ? '3rem' : '4rem',
                            fontWeight: 'bold'
                        } }, { children: "Interviews" })), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "body1", textAlign: "center", color: "text.secondary", sx: { fontSize: '1.1rem', lineHeight: 1.6 }, width: { xs: '90%' }, alignSelf: "center" }, { children: "808s & Mixtapes is dedicated to showcasing the vibrant local music scene. We sit down with artists from all genres to explore their creative journey, discuss their influences, and share their unique perspectives on music. Want to share your story? Book an interview with us today!" })), (0, jsx_runtime_1.jsx)(PrimaryButton_1.default, { title: "Book an Interview", onClick: handleBookInterview, center: true })] })), (0, jsx_runtime_1.jsx)(Box_1.default, __assign({ sx: { width: '100%', px: isMobile ? 2 : 8 } }, { children: (0, jsx_runtime_1.jsx)(Grid_1.default, __assign({ container: true, spacing: 4, justifyContent: "center", alignItems: "stretch" }, { children: interviewData_1.interviewData.map(function (interview) { return ((0, jsx_runtime_1.jsx)(Grid_1.default, __assign({ item: true, xs: 12, sm: 10, md: 6, lg: 4, sx: {
                            display: 'flex',
                            justifyContent: 'center'
                        } }, { children: (0, jsx_runtime_1.jsxs)(InterviewCard, { children: [(0, jsx_runtime_1.jsx)(InterviewImage, { src: interview.imageUrl, alt: interview.title }), (0, jsx_runtime_1.jsxs)(Box_1.default, __assign({ sx: { p: 2, flex: 1, display: 'flex', flexDirection: 'column' } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h5", gutterBottom: true }, { children: interview.title })), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h6", color: "primary", gutterBottom: true }, { children: interview.artist })), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "body2", color: "text.secondary", gutterBottom: true }, { children: interview.date })), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "body1", paragraph: true }, { children: interview.description })), (0, jsx_runtime_1.jsx)(TagsContainer, { children: interview.tags.map(function (tag) { return ((0, jsx_runtime_1.jsx)(Chip_1.default, { label: tag, size: "small", color: "primary", variant: "outlined" }, tag)); }) }), (0, jsx_runtime_1.jsxs)(Box_1.default, __assign({ sx: { mt: 'auto' } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "subtitle2", color: "text.secondary", gutterBottom: true }, { children: "Highlights:" })), (0, jsx_runtime_1.jsx)("ul", __assign({ style: { margin: '0.5rem 0', paddingLeft: '1.2rem' } }, { children: interview.highlights.map(function (highlight, index) { return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "body2" }, { children: highlight })) }, index)); }) })), (0, jsx_runtime_1.jsxs)(Stack_1.default, __assign({ direction: "row", spacing: 2, sx: { mt: 2 } }, { children: [(0, jsx_runtime_1.jsx)(PrimaryButton_1.default, __assign({ title: "Listen", onClick: function () { return handlePlayInterview(interview.spotifyUrl); }, fullWidth: true, showArrow: false }, { children: (0, jsx_runtime_1.jsx)(PlayArrow_1.default, { sx: { color: 'white' } }) })), interview.youtubeUrl && ((0, jsx_runtime_1.jsx)(PrimaryButton_1.default, __assign({ title: "Watch", onClick: function () { return handleYouTube(interview.youtubeUrl); }, fullWidth: true, showArrow: false }, { children: (0, jsx_runtime_1.jsx)(YouTube_1.default, { sx: { color: 'white' } }) })))] }))] }))] }))] }) }), interview.id)); }) })) }))] })));
};
exports.default = Interviews;
var templateObject_1, templateObject_2, templateObject_3;
