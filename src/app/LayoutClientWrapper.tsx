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
import ScrollToTop from "@/Components/ReusableComponents/ScrollToTop";
import NetworkStatusModal from "@/Components/ReusableComponents/NetworkStatus";
import { SidebarProvider } from "@/Components/context/SidebarContext";

const LayoutClientWrapper = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <ReduxProvider>
          <SidebarProvider>
            <NetworkStatusModal />

            {/* MAIN APP */}
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundColor: "#f3f4f6",
              }}
            >
              {/* HEADER */}
              <Header />

              {/* HEADER SPACING */}
              <Toolbar />

              {/* PAGE CONTENT */}
              <Grid
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  overflowX: "hidden",
                  transition: "all 0.3s ease",
                }}
              >
                <ScrollToTop />

                {/* PAGE */}
                <Grid
                  sx={{
                    flex: 1,
                    width: "100%",
                    minHeight: "calc(100vh - 64px)",
                  }}
                >
                  {children}
                </Grid>
              </Grid>

              {/* FOOTER */}
              <Footer />
            </Grid>
          </SidebarProvider>
        </ReduxProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default LayoutClientWrapper;
