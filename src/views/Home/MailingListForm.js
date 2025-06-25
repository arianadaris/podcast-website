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
var formik_1 = require("formik");
var Yup = __importStar(require("yup"));
var Stack_1 = __importDefault(require("@mui/material/Stack"));
var TextField_1 = __importDefault(require("@mui/material/TextField"));
var PrimaryButton_1 = __importDefault(require("@/components/PrimaryButton"));
var styles_1 = require("@mui/material/styles");
var useMediaQuery_1 = __importDefault(require("@mui/material/useMediaQuery"));
var MailingListForm = function () {
    var theme = (0, styles_1.useTheme)();
    var isMobile = (0, useMediaQuery_1.default)(theme.breakpoints.down('md'));
    var initialValues = {
        name: '',
        email: '',
    };
    var validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
    });
    var onSubmit = function (values) {
        console.log(values);
    };
    return ((0, jsx_runtime_1.jsx)(formik_1.Formik, __assign({ initialValues: initialValues, validationSchema: validationSchema, onSubmit: onSubmit }, { children: function (_a) {
            var isSubmitting = _a.isSubmitting;
            return ((0, jsx_runtime_1.jsx)(formik_1.Form, { children: (0, jsx_runtime_1.jsxs)(Stack_1.default, __assign({ direction: isMobile ? 'column' : 'row', spacing: 4 }, { children: [(0, jsx_runtime_1.jsx)(formik_1.Field, { name: "name", as: TextField_1.default, label: "Name", variant: "outlined", fullWidth: true, helpertext: (0, jsx_runtime_1.jsx)(formik_1.ErrorMessage, { name: "name" }) }), (0, jsx_runtime_1.jsx)(formik_1.Field, { name: "email", as: TextField_1.default, label: "Email", variant: "outlined", fullWidth: true, helpertext: (0, jsx_runtime_1.jsx)(formik_1.ErrorMessage, { name: "email" }) }), (0, jsx_runtime_1.jsx)(Stack_1.default, __assign({ width: "100%" }, { children: (0, jsx_runtime_1.jsx)(PrimaryButton_1.default, { title: "Join", disabled: isSubmitting, center: isMobile }) }))] })) }));
        } })));
};
exports.default = MailingListForm;
