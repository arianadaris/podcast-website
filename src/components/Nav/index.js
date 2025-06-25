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
var Stack_1 = __importDefault(require("@mui/material/Stack"));
var styled_components_1 = __importDefault(require("styled-components"));
var react_1 = require("react");
var Menu_1 = __importDefault(require("@mui/material/Menu"));
var MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
var Button_1 = __importDefault(require("@mui/material/Button"));
var KeyboardArrowDown_1 = __importDefault(require("@mui/icons-material/KeyboardArrowDown"));
var KeyboardArrowUp_1 = __importDefault(require("@mui/icons-material/KeyboardArrowUp"));
var styles_1 = require("@mui/material/styles");
var react_router_dom_1 = require("react-router-dom");
var StyledNav = (0, styled_components_1.default)(Stack_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    border-radius: 100px;\n    border-color: rgba(255, 255, 255, 0.1);\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 100px;\n"], ["\n    border-radius: 100px;\n    border-color: rgba(255, 255, 255, 0.1);\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 100px;\n"])));
var StyledButton = (0, styled_components_1.default)(Button_1.default)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    color: white;\n    text-transform: none;\n    padding: 0.5rem;\n    border-radius: 100px;\n    min-width: 0;\n    font-family: inherit;\n    font-size: inherit;\n\n    &:hover {\n        background-color: ", ";\n    }\n"], ["\n    color: white;\n    text-transform: none;\n    padding: 0.5rem;\n    border-radius: 100px;\n    min-width: 0;\n    font-family: inherit;\n    font-size: inherit;\n\n    &:hover {\n        background-color: ", ";\n    }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.primary.light;
});
var Nav = function () {
    var _a = (0, react_1.useState)(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var theme = (0, styles_1.useTheme)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    var open = Boolean(anchorEl);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    var handleMenuItemClick = function (path) {
        navigate(path);
        handleClose();
    };
    var handleNavClick = function (path) {
        navigate(path);
    };
    return ((0, jsx_runtime_1.jsxs)(StyledNav, __assign({ direction: "row", spacing: 8, px: 4, py: 1 }, { children: [(0, jsx_runtime_1.jsx)(StyledButton, __assign({ onClick: function () { return handleNavClick('/about'); }, theme: theme }, { children: "About" })), (0, jsx_runtime_1.jsx)(StyledButton, __assign({ onClick: function () { return handleNavClick('/episodes'); }, theme: theme }, { children: "Episodes" })), (0, jsx_runtime_1.jsx)(StyledButton, __assign({ id: "media-button", "aria-controls": open ? 'media-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick, endIcon: open ? (0, jsx_runtime_1.jsx)(KeyboardArrowUp_1.default, {}) : (0, jsx_runtime_1.jsx)(KeyboardArrowDown_1.default, {}), theme: theme }, { children: "Media" })), (0, jsx_runtime_1.jsxs)(Menu_1.default, __assign({ id: "media-menu", anchorEl: anchorEl, open: open, onClose: handleClose, MenuListProps: {
                    'aria-labelledby': 'media-button',
                }, sx: {
                    '& .MuiPaper-root': {
                        backgroundColor: 'rgba(10, 3, 30, 0.95)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '20px',
                        marginTop: '0.5rem',
                        minWidth: '160px',
                    },
                } }, { children: [(0, jsx_runtime_1.jsx)(MenuItem_1.default, __assign({ onClick: function () { return handleMenuItemClick('/media/interviews'); }, sx: {
                            color: 'white',
                            '&:hover': {
                                backgroundColor: theme.palette.primary.light,
                            },
                        } }, { children: "Interviews" })), (0, jsx_runtime_1.jsx)(MenuItem_1.default, __assign({ onClick: function () { return handleMenuItemClick('/media/events'); }, sx: {
                            color: 'white',
                            '&:hover': {
                                backgroundColor: theme.palette.primary.light,
                            },
                        } }, { children: "Events" })), (0, jsx_runtime_1.jsx)(MenuItem_1.default, __assign({ onClick: function () { return handleMenuItemClick('/media/projects'); }, sx: {
                            color: 'white',
                            '&:hover': {
                                backgroundColor: theme.palette.primary.light,
                            },
                        } }, { children: "Projects" })), (0, jsx_runtime_1.jsx)(MenuItem_1.default, __assign({ onClick: function () { return handleMenuItemClick('/media/808s-on-cam'); }, sx: {
                            color: 'white',
                            '&:hover': {
                                backgroundColor: theme.palette.primary.light,
                            },
                        } }, { children: "808s on Cam" }))] })), (0, jsx_runtime_1.jsx)(StyledButton, __assign({ onClick: function () { return handleNavClick('/contact'); }, theme: theme }, { children: "Contact" }))] })));
};
exports.default = Nav;
var templateObject_1, templateObject_2;
