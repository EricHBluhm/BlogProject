import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

const LoginPage = () => {
    const theme= useTheme(); //so we can grab colors
    const isNonMobileScreens = useMediaQuery();


    return (<div>loginpage</div>)
}

export default LoginPage;