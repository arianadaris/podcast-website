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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var Tabs_1 = __importDefault(require("@mui/material/Tabs"));
var Tab_1 = __importDefault(require("@mui/material/Tab"));
var Box_1 = __importDefault(require("@mui/material/Box"));
var react_1 = require("react");
var styles_1 = require("@mui/material/styles");
var react_router_dom_1 = require("react-router-dom");
var StyledTextField = (0, styles_1.styled)(TextField_1.default)(function (_a) {
    var theme = _a.theme;
    return ({
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.23)',
            },
            '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
            },
        },
        '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
        },
        '& .MuiInputBase-input': {
            color: theme.palette.text.primary,
        },
    });
});
var TabPanel = function (props) {
    var children = props.children, value = props.value, index = props.index, other = __rest(props, ["children", "value", "index"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ role: "tabpanel", hidden: value !== index, id: "contact-tabpanel-".concat(index), "aria-labelledby": "contact-tab-".concat(index) }, other, { children: value === index && (0, jsx_runtime_1.jsx)(Box_1.default, __assign({ sx: { pt: 3 } }, { children: children })) })));
};
var generalValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    message: Yup.string().required('Message is required'),
});
var interviewValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    socials: Yup.string().required('Social media links are required'),
    music: Yup.string().required('Music links are required'),
    interviewBlurb: Yup.string()
        .min(100, 'Please provide at least 100 characters')
        .required('Interview blurb is required'),
    preferredDates: Yup.string().required('Please provide some preferred dates'),
    message: Yup.string().required('Message is required'),
});
var ContactForm = function () {
    var searchParams = (0, react_router_dom_1.useSearchParams)()[0];
    var _a = (0, react_1.useState)(0), tabValue = _a[0], setTabValue = _a[1];
    (0, react_1.useEffect)(function () {
        // Set tab to interview if URL parameter is present
        if (searchParams.get('tab') === 'interview') {
            setTabValue(1);
        }
    }, [searchParams]);
    var handleTabChange = function (event, newValue) {
        setTabValue(newValue);
    };
    var handleSubmit = function (values) {
        console.log(values);
        // Handle form submission
    };
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, __assign({ sx: { width: '100%' } }, { children: [(0, jsx_runtime_1.jsx)(Box_1.default, __assign({ sx: { borderBottom: 1, borderColor: 'divider' } }, { children: (0, jsx_runtime_1.jsxs)(Tabs_1.default, __assign({ value: tabValue, onChange: handleTabChange, variant: "fullWidth", textColor: "primary", indicatorColor: "primary" }, { children: [(0, jsx_runtime_1.jsx)(Tab_1.default, { label: "General Contact" }), (0, jsx_runtime_1.jsx)(Tab_1.default, { label: "Book Interview" })] })) })), (0, jsx_runtime_1.jsx)(TabPanel, __assign({ value: tabValue, index: 0 }, { children: (0, jsx_runtime_1.jsx)(formik_1.Formik, __assign({ initialValues: {
                        name: '',
                        email: '',
                        message: '',
                    }, validationSchema: generalValidationSchema, onSubmit: handleSubmit }, { children: function (_a) {
                        var isSubmitting = _a.isSubmitting, errors = _a.errors, touched = _a.touched, handleChange = _a.handleChange, handleBlur = _a.handleBlur;
                        return ((0, jsx_runtime_1.jsx)(formik_1.Form, { children: (0, jsx_runtime_1.jsxs)(Stack_1.default, __assign({ spacing: 3 }, { children: [(0, jsx_runtime_1.jsx)(StyledTextField, { name: "name", label: "Name", fullWidth: true, onChange: handleChange, onBlur: handleBlur, error: touched.name && Boolean(errors.name), helperText: touched.name && errors.name }), (0, jsx_runtime_1.jsx)(StyledTextField, { name: "email", label: "Email", fullWidth: true, onChange: handleChange, onBlur: handleBlur, error: touched.email && Boolean(errors.email), helperText: touched.email && errors.email }), (0, jsx_runtime_1.jsx)(StyledTextField, { name: "message", label: "Message", multiline: true, rows: 4, fullWidth: true, onChange: handleChange, onBlur: handleBlur, error: touched.message && Boolean(errors.message), helperText: touched.message && errors.message }), (0, jsx_runtime_1.jsx)(PrimaryButton_1.default, { title: "Send Message", disabled: isSubmitting, center: true })] })) }));
                    } })) })), (0, jsx_runtime_1.jsx)(TabPanel, __assign({ value: tabValue, index: 1 }, { children: (0, jsx_runtime_1.jsx)(formik_1.Formik, __assign({ initialValues: {
                        name: '',
                        email: '',
                        socials: '',
                        music: '',
                        interviewBlurb: '',
                        preferredDates: '',
                        message: '',
                    }, validationSchema: interviewValidationSchema, onSubmit: handleSubmit }, { children: function (_a) {
                        var isSubmitting = _a.isSubmitting, errors = _a.errors, touched = _a.touched, handleChange = _a.handleChange, handleBlur = _a.handleBlur;
                        return ((0, jsx_runtime_1.jsx)(formik_1.Form, { children: (0, jsx_runtime_1.jsxs)(Stack_1.default, __assign({ spacing: 3 }, { children: [(0, jsx_runtime_1.jsx)(StyledTextField, { name: "name", label: "Name", fullWidth: true, onChange: handleChange, onBlur: handleBlur, error: touched.name && Boolean(errors.name), helperText: touched.name && errors.name }), (0, jsx_runtime_1.jsx)(StyledTextField, { name: "email", label: "Email", fullWidth: true, onChange: handleChange, onBlur: handleBlur, error: touched.email && Boolean(errors.email), helperText: touched.email && errors.email }), (0, jsx_runtime_1.jsx)(StyledTextField, { name: "socials", label: "Social Media Links", fullWidth: true, multiline: true, rows: 2, placeholder: "Instagram, Twitter, Facebook, etc.", onChange: handleChange, onBlur: handleBlur, error: touched.socials && Boolean(errors.socials), helperText: touched.socials && errors.socials }), (0, jsx_runtime_1.jsx)(StyledTextField, { name: "music", label: "Music Links", fullWidth: true, multiline: true, rows: 2, placeholder: "Spotify, SoundCloud, YouTube, etc.", onChange: handleChange, onBlur: handleBlur, error: touched.music && Boolean(errors.music), helperText: touched.music && errors.music }), (0, jsx_runtime_1.jsx)(StyledTextField, { name: "interviewBlurb", label: "Tell us about yourself", fullWidth: true, multiline: true, rows: 4, placeholder: "Share your story, music journey, and why you'd like to be interviewed", onChange: handleChange, onBlur: handleBlur, error: touched.interviewBlurb && Boolean(errors.interviewBlurb), helperText: touched.interviewBlurb && errors.interviewBlurb }), (0, jsx_runtime_1.jsx)(StyledTextField, { name: "preferredDates", label: "Preferred Interview Dates", fullWidth: true, multiline: true, rows: 2, placeholder: "List a few dates that work best for you (e.g., 'Any weekday evening in July, or July 15th, 16th, or 20th')", onChange: handleChange, onBlur: handleBlur, error: touched.preferredDates && Boolean(errors.preferredDates), helperText: touched.preferredDates && errors.preferredDates }), (0, jsx_runtime_1.jsx)(StyledTextField, { name: "message", label: "Additional Message", multiline: true, rows: 4, fullWidth: true, onChange: handleChange, onBlur: handleBlur, error: touched.message && Boolean(errors.message), helperText: touched.message && errors.message }), (0, jsx_runtime_1.jsx)(PrimaryButton_1.default, { title: "Submit Interview Request", disabled: isSubmitting, center: true })] })) }));
                    } })) }))] })));
};
exports.default = ContactForm;
