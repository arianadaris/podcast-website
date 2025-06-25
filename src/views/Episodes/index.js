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
var Stack_1 = __importDefault(require("@mui/material/Stack"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var rssService_1 = require("@/services/rssService");
var EpisodeCard_1 = __importDefault(require("@/components/EpisodeCard"));
var react_1 = require("react");
var Pagination_1 = __importDefault(require("@mui/material/Pagination"));
var BackToTopButton_1 = __importDefault(require("@/components/BackToTopButton"));
var TextField_1 = __importDefault(require("@mui/material/TextField"));
var InputAdornment_1 = __importDefault(require("@mui/material/InputAdornment"));
var Search_1 = __importDefault(require("@mui/icons-material/Search"));
var styles_1 = require("@mui/material/styles");
var useMediaQuery_1 = __importDefault(require("@mui/material/useMediaQuery"));
var shared_1 = require("@/themes/shared");
var styles_2 = require("@mui/material/styles");
var Episodes = function () {
    var _a;
    var _b = (0, react_1.useState)(1), page = _b[0], setPage = _b[1];
    var _c = (0, react_1.useState)(''), searchTerm = _c[0], setSearchTerm = _c[1];
    var episodesPerPage = 10;
    var theme = (0, styles_1.useTheme)();
    var isMobile = (0, useMediaQuery_1.default)(theme.breakpoints.down('md'));
    var episodes = (0, rssService_1.useGetEpisodes)().data;
    (0, react_1.useEffect)(function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [page]);
    var handlePageChange = function (event, value) {
        setPage(value);
    };
    var handleSearchChange = function (event) {
        setPage(1);
        setSearchTerm(event.target.value);
    };
    var filteredEpisodes = episodes === null || episodes === void 0 ? void 0 : episodes.filter(function (episode) {
        return episode.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    var paginatedEpisodes = filteredEpisodes === null || filteredEpisodes === void 0 ? void 0 : filteredEpisodes.slice((page - 1) * episodesPerPage, page * episodesPerPage);
    return ((0, jsx_runtime_1.jsxs)(shared_1.PageContainer, __assign({ width: "100%", spacing: 8, pt: isMobile ? 16 : 24, pb: 12 }, { children: [(0, jsx_runtime_1.jsx)(BackToTopButton_1.default, {}), (0, jsx_runtime_1.jsxs)(shared_1.PageHeader, __assign({ spacing: 2, alignSelf: "center" }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h6", align: "center", sx: { opacity: 0.7 } }, { children: "Podcast Episodes" })), (0, jsx_runtime_1.jsx)(shared_1.GlowText, __assign({ variant: "h1", align: "center", sx: {
                            fontSize: isMobile ? '3rem' : '4rem',
                            fontWeight: 'bold'
                        } }, { children: "808s Episodes" }))] })), (0, jsx_runtime_1.jsx)(Stack_1.default, __assign({ spacing: 2, width: isMobile ? "90%" : "75%", alignSelf: "center" }, { children: (0, jsx_runtime_1.jsx)(shared_1.GlassContainer, { children: (0, jsx_runtime_1.jsx)(TextField_1.default, { label: "Search Episodes", variant: "outlined", fullWidth: true, value: searchTerm, onChange: handleSearchChange, InputProps: {
                            endAdornment: ((0, jsx_runtime_1.jsx)(InputAdornment_1.default, __assign({ position: "start", sx: { color: 'white' } }, { children: (0, jsx_runtime_1.jsx)(Search_1.default, {}) }))),
                            sx: {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: (0, styles_2.alpha)(theme.palette.common.white, 0.2),
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: (0, styles_2.alpha)(theme.palette.common.white, 0.3),
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: theme.palette.primary.main,
                                },
                            }
                        }, InputLabelProps: {
                            sx: {
                                color: (0, styles_2.alpha)(theme.palette.common.white, 0.7),
                            }
                        } }) }) })), (0, jsx_runtime_1.jsx)(Stack_1.default, __assign({ spacing: 4, width: isMobile ? "90%" : "75%", alignSelf: "center" }, { children: paginatedEpisodes === null || paginatedEpisodes === void 0 ? void 0 : paginatedEpisodes.map(function (episode) { return ((0, jsx_runtime_1.jsx)(EpisodeCard_1.default, { episode: episode }, episode.id)); }) })), (0, jsx_runtime_1.jsx)(Stack_1.default, __assign({ alignItems: "center" }, { children: (0, jsx_runtime_1.jsx)(Pagination_1.default, { count: Math.ceil(((_a = filteredEpisodes === null || filteredEpisodes === void 0 ? void 0 : filteredEpisodes.length) !== null && _a !== void 0 ? _a : 0) / episodesPerPage), page: page, onChange: handlePageChange, color: "primary", size: isMobile ? "small" : "medium", sx: {
                        '& .MuiPaginationItem-root': {
                            color: 'white',
                            '&.Mui-selected': {
                                backgroundColor: (0, styles_2.alpha)(theme.palette.primary.main, 0.2),
                            },
                            '&:hover': {
                                backgroundColor: (0, styles_2.alpha)(theme.palette.primary.main, 0.1),
                            }
                        }
                    } }) }))] })));
};
exports.default = Episodes;
