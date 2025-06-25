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
var PlayArrow_1 = __importDefault(require("@mui/icons-material/PlayArrow"));
var Stack_1 = __importDefault(require("@mui/material/Stack"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var styled_components_1 = __importDefault(require("styled-components"));
var Grid_1 = __importDefault(require("@mui/material/Grid"));
var Truncate_1 = __importDefault(require("@/components/Truncate"));
var StyledStack = (0, styled_components_1.default)(Stack_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    transition: 0.15s ease all;\n    cursor: pointer;\n    border-radius: 10px;\n\n    &:hover {\n        background-color: rgba(255, 255, 255, 0.1);\n    }\n"], ["\n    transition: 0.15s ease all;\n    cursor: pointer;\n    border-radius: 10px;\n\n    &:hover {\n        background-color: rgba(255, 255, 255, 0.1);\n    }\n"])));
var StyledImage = styled_components_1.default.img(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    border-radius: 10px;\n"], ["\n    border-radius: 10px;\n"])));
var EpisodeTile = function (_a) {
    var episode = _a.episode;
    var id = episode.id, imageUrl = episode.imageUrl, title = episode.title, releaseDate = episode.releaseDate, audioUrl = episode.audioUrl;
    var episodeNumber = id.toString().padStart(2, '0');
    return ((0, jsx_runtime_1.jsx)(StyledStack, { children: (0, jsx_runtime_1.jsxs)(Grid_1.default, __assign({ container: true, spacing: 2, alignItems: "center", sx: { px: 2 } }, { children: [(0, jsx_runtime_1.jsx)(Grid_1.default, __assign({ item: true, xs: 2, display: "flex", alignItems: "center" }, { children: (0, jsx_runtime_1.jsx)(StyledImage, { src: imageUrl, alt: "Episode Cover", width: "100%" }) })), (0, jsx_runtime_1.jsxs)(Grid_1.default, __assign({ item: true, xs: 9, display: "flex", flexDirection: "column", justifyContent: "center" }, { children: [(0, jsx_runtime_1.jsx)(Truncate_1.default, __assign({ variant: "h6", color: "text.primary", limit: 2 }, { children: title })), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "body2", color: "text.secondary", noWrap: true }, { children: releaseDate }))] })), (0, jsx_runtime_1.jsx)(Grid_1.default, __assign({ item: true, xs: 1, display: "flex", alignItems: "center", justifyContent: "center" }, { children: (0, jsx_runtime_1.jsx)(PlayArrow_1.default, {}) }))] })) }));
};
exports.default = EpisodeTile;
var templateObject_1, templateObject_2;
