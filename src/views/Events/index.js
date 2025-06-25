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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var date_fns_1 = require("date-fns");
var shared_1 = require("@/themes/shared");
var styles_1 = require("@mui/material/styles");
var useMediaQuery_1 = __importDefault(require("@mui/material/useMediaQuery"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var Stack_1 = __importDefault(require("@mui/material/Stack"));
var Grid_1 = __importDefault(require("@mui/material/Grid"));
var Box_1 = __importDefault(require("@mui/material/Box"));
var Chip_1 = __importDefault(require("@mui/material/Chip"));
var Avatar_1 = __importDefault(require("@mui/material/Avatar"));
var AvatarGroup_1 = __importDefault(require("@mui/material/AvatarGroup"));
var LocationOn_1 = __importDefault(require("@mui/icons-material/LocationOn"));
var AccessTime_1 = __importDefault(require("@mui/icons-material/AccessTime"));
var CalendarToday_1 = __importDefault(require("@mui/icons-material/CalendarToday"));
var PrimaryButton_1 = __importDefault(require("@/components/PrimaryButton"));
var eventsData_1 = require("@/utils/eventsData");
var teamData_1 = require("@/utils/teamData");
var styled_components_1 = __importDefault(require("styled-components"));
var EventCard = (0, styled_components_1.default)(shared_1.GlassContainer)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    transition: transform 0.2s ease-in-out;\n    cursor: pointer;\n    width: 100%;\n\n    &:hover {\n        transform: translateY(-4px);\n    }\n"], ["\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    transition: transform 0.2s ease-in-out;\n    cursor: pointer;\n    width: 100%;\n\n    &:hover {\n        transform: translateY(-4px);\n    }\n"])));
var EventImage = styled_components_1.default.img(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width: 100%;\n    height: 200px;\n    object-fit: cover;\n    border-radius: 8px;\n    margin-bottom: 1rem;\n"], ["\n    width: 100%;\n    height: 200px;\n    object-fit: cover;\n    border-radius: 8px;\n    margin-bottom: 1rem;\n"])));
var EventTypeChip = (0, styled_components_1.default)(Chip_1.default)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    position: absolute;\n    top: 1rem;\n    right: 1rem;\n    backdrop-filter: blur(10px);\n    background-color: rgba(255, 255, 255, 0.1);\n"], ["\n    position: absolute;\n    top: 1rem;\n    right: 1rem;\n    backdrop-filter: blur(10px);\n    background-color: rgba(255, 255, 255, 0.1);\n"])));
var InfoRow = (0, styled_components_1.default)(Stack_1.default)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    color: ", ";\n    align-items: center;\n    gap: 0.5rem;\n"], ["\n    color: ", ";\n    align-items: center;\n    gap: 0.5rem;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.text.secondary;
});
var Events = function () {
    var theme = (0, styles_1.useTheme)();
    var isMobile = (0, useMediaQuery_1.default)(theme.breakpoints.down('md'));
    var getTeamMembers = function (memberIds) {
        return Object.values(teamData_1.teamData).filter(function (member) { return memberIds.includes(member.id); });
    };
    var handleTicketClick = function (url) {
        if (url) {
            window.open(url, '_blank');
        }
    };
    var handleRSVPClick = function (url) {
        if (url) {
            window.open(url, '_blank');
        }
    };
    // Sort events by date
    var sortedEvents = __spreadArray([], eventsData_1.eventsData, true).sort(function (a, b) {
        return (0, date_fns_1.parseISO)(a.date).getTime() - (0, date_fns_1.parseISO)(b.date).getTime();
    });
    return ((0, jsx_runtime_1.jsxs)(shared_1.PageContainer, __assign({ pt: isMobile ? 12 : 24, pb: 12, spacing: 8, sx: { overflowY: 'auto' } }, { children: [(0, jsx_runtime_1.jsxs)(shared_1.PageHeader, __assign({ spacing: 4, alignSelf: "center", maxWidth: "800px" }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h6", textAlign: "center", sx: { opacity: 0.7 } }, { children: "Come Meet Us" })), (0, jsx_runtime_1.jsx)(shared_1.GlowText, __assign({ variant: "h1", textAlign: "center", sx: {
                            fontSize: isMobile ? '3rem' : '4rem',
                            fontWeight: 'bold'
                        } }, { children: "Upcoming Events" })), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "body1", textAlign: "center", color: "text.secondary", sx: { fontSize: '1.1rem', lineHeight: 1.6 }, width: { xs: '90%' }, alignSelf: "center" }, { children: "Join the 808s & Mixtapes team at these upcoming events. From live podcast recordings to music festivals, we're always looking to connect with our community and share great music." }))] })), (0, jsx_runtime_1.jsx)(Box_1.default, __assign({ sx: { width: '100%', px: isMobile ? 2 : 8 } }, { children: (0, jsx_runtime_1.jsx)(Grid_1.default, __assign({ container: true, spacing: 4, justifyContent: "center", alignItems: "stretch" }, { children: sortedEvents.map(function (event) {
                        var teamMembers = getTeamMembers(event.teamMembers);
                        var formattedDate = (0, date_fns_1.format)((0, date_fns_1.parseISO)(event.date), 'MMMM d, yyyy');
                        return ((0, jsx_runtime_1.jsx)(Grid_1.default, __assign({ item: true, xs: 12, sm: 10, md: 6, lg: 4, sx: {
                                display: 'flex',
                                justifyContent: 'center'
                            } }, { children: (0, jsx_runtime_1.jsxs)(EventCard, { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, __assign({ sx: { position: 'relative' } }, { children: [(0, jsx_runtime_1.jsx)(EventImage, { src: event.imageUrl, alt: event.name }), (0, jsx_runtime_1.jsx)(EventTypeChip, { label: event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1), color: "primary" })] })), (0, jsx_runtime_1.jsxs)(Box_1.default, __assign({ sx: { p: 2, flex: 1, display: 'flex', flexDirection: 'column' } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h5", gutterBottom: true }, { children: event.name })), (0, jsx_runtime_1.jsxs)(Stack_1.default, __assign({ spacing: 2, sx: { mb: 2 } }, { children: [(0, jsx_runtime_1.jsxs)(InfoRow, __assign({ direction: "row" }, { children: [(0, jsx_runtime_1.jsx)(CalendarToday_1.default, { fontSize: "small" }), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "body2" }, { children: formattedDate }))] })), (0, jsx_runtime_1.jsxs)(InfoRow, __assign({ direction: "row" }, { children: [(0, jsx_runtime_1.jsx)(AccessTime_1.default, { fontSize: "small" }), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "body2" }, { children: event.time }))] })), (0, jsx_runtime_1.jsxs)(InfoRow, __assign({ direction: "row" }, { children: [(0, jsx_runtime_1.jsx)(LocationOn_1.default, { fontSize: "small" }), (0, jsx_runtime_1.jsxs)(Typography_1.default, __assign({ variant: "body2" }, { children: [event.location.venue, ", ", event.location.city] }))] }))] })), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "body1", paragraph: true }, { children: event.description })), (0, jsx_runtime_1.jsxs)(Box_1.default, __assign({ sx: { mt: 2, mb: 3 } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "subtitle2", gutterBottom: true }, { children: "Team Members Attending:" })), (0, jsx_runtime_1.jsx)(AvatarGroup_1.default, __assign({ max: 4, sx: { justifyContent: 'flex-start' } }, { children: teamMembers.map(function (member) { return ((0, jsx_runtime_1.jsx)(Avatar_1.default, { alt: member.name, src: member.avatar, sx: { width: 32, height: 32 } }, member.id)); }) }))] })), (0, jsx_runtime_1.jsxs)(Stack_1.default, __assign({ direction: "row", spacing: 2, sx: { mt: 'auto' } }, { children: [event.ticketUrl && ((0, jsx_runtime_1.jsx)(PrimaryButton_1.default, { title: "Get Tickets", onClick: function () { return handleTicketClick(event.ticketUrl); }, fullWidth: true })), event.rsvpUrl && ((0, jsx_runtime_1.jsx)(PrimaryButton_1.default, { title: "RSVP", onClick: function () { return handleRSVPClick(event.rsvpUrl); }, fullWidth: true }))] }))] }))] }) }), event.id));
                    }) })) }))] })));
};
exports.default = Events;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
