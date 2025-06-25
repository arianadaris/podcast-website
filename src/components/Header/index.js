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
var Logo_1 = __importDefault(require("@/components/Logo"));
var Socials_1 = __importDefault(require("@/components/Socials"));
var styled_components_1 = __importDefault(require("styled-components"));
var Nav_1 = __importDefault(require("../Nav"));
var styles_1 = require("@mui/material/styles");
var useMediaQuery_1 = __importDefault(require("@mui/material/useMediaQuery"));
var IconButton_1 = __importDefault(require("@mui/material/IconButton"));
var Menu_1 = __importDefault(require("@mui/icons-material/Menu"));
var Close_1 = __importDefault(require("@mui/icons-material/Close"));
var KeyboardArrowDown_1 = __importDefault(require("@mui/icons-material/KeyboardArrowDown"));
var KeyboardArrowUp_1 = __importDefault(require("@mui/icons-material/KeyboardArrowUp"));
var react_1 = require("react");
var Drawer_1 = __importDefault(require("@mui/material/Drawer"));
var Box_1 = __importDefault(require("@mui/material/Box"));
var Collapse_1 = __importDefault(require("@mui/material/Collapse"));
var Button_1 = __importDefault(require("@mui/material/Button"));
var StyledHeader = (0, styled_components_1.default)(Stack_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    background-color: rgba(255, 255, 255, 0.1);\n    backdrop-filter: blur(10px);\n    border-radius: 100px;\n    z-index: 1000;\n"], ["\n    background-color: rgba(255, 255, 255, 0.1);\n    backdrop-filter: blur(10px);\n    border-radius: 100px;\n    z-index: 1000;\n"])));
var MobileNav = (0, styled_components_1.default)(Stack_1.default)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    background-color: rgba(10, 3, 30, 0.95);\n    backdrop-filter: blur(10px);\n    height: 100%;\n    padding: 2rem;\n    width: 100vw;\n"], ["\n    background-color: rgba(10, 3, 30, 0.95);\n    backdrop-filter: blur(10px);\n    height: 100%;\n    padding: 2rem;\n    width: 100vw;\n"])));
var StyledButton = (0, styled_components_1.default)(Button_1.default)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    color: white;\n    text-transform: none;\n    padding: 0.5rem;\n    width: 100%;\n    justify-content: center;\n    font-family: inherit;\n    font-size: inherit;\n\n    &:hover {\n        background-color: ", ";\n    }\n"], ["\n    color: white;\n    text-transform: none;\n    padding: 0.5rem;\n    width: 100%;\n    justify-content: center;\n    font-family: inherit;\n    font-size: inherit;\n\n    &:hover {\n        background-color: ", ";\n    }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.primary.light;
});
var Header = function () {
    var theme = (0, styles_1.useTheme)();
    var isMobile = (0, useMediaQuery_1.default)(theme.breakpoints.down('md'));
    var _a = (0, react_1.useState)(false), mobileOpen = _a[0], setMobileOpen = _a[1];
    var _b = (0, react_1.useState)(false), mediaOpen = _b[0], setMediaOpen = _b[1];
    var handleDrawerToggle = function () {
        setMobileOpen(!mobileOpen);
    };
    var handleMediaToggle = function () {
        setMediaOpen(!mediaOpen);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(StyledHeader, __assign({ direction: "row", justifyContent: "space-between", alignItems: "center", position: "fixed", width: isMobile ? "90%" : "85%", top: '1%', left: '50%', sx: { transform: 'translate(-50%, 0)' }, px: isMobile ? 2 : 4 }, { children: [(0, jsx_runtime_1.jsx)(Logo_1.default, { width: isMobile ? '5rem' : '7rem' }), isMobile ? ((0, jsx_runtime_1.jsx)(IconButton_1.default, __assign({ color: "inherit", "aria-label": mobileOpen ? "close menu" : "open menu", edge: "start", onClick: handleDrawerToggle, sx: { color: 'white' } }, { children: mobileOpen ? (0, jsx_runtime_1.jsx)(Close_1.default, {}) : (0, jsx_runtime_1.jsx)(Menu_1.default, {}) }))) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Nav_1.default, {}), (0, jsx_runtime_1.jsx)(Socials_1.default, {})] }))] })), (0, jsx_runtime_1.jsx)(Drawer_1.default, __assign({ anchor: "right", open: mobileOpen, onClose: handleDrawerToggle, ModalProps: {
                    keepMounted: true,
                }, PaperProps: {
                    sx: {
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'transparent'
                    }
                }, sx: {
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                    },
                }, transitionDuration: 400, SlideProps: {
                    direction: "left"
                } }, { children: (0, jsx_runtime_1.jsxs)(MobileNav, __assign({ spacing: 4 }, { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, __assign({ sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, px: 2 } }, { children: [(0, jsx_runtime_1.jsx)(Logo_1.default, { width: "10rem" }), (0, jsx_runtime_1.jsx)(IconButton_1.default, __assign({ onClick: handleDrawerToggle, sx: { color: 'white' } }, { children: (0, jsx_runtime_1.jsx)(Close_1.default, {}) }))] })), (0, jsx_runtime_1.jsxs)(Stack_1.default, __assign({ spacing: 4, alignItems: "center" }, { children: [(0, jsx_runtime_1.jsx)(StyledButton, __assign({ onClick: function () {
                                        handleDrawerToggle();
                                        window.location.href = '/about';
                                    }, theme: theme }, { children: "About" })), (0, jsx_runtime_1.jsx)(StyledButton, __assign({ onClick: function () {
                                        handleDrawerToggle();
                                        window.location.href = '/episodes';
                                    }, theme: theme }, { children: "Episodes" })), (0, jsx_runtime_1.jsxs)(Box_1.default, __assign({ sx: { width: '100%' } }, { children: [(0, jsx_runtime_1.jsx)(StyledButton, __assign({ onClick: handleMediaToggle, endIcon: mediaOpen ? (0, jsx_runtime_1.jsx)(KeyboardArrowUp_1.default, {}) : (0, jsx_runtime_1.jsx)(KeyboardArrowDown_1.default, {}), theme: theme }, { children: "Media" })), (0, jsx_runtime_1.jsx)(Collapse_1.default, __assign({ in: mediaOpen }, { children: (0, jsx_runtime_1.jsxs)(Stack_1.default, __assign({ spacing: 2, alignItems: "center", sx: { pt: 2 } }, { children: [(0, jsx_runtime_1.jsx)(StyledButton, __assign({ onClick: function () {
                                                            handleDrawerToggle();
                                                            window.location.href = '/media/interviews';
                                                        }, theme: theme }, { children: "Interviews" })), (0, jsx_runtime_1.jsx)(StyledButton, __assign({ onClick: function () {
                                                            handleDrawerToggle();
                                                            window.location.href = '/media/events';
                                                        }, theme: theme }, { children: "Events" })), (0, jsx_runtime_1.jsx)(StyledButton, __assign({ onClick: function () {
                                                            handleDrawerToggle();
                                                            window.location.href = '/media/projects';
                                                        }, theme: theme }, { children: "Projects" })), (0, jsx_runtime_1.jsx)(StyledButton, __assign({ onClick: function () {
                                                            handleDrawerToggle();
                                                            window.location.href = '/media/808s-on-cam';
                                                        }, theme: theme }, { children: "808s on Cam" }))] })) }))] })), (0, jsx_runtime_1.jsx)(StyledButton, __assign({ onClick: function () {
                                        handleDrawerToggle();
                                        window.location.href = '/contact';
                                    }, theme: theme }, { children: "Contact" }))] })), (0, jsx_runtime_1.jsx)(Box_1.default, __assign({ sx: { mt: 'auto', display: 'flex', justifyContent: 'center' } }, { children: (0, jsx_runtime_1.jsx)(Socials_1.default, {}) }))] })) }))] }));
};
exports.default = Header;
var templateObject_1, templateObject_2, templateObject_3;
