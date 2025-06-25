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
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var Grid_1 = __importDefault(require("@mui/material/Grid"));
var TeamCard_1 = __importDefault(require("@/components/TeamCard"));
var Box_1 = __importDefault(require("@mui/material/Box"));
var shared_1 = require("@/themes/shared");
var styles_1 = require("@mui/material/styles");
var useMediaQuery_1 = __importDefault(require("@mui/material/useMediaQuery"));
var teamData_1 = require("@/utils/teamData");
var About = function () {
    var theme = (0, styles_1.useTheme)();
    var isMobile = (0, useMediaQuery_1.default)(theme.breakpoints.down('md'));
    return ((0, jsx_runtime_1.jsxs)(shared_1.PageContainer, __assign({ alignItems: "center", justifyContent: "center", pt: 24, pb: 12, spacing: 12 }, { children: [(0, jsx_runtime_1.jsxs)(shared_1.PageHeader, __assign({ spacing: 2, alignSelf: "center" }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h6", textAlign: "center", sx: { opacity: 0.7 } }, { children: "Welcome To" })), (0, jsx_runtime_1.jsx)(shared_1.GlowText, __assign({ variant: "h1", textAlign: "center", sx: {
                            fontSize: isMobile ? '3rem' : '4rem',
                            fontWeight: 'bold'
                        } }, { children: "808s & Coldtakes" }))] })), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "body1", width: { xs: '90%', md: '50%' }, alignSelf: "center", align: "center", sx: {
                    opacity: 0.8,
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    lineHeight: 1.6
                } }, { children: "808s and Coldtakes are a group of friends who love discussing music topics and bringing light to phenomenal local artists in our communities. Our passion for music drives us to explore various genres and share our insights with our audience." })), (0, jsx_runtime_1.jsx)(Box_1.default, __assign({ width: "100%", display: "flex", justifyContent: "center" }, { children: (0, jsx_runtime_1.jsx)(Grid_1.default, __assign({ container: true, spacing: isMobile ? 4 : 8, sx: {
                        width: isMobile ? '90%' : '85%',
                        mt: 4
                    } }, { children: Object.values(teamData_1.teamData).map(function (member) { return ((0, jsx_runtime_1.jsx)(Grid_1.default, __assign({ item: true, xs: 12, sm: 6, md: 3 }, { children: (0, jsx_runtime_1.jsx)(TeamCard_1.default, { name: member.name, role: member.role, image: member.avatar, slug: member.slug }) }), member.id)); }) })) }))] })));
};
exports.default = About;
