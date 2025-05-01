"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import ReduxProvider from "@/Store/redux-provider";
import theme from "@/theme";
import { Grid, Toolbar } from "@mui/material";
import { Session } from "next-auth";

const LayoutClientWrapper = ({ children, session }: { children: React.ReactNode; session: Session | null; }) => {

    return (
        <SessionProvider session={session}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ReduxProvider>
                    <Header />
                    <Toolbar />
                    <Grid
                        sx={{
                            marginLeft: { xs: "2px", md: "30px", },
                            padding: '10px',
                            backgroundColor: "#ffffff",
                            minHeight: "90vh",
                        }}
                    >
                        {children}
                    </Grid>
                    <Footer />
                </ReduxProvider>
            </ThemeProvider>
        </SessionProvider>
    );
};

export default LayoutClientWrapper;
