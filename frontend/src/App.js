import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import ProtectedLayout from "layout/ProtectedLayout";
import Home from "pages/Home";
import Login from "pages/Login";
import Profile from "pages/Profile";
import Root from "pages/Root";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import { themeSetting } from "theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSetting(mode)), [mode]);


  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<ProtectedLayout><Root /></ProtectedLayout>} errorElement={<Navigate to="/" />} >
          <Route index={true} element={<ProtectedLayout><Home /></ProtectedLayout>} /> 
          <Route path="/home" element={<ProtectedLayout><Home /></ProtectedLayout>} />
          <Route path="/profile" element={<ProtectedLayout><Profile /></ProtectedLayout>} />
        </Route>

        <Route path="/login" element={<ProtectedLayout login><Login /></ProtectedLayout >} />
      </>
    )
  )
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
