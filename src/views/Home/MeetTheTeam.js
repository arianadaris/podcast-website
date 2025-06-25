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
var styled_components_1 = __importDefault(require("styled-components"));
var TeamCard_1 = __importDefault(require("@/components/TeamCard"));
var teamData_1 = require("@/utils/teamData");
var shared_1 = require("@/themes/shared");
var styles_1 = require("@mui/material/styles");
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var Container = styled_components_1.default.section(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    padding: 4rem 2rem;\n"], ["\n    padding: 4rem 2rem;\n"])));
var TeamGrid = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n    gap: 2rem;\n    max-width: 1200px;\n    margin: 0 auto;\n"], ["\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n    gap: 2rem;\n    max-width: 1200px;\n    margin: 0 auto;\n"])));
var MeetTheTeam = function () {
    var theme = (0, styles_1.useTheme)();
    return ((0, jsx_runtime_1.jsx)(Container, { children: (0, jsx_runtime_1.jsxs)(shared_1.GlassContainer, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h2", align: "center", sx: {
                        fontSize: '2.5rem',
                        marginBottom: '3rem',
                        color: theme.palette.text.primary
                    } }, { children: "Meet The Team" })), (0, jsx_runtime_1.jsx)(TeamGrid, { children: Object.values(teamData_1.teamData).map(function (member) { return ((0, jsx_runtime_1.jsx)(TeamCard_1.default, { name: member.name, role: member.role, image: member.avatar, slug: member.slug }, member.id)); }) })] }) }));
};
exports.default = MeetTheTeam;
var templateObject_1, templateObject_2;
