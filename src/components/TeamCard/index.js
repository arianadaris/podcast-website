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
var react_router_dom_1 = require("react-router-dom");
var styles_1 = require("@mui/material/styles");
var Card = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    background: rgba(255, 255, 255, 0.05);\n    border-radius: 10px;\n    padding: 1.5rem;\n    text-align: center;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    \n    &:hover {\n        transform: translateY(-5px);\n        background: rgba(255, 255, 255, 0.1);\n        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);\n    }\n"], ["\n    background: rgba(255, 255, 255, 0.05);\n    border-radius: 10px;\n    padding: 1.5rem;\n    text-align: center;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    \n    &:hover {\n        transform: translateY(-5px);\n        background: rgba(255, 255, 255, 0.1);\n        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);\n    }\n"])));
var Avatar = styled_components_1.default.img(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width: 150px;\n    height: 150px;\n    border-radius: 50%;\n    margin-bottom: 1rem;\n    border: 3px solid ", ";\n    object-fit: cover;\n"], ["\n    width: 150px;\n    height: 150px;\n    border-radius: 50%;\n    margin-bottom: 1rem;\n    border: 3px solid ", ";\n    object-fit: cover;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.primary.main;
});
var Name = styled_components_1.default.h3(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    margin: 0;\n    color: ", ";\n    font-size: 1.5rem;\n"], ["\n    margin: 0;\n    color: ", ";\n    font-size: 1.5rem;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.text.primary;
});
var Role = styled_components_1.default.p(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    margin: 0.5rem 0 0;\n    color: ", ";\n    font-size: 1rem;\n"], ["\n    margin: 0.5rem 0 0;\n    color: ", ";\n    font-size: 1rem;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.primary.main;
});
var TeamCard = function (_a) {
    var name = _a.name, role = _a.role, image = _a.image, slug = _a.slug;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var theme = (0, styles_1.useTheme)();
    var handleClick = function () {
        navigate("/about/".concat(slug));
    };
    return ((0, jsx_runtime_1.jsxs)(Card, __assign({ onClick: handleClick }, { children: [(0, jsx_runtime_1.jsx)(Avatar, { src: image, alt: name, theme: theme }), (0, jsx_runtime_1.jsx)(Name, __assign({ theme: theme }, { children: name })), (0, jsx_runtime_1.jsx)(Role, __assign({ theme: theme }, { children: role }))] })));
};
exports.default = TeamCard;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
