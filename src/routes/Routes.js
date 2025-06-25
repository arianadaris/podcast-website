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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Spinner_1 = __importDefault(require("@/components/Spinner"));
var PageTitleUpdater_1 = __importDefault(require("./PageTitleUpdater"));
var TeamMemberDetail_1 = __importDefault(require("../views/About/TeamMemberDetail"));
var Home = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require('@/views/Home')); }); });
var About = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require('@/views/About')); }); });
var Episodes = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require('@/views/Episodes')); }); });
var Error = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require('@/views/Error')); }); });
var Contact = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require('@/views/Contact')); }); });
var Interviews = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require('@/views/Interviews')); }); });
var Events = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require('@/views/Events')); }); });
var AppRoutes = function () {
    return ((0, jsx_runtime_1.jsxs)(react_1.Suspense, __assign({ fallback: (0, jsx_runtime_1.jsx)(Spinner_1.default, {}) }, { children: [(0, jsx_runtime_1.jsx)(PageTitleUpdater_1.default, {}), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(Home, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/about", element: (0, jsx_runtime_1.jsx)(About, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/about/:slug", element: (0, jsx_runtime_1.jsx)(TeamMemberDetail_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/episodes", element: (0, jsx_runtime_1.jsx)(Episodes, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/media/interviews", element: (0, jsx_runtime_1.jsx)(Interviews, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/media/events", element: (0, jsx_runtime_1.jsx)(Events, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/contact", element: (0, jsx_runtime_1.jsx)(Contact, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "*", element: (0, jsx_runtime_1.jsx)(Error, {}) })] })] })));
};
exports.default = AppRoutes;
