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
var Card_1 = __importDefault(require("@mui/material/Card"));
var CardContent_1 = __importDefault(require("@mui/material/CardContent"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var Grid_1 = __importDefault(require("@mui/material/Grid"));
var Truncate_1 = __importDefault(require("@/components/Truncate"));
var Stack_1 = __importDefault(require("@mui/material/Stack"));
var PlayArrow_1 = __importDefault(require("@mui/icons-material/PlayArrow"));
var CalendarToday_1 = __importDefault(require("@mui/icons-material/CalendarToday"));
var AccessTime_1 = __importDefault(require("@mui/icons-material/AccessTime"));
var Button_1 = __importDefault(require("@/components/Button"));
var styles_1 = require("@mui/material/styles");
var useMediaQuery_1 = __importDefault(require("@mui/material/useMediaQuery"));
var StyledImage = styled_components_1.default.img(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    border-radius: 10px;\n    width: 100%;\n    max-width: 200px;\n"], ["\n    border-radius: 10px;\n    width: 100%;\n    max-width: 200px;\n"])));
var EpisodeCard = function (_a) {
    var episode = _a.episode;
    var id = episode.id, imageUrl = episode.imageUrl, title = episode.title, description = episode.description, releaseDate = episode.releaseDate, duration = episode.duration, audioUrl = episode.audioUrl;
    var episodeNumber = id.toString().padStart(2, '0');
    var theme = (0, styles_1.useTheme)();
    var isMobile = (0, useMediaQuery_1.default)(theme.breakpoints.down('md'));
    var handleClick = function () {
        window.open(audioUrl, '_blank');
    };
    return ((0, jsx_runtime_1.jsx)(Card_1.default, { children: (0, jsx_runtime_1.jsx)(CardContent_1.default, { children: (0, jsx_runtime_1.jsxs)(Grid_1.default, __assign({ container: true, spacing: isMobile ? 4 : 8, sx: { px: isMobile ? 2 : 8 } }, { children: [(0, jsx_runtime_1.jsx)(Grid_1.default, __assign({ item: true, xs: 12, sm: isMobile ? 12 : 2, display: "flex", alignItems: "center", justifyContent: "center" }, { children: (0, jsx_runtime_1.jsx)(StyledImage, { src: imageUrl, alt: "Episode Cover" }) })), (0, jsx_runtime_1.jsx)(Grid_1.default, __assign({ item: true, xs: 12, sm: isMobile ? 12 : 9, display: "flex", alignItems: "flex-start", sx: { py: 1 } }, { children: (0, jsx_runtime_1.jsxs)(Stack_1.default, __assign({ spacing: 2, width: "100%" }, { children: [isMobile && ((0, jsx_runtime_1.jsxs)(Typography_1.default, __assign({ variant: "h2", color: "text.primary", align: "center" }, { children: [episodeNumber, "."] }))), (0, jsx_runtime_1.jsxs)(Stack_1.default, __assign({ direction: isMobile ? "column" : "row", spacing: 4, alignItems: isMobile ? "center" : "flex-start" }, { children: [(0, jsx_runtime_1.jsxs)(Stack_1.default, __assign({ direction: "row", spacing: 2, alignItems: "center" }, { children: [(0, jsx_runtime_1.jsx)(CalendarToday_1.default, { color: "secondary", sx: { fontSize: 28 } }), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "body2", color: "text.secondary", noWrap: true }, { children: releaseDate }))] })), (0, jsx_runtime_1.jsxs)(Stack_1.default, __assign({ direction: "row", spacing: 2, alignItems: "center" }, { children: [(0, jsx_runtime_1.jsx)(AccessTime_1.default, { color: "secondary", sx: { fontSize: 28 } }), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "body2", color: "text.secondary", noWrap: true }, { children: duration }))] }))] })), (0, jsx_runtime_1.jsx)(Truncate_1.default, __assign({ variant: "h6", color: "text.primary", align: isMobile ? "center" : "left" }, { children: title })), (0, jsx_runtime_1.jsx)(Typography_1.default, { variant: "body1", color: "text.primary", dangerouslySetInnerHTML: { __html: description }, align: isMobile ? "center" : "left", sx: { mb: 2 } }), (0, jsx_runtime_1.jsx)(Button_1.default, __assign({ label: "Listen Now", onClick: handleClick, sx: { alignSelf: isMobile ? "center" : "flex-start" } }, { children: (0, jsx_runtime_1.jsx)(PlayArrow_1.default, { sx: { color: 'white' } }) }))] })) }))] })) }) }));
};
exports.default = EpisodeCard;
var templateObject_1;
