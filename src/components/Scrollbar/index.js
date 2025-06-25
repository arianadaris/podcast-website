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
var Box_1 = __importDefault(require("@mui/material/Box"));
var styled_components_1 = __importDefault(require("styled-components"));
var ScrollContainer = (0, styled_components_1.default)(Box_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  max-height: ", ";\n  overflow-y: auto;\n\n  /* Custom scrollbar styles */\n  scrollbar-width: thin; /* For Firefox */\n  scrollbar-color: white rgba(255, 255, 255, 0.1); /* For Firefox */\n  \n\n  /* For WebKit browsers (Chrome, Safari) */\n  ::-webkit-scrollbar {\n    width: 8px;\n  }\n\n  ::-webkit-scrollbar-track {\n    background: rgba(255, 255, 255, 0.1);\n    box-shadow: inset 0 0 5px grey; \n    border-radius: 10px;\n  }\n\n  ::-webkit-scrollbar-thumb {\n    background-color: red;\n    border-radius: 10px;\n  }\n"], ["\n  max-height: ", ";\n  overflow-y: auto;\n\n  /* Custom scrollbar styles */\n  scrollbar-width: thin; /* For Firefox */\n  scrollbar-color: white rgba(255, 255, 255, 0.1); /* For Firefox */\n  \n\n  /* For WebKit browsers (Chrome, Safari) */\n  ::-webkit-scrollbar {\n    width: 8px;\n  }\n\n  ::-webkit-scrollbar-track {\n    background: rgba(255, 255, 255, 0.1);\n    box-shadow: inset 0 0 5px grey; \n    border-radius: 10px;\n  }\n\n  ::-webkit-scrollbar-thumb {\n    background-color: red;\n    border-radius: 10px;\n  }\n"])), function (props) { return props.maxHeight; });
var CustomScrollbar = function (_a) {
    var children = _a.children, _b = _a.maxHeight, maxHeight = _b === void 0 ? '100%' : _b;
    return (0, jsx_runtime_1.jsx)(ScrollContainer, __assign({ maxHeight: maxHeight }, { children: children }));
};
exports.default = CustomScrollbar;
var templateObject_1;
