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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeMode = exports.ThemeCtxProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var react_1 = require("react");
var ThemeCtx = (0, react_1.createContext)(null);
// Creates a new context object
function ThemeCtxProvider(_a) {
    var children = _a.children;
    // check whether the client's system has enabled dark theme
    // if enabled then, use dark theme by default
    var prefersDarkMode = (0, material_1.useMediaQuery)("(prefers-color-scheme: dark)");
    // state variable to check wheather dark mode is enabled or not
    var _b = (0, react_1.useState)(false), darkMode = _b[0], setDarkMode = _b[1];
    (0, react_1.useEffect)(function () {
        if (localStorage.getItem('theme') === "dark") {
            // if user has opted for dark theme
            // then set the value of darkMode as true
            setDarkMode(true);
        }
        else if (localStorage.getItem('theme') === "light") {
            // if user has opted for light theme
            // then set the value of darkMode as false
            setDarkMode(false);
        }
        else {
            // if there is nothing in the local storage
            // then, use the system theme by default
            setDarkMode(prefersDarkMode);
        }
    }, [prefersDarkMode]);
    // toggle the theme function
    var handleDarkMode = function () {
        if (darkMode) {
            // if dark theme is enabled,
            // then disable it and select the light theme
            localStorage.setItem('theme', "light");
            setDarkMode(false);
        }
        else {
            // if dark theme is disabled,
            // then enable it and select the dark theme
            localStorage.setItem('theme', "dark");
            setDarkMode(true);
        }
    };
    // return the, Provider component that allows the
    // consuming components to subscribe to context
    // changes.
    return ((0, jsx_runtime_1.jsx)(ThemeCtx.Provider, __assign({ value: { darkMode: darkMode, handleDarkMode: handleDarkMode } }, { children: children })));
}
exports.ThemeCtxProvider = ThemeCtxProvider;
function useThemeMode() {
    // return the current context value for themeCtx
    // i.e. darkMode and handleDarkMode
    return (0, react_1.useContext)(ThemeCtx);
}
exports.useThemeMode = useThemeMode;
