"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var react_query_1 = require("@tanstack/react-query");
var react_query_devtools_1 = require("@tanstack/react-query-devtools");
var queryClient_1 = __importDefault(require("@/config/queryClient"));
var Spinner_1 = __importDefault(require("@/components/Spinner"));
// Error boundary component
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { hasError: false };
        return _this;
    }
    ErrorBoundary.getDerivedStateFromError = function () {
        return { hasError: true };
    };
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        console.error('Application Error:', error, errorInfo);
    };
    ErrorBoundary.prototype.render = function () {
        if (this.state.hasError) {
            return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: {
                    padding: '20px',
                    textAlign: 'center',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                } }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Something went wrong" }), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: function () { return window.location.reload(); }, style: {
                            padding: '10px 20px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: '#1976d2',
                            color: 'white'
                        } }, { children: "Reload Application" }))] })));
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(react_1.Component));
// Lazy load components with prefetch
var Layout = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require('./containers/Layout')); }); });
var AppRoutes = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require('./routes/Routes')); }); });
// Loading fallback component
var LoadingFallback = (0, react_1.memo)(function () { return ((0, jsx_runtime_1.jsx)("div", __assign({ style: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    } }, { children: (0, jsx_runtime_1.jsx)(Spinner_1.default, {}) }))); });
LoadingFallback.displayName = 'LoadingFallback';
function App() {
    return ((0, jsx_runtime_1.jsx)(ErrorBoundary, { children: (0, jsx_runtime_1.jsxs)(react_query_1.QueryClientProvider, __assign({ client: queryClient_1.default }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsx)(react_1.Suspense, __assign({ fallback: (0, jsx_runtime_1.jsx)(LoadingFallback, {}) }, { children: (0, jsx_runtime_1.jsx)(Layout, { children: (0, jsx_runtime_1.jsx)(AppRoutes, {}) }) })) }), process.env.NODE_ENV === 'development' && (0, jsx_runtime_1.jsx)(react_query_devtools_1.ReactQueryDevtools, {})] })) }));
}
exports.default = (0, react_1.memo)(App);
