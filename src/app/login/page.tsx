'use client'
import { useState, useEffect } from 'react';
import { Box, TextField, Typography, CircularProgress, InputAdornment, IconButton, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signIn } from 'next-auth/react';
import { CustomButtonFilled } from '@/Components/ReusableComponents/ButtonsComponent';
import * as Yup from 'yup';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import SnackbarAlert from '@/Components/ReusableComponents/SnackbarAlerts';
import { LoginValues } from '@/types/types';

const LoginPage: React.FC = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning" | "info">("success");
    const [callbackUrl, setCallbackUrl] = useState<string>('/');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const callbackUrlFromQuery = urlParams.get('callbackUrl');
        if (callbackUrlFromQuery) {
            setCallbackUrl(callbackUrlFromQuery);
        }
    }, []);

    const validationSchema = Yup.object({
        carrierId: Yup.string().required("Carrier ID is required"),
        password: Yup.string().required("Password is required"),
    });


    const handleLogin = async (values: { carrierId: string; password: string }, { setSubmitting, setFieldError }: FormikHelpers<LoginValues>) => {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                carrierId: values.carrierId,
                password: values.password,
            });

            if (result?.error) {
                setSnackbarMessage(result?.error);
                setSnackbarSeverity("error");
                setSnackbarOpen(true);

            } else {
                window.location.href = callbackUrl;
                setSnackbarMessage("Login successful");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
            }
        } catch (err) {
            console.log(err)
            setFieldError("password", "An unexpected error occurred. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Grid sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={() => setSnackbarOpen(false)}
            />
            <Box display="flex" sx={{ height: "60vh" }}>
                <Box
                    sx={{
                        maxWidth: "400px",
                        margin: "5px",
                        padding: "30px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#ffffff",
                        alignSelf: "center",
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 600 }} align="center" marginBottom="10px" color="#83214F">
                        Login
                    </Typography>

                    <Formik
                        initialValues={{ carrierId: "", password: "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >
                        {({ errors, touched, isSubmitting, handleChange, handleBlur, values }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    label="Carrier ID"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    name="carrierId"
                                    value={values.carrierId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                error={touched.carrierId && Boolean(errors.carrierId)}
                                helperText={touched.carrierId && errors.carrierId}
                                />

                                <Field
                                    as={TextField}
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Grid sx={{ textAlign: "center", marginTop: "10px" }}>
                                    <CustomButtonFilled type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Login"}
                                    </CustomButtonFilled>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Grid>
    );
};

export default LoginPage;