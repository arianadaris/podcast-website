import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import PrimaryButton from '@/components/PrimaryButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const MailingListForm = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const initialValues = {
        name: '',
        email: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
    });

    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Stack direction={isMobile ? 'column' : 'row'} spacing={4}>
                        <Field
                            name="name"
                            as={TextField}
                            label="Name"
                            variant="outlined"
                            fullWidth
                            helpertext={<ErrorMessage name="name" />}
                        />
                        <Field
                            name="email"
                            as={TextField}
                            label="Email"
                            variant="outlined"
                            fullWidth
                            helpertext={<ErrorMessage name="email" />}
                        />
                        <Stack width="100%">
                            <PrimaryButton title="Join" disabled={isSubmitting} center={isMobile} />
                        </Stack>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};

export default MailingListForm;