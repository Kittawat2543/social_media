import { Box, Typography, useTheme, useMediaQuery } from "@mui/material"
import FormLogin from "./FormLogin";

const Login = () => {
  const theme = useTheme();
  const isNonMobileSreen = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" variant="h3" color="primary">
          SOCIAL MEDIA
        </Typography>
      </Box>

      <Box
        width={isNonMobileSreen ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor= {theme.palette.background.alt}
      >
        <Typography mb="1rem">
            Welcome to Socail Media
        </Typography>
        <FormLogin />
      </Box>
    </Box>
  );
};

export default Login;
