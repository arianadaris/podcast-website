import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import PrimaryButton from '@/components/PrimaryButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useSearchParams } from 'react-router-dom';

const StyledTextField = styled(TextField)(({ theme }) => ({
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
}));

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`contact-tabpanel-${index}`}
            aria-labelledby={`contact-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </div>
    );
};

const generalValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    message: Yup.string().required('Message is required'),
});

const interviewValidationSchema = Yup.object({
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

const ContactForm = () => {
    const [searchParams] = useSearchParams();
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        // Set tab to interview if URL parameter is present
        if (searchParams.get('tab') === 'interview') {
            setTabValue(1);
        }
    }, [searchParams]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleSubmit = (values: any) => {
        console.log(values);
        // Handle form submission
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                    value={tabValue} 
                    onChange={handleTabChange} 
                    variant="fullWidth"
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab label="General Contact" />
                    <Tab label="Book Interview" />
                </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        message: '',
                    }}
                    validationSchema={generalValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched, handleChange, handleBlur }) => (
                        <Form>
                            <Stack spacing={3}>
                                <StyledTextField
                                    name="name"
                                    label="Name"
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                                <StyledTextField
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                                <StyledTextField
                                    name="message"
                                    label="Message"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.message && Boolean(errors.message)}
                                    helperText={touched.message && errors.message}
                                />
                                <PrimaryButton 
                                    title="Send Message" 
                                    disabled={isSubmitting} 
                                    center={true}
                                />
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        socials: '',
                        music: '',
                        interviewBlurb: '',
                        preferredDates: '',
                        message: '',
                    }}
                    validationSchema={interviewValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched, handleChange, handleBlur }) => (
                        <Form>
                            <Stack spacing={3}>
                                <StyledTextField
                                    name="name"
                                    label="Name"
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                                <StyledTextField
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                                <StyledTextField
                                    name="socials"
                                    label="Social Media Links"
                                    fullWidth
                                    multiline
                                    rows={2}
                                    placeholder="Instagram, Twitter, Facebook, etc."
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.socials && Boolean(errors.socials)}
                                    helperText={touched.socials && errors.socials}
                                />
                                <StyledTextField
                                    name="music"
                                    label="Music Links"
                                    fullWidth
                                    multiline
                                    rows={2}
                                    placeholder="Spotify, SoundCloud, YouTube, etc."
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.music && Boolean(errors.music)}
                                    helperText={touched.music && errors.music}
                                />
                                <StyledTextField
                                    name="interviewBlurb"
                                    label="Tell us about yourself"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Share your story, music journey, and why you'd like to be interviewed"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.interviewBlurb && Boolean(errors.interviewBlurb)}
                                    helperText={touched.interviewBlurb && errors.interviewBlurb}
                                />
                                <StyledTextField
                                    name="preferredDates"
                                    label="Preferred Interview Dates"
                                    fullWidth
                                    multiline
                                    rows={2}
                                    placeholder="List a few dates that work best for you (e.g., 'Any weekday evening in July, or July 15th, 16th, or 20th')"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.preferredDates && Boolean(errors.preferredDates)}
                                    helperText={touched.preferredDates && errors.preferredDates}
                                />
                                <StyledTextField
                                    name="message"
                                    label="Additional Message"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.message && Boolean(errors.message)}
                                    helperText={touched.message && errors.message}
                                />
                                <PrimaryButton 
                                    title="Book Interview" 
                                    disabled={isSubmitting} 
                                    center={true}
                                />
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </TabPanel>
        </Box>
    );
};

export default ContactForm;