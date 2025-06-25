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
var styled_components_1 = __importDefault(require("styled-components"));
var teamData_1 = require("../../utils/teamData");
var shared_1 = require("../../themes/shared");
var styles_1 = require("@mui/material/styles");
var Box_1 = __importDefault(require("@mui/material/Box"));
var useMediaQuery_1 = __importDefault(require("@mui/material/useMediaQuery"));
var TeamMemberContainer = (0, styled_components_1.default)(Box_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    padding: 2rem;\n    max-width: 1200px;\n    margin: 0 auto;\n"], ["\n    padding: 2rem;\n    max-width: 1200px;\n    margin: 0 auto;\n"])));
var Header = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    align-items: center;\n    gap: 2rem;\n    margin-bottom: 3rem;\n    \n    @media (max-width: 768px) {\n        flex-direction: column;\n        text-align: center;\n    }\n"], ["\n    display: flex;\n    align-items: center;\n    gap: 2rem;\n    margin-bottom: 3rem;\n    \n    @media (max-width: 768px) {\n        flex-direction: column;\n        text-align: center;\n    }\n"])));
var Avatar = styled_components_1.default.img(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    width: 200px;\n    height: 200px;\n    border-radius: 50%;\n    object-fit: cover;\n    border: 4px solid ", ";\n    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);\n"], ["\n    width: 200px;\n    height: 200px;\n    border-radius: 50%;\n    object-fit: cover;\n    border: 4px solid ", ";\n    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.primary.main;
});
var HeaderInfo = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    flex: 1;\n"], ["\n    flex: 1;\n"])));
var Name = styled_components_1.default.h1(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    font-size: 3rem;\n    margin: 0;\n    color: ", ";\n    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);\n"], ["\n    font-size: 3rem;\n    margin: 0;\n    color: ", ";\n    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.text.primary;
});
var Role = styled_components_1.default.h2(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    font-size: 1.5rem;\n    color: ", ";\n    margin: 0.5rem 0;\n"], ["\n    font-size: 1.5rem;\n    color: ", ";\n    margin: 0.5rem 0;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.primary.main;
});
var Quote = styled_components_1.default.blockquote(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    font-style: italic;\n    font-size: 1.2rem;\n    margin: 1rem 0;\n    padding-left: 1rem;\n    border-left: 4px solid ", ";\n    color: ", ";\n"], ["\n    font-style: italic;\n    font-size: 1.2rem;\n    margin: 1rem 0;\n    padding-left: 1rem;\n    border-left: 4px solid ", ";\n    color: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.primary.main;
}, function (_a) {
    var theme = _a.theme;
    return theme.palette.text.secondary;
});
var Section = (0, styled_components_1.default)(shared_1.GlassContainer)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    margin-bottom: 2rem;\n    padding: 1.5rem;\n"], ["\n    margin-bottom: 2rem;\n    padding: 1.5rem;\n"])));
var SectionTitle = styled_components_1.default.h3(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    color: ", ";\n    margin-top: 0;\n    font-size: 1.5rem;\n"], ["\n    color: ", ";\n    margin-top: 0;\n    font-size: 1.5rem;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.text.primary;
});
var Bio = styled_components_1.default.p(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    font-size: 1.1rem;\n    line-height: 1.6;\n    color: ", ";\n"], ["\n    font-size: 1.1rem;\n    line-height: 1.6;\n    color: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.text.primary;
});
var List = styled_components_1.default.ul(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    list-style: none;\n    padding: 0;\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n    gap: 1rem;\n"], ["\n    list-style: none;\n    padding: 0;\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n    gap: 1rem;\n"])));
var ListItem = styled_components_1.default.li(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n    padding: 0.5rem;\n    color: ", ";\n    &:before {\n        content: \"\u2022\";\n        color: ", ";\n        font-weight: bold;\n        margin-right: 0.5rem;\n    }\n"], ["\n    padding: 0.5rem;\n    color: ", ";\n    &:before {\n        content: \"\u2022\";\n        color: ", ";\n        font-weight: bold;\n        margin-right: 0.5rem;\n    }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.text.primary;
}, function (_a) {
    var theme = _a.theme;
    return theme.palette.primary.main;
});
var SocialLinks = styled_components_1.default.div(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n    display: flex;\n    gap: 1rem;\n    margin-top: 1rem;\n    flex-wrap: wrap;\n"], ["\n    display: flex;\n    gap: 1rem;\n    margin-top: 1rem;\n    flex-wrap: wrap;\n"])));
var SocialLink = styled_components_1.default.a(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n    color: ", ";\n    text-decoration: none;\n    padding: 0.5rem 1rem;\n    border-radius: 20px;\n    background: rgba(255, 255, 255, 0.1);\n    font-size: 0.9rem;\n    transition: all 0.3s ease;\n    \n    &:hover {\n        color: ", ";\n        background: rgba(255, 255, 255, 0.2);\n        transform: translateY(-2px);\n    }\n"], ["\n    color: ", ";\n    text-decoration: none;\n    padding: 0.5rem 1rem;\n    border-radius: 20px;\n    background: rgba(255, 255, 255, 0.1);\n    font-size: 0.9rem;\n    transition: all 0.3s ease;\n    \n    &:hover {\n        color: ", ";\n        background: rgba(255, 255, 255, 0.2);\n        transform: translateY(-2px);\n    }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.text.primary;
}, function (_a) {
    var theme = _a.theme;
    return theme.palette.primary.main;
});
var EpisodeCard = styled_components_1.default.div(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n    padding: 1rem;\n    border-radius: 8px;\n    background: rgba(255, 255, 255, 0.05);\n    margin-bottom: 1rem;\n    margin-top: 1rem;\n    \n    h4 {\n        margin: 0;\n        color: ", ";\n        padding-bottom: 0.5rem;\n    }\n    \n    p {\n        margin: 0.5rem 0;\n        color: ", ";\n    }\n    \n    a {\n        color: ", ";\n        text-decoration: none;\n        &:hover {\n            text-decoration: underline;\n        }\n    }\n"], ["\n    padding: 1rem;\n    border-radius: 8px;\n    background: rgba(255, 255, 255, 0.05);\n    margin-bottom: 1rem;\n    margin-top: 1rem;\n    \n    h4 {\n        margin: 0;\n        color: ", ";\n        padding-bottom: 0.5rem;\n    }\n    \n    p {\n        margin: 0.5rem 0;\n        color: ", ";\n    }\n    \n    a {\n        color: ", ";\n        text-decoration: none;\n        &:hover {\n            text-decoration: underline;\n        }\n    }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.text.primary;
}, function (_a) {
    var theme = _a.theme;
    return theme.palette.text.secondary;
}, function (_a) {
    var theme = _a.theme;
    return theme.palette.primary.secondary;
});
var TeamMemberDetail = function () {
    var slug = (0, react_router_dom_1.useParams)().slug;
    var member = slug ? (0, teamData_1.getTeamMemberBySlug)(slug) : undefined;
    var theme = (0, styles_1.useTheme)();
    var isMobile = (0, useMediaQuery_1.default)(theme.breakpoints.down('md'));
    if (!member) {
        return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/about", replace: true });
    }
    return ((0, jsx_runtime_1.jsx)(shared_1.PageContainer, __assign({ pt: isMobile ? 12 : 24 }, { children: (0, jsx_runtime_1.jsxs)(TeamMemberContainer, { children: [(0, jsx_runtime_1.jsxs)(Header, { children: [(0, jsx_runtime_1.jsx)(Avatar, { src: member.avatar, alt: member.name, theme: theme }), (0, jsx_runtime_1.jsxs)(HeaderInfo, { children: [(0, jsx_runtime_1.jsx)(Name, __assign({ theme: theme }, { children: member.name })), (0, jsx_runtime_1.jsx)(Role, __assign({ theme: theme }, { children: member.role })), (0, jsx_runtime_1.jsxs)(Quote, __assign({ theme: theme }, { children: ["\"", member.quote, "\""] })), (0, jsx_runtime_1.jsxs)(SocialLinks, { children: [member.socialLinks.twitter && ((0, jsx_runtime_1.jsx)(SocialLink, __assign({ href: member.socialLinks.twitter, target: "_blank", rel: "noopener noreferrer", theme: theme }, { children: "Twitter" }))), member.socialLinks.instagram && ((0, jsx_runtime_1.jsx)(SocialLink, __assign({ href: member.socialLinks.instagram, target: "_blank", rel: "noopener noreferrer", theme: theme }, { children: "Instagram" }))), member.socialLinks.linkedin && ((0, jsx_runtime_1.jsx)(SocialLink, __assign({ href: member.socialLinks.linkedin, target: "_blank", rel: "noopener noreferrer", theme: theme }, { children: "LinkedIn" }))), member.socialLinks.spotify && ((0, jsx_runtime_1.jsx)(SocialLink, __assign({ href: member.socialLinks.spotify, target: "_blank", rel: "noopener noreferrer", theme: theme }, { children: "Spotify" })))] })] })] }), (0, jsx_runtime_1.jsxs)(Section, { children: [(0, jsx_runtime_1.jsx)(SectionTitle, __assign({ theme: theme }, { children: "Bio" })), (0, jsx_runtime_1.jsx)(Bio, __assign({ theme: theme }, { children: member.bio }))] }), (0, jsx_runtime_1.jsxs)(Section, { children: [(0, jsx_runtime_1.jsx)(SectionTitle, __assign({ theme: theme }, { children: "Favorite Artists" })), (0, jsx_runtime_1.jsx)(List, { children: member.favoriteArtists.map(function (artist, index) { return ((0, jsx_runtime_1.jsx)(ListItem, __assign({ theme: theme }, { children: artist }), index)); }) })] }), (0, jsx_runtime_1.jsxs)(Section, { children: [(0, jsx_runtime_1.jsx)(SectionTitle, __assign({ theme: theme }, { children: "Favorite Albums" })), (0, jsx_runtime_1.jsx)(List, { children: member.favoriteAlbums.map(function (album, index) { return ((0, jsx_runtime_1.jsx)(ListItem, __assign({ theme: theme }, { children: album }), index)); }) })] })] }) })));
};
exports.default = TeamMemberDetail;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15;
