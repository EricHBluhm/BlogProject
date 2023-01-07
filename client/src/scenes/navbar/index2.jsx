import {useState} from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {setMode, setLogOut} from "state";
import {useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween"; //look up pesticide chrome extension to see flexboxes

const NavBar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false); // toggle to open mobile menu on small screen
    const dispatch = useDispatch(); //dispatch actions from the redusers
    const navigate = useNavigate();
    const user = useSelector((state)=> state.user);//get user information
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); //hook of material ui that allows us to determine if the current screen size is below this min width

    const theme = useTheme(); //allows us to use theme.js stuff. All the colors etc. Like theme.palette.neutral.main
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName}`; //gives us fullname access



    return <FlexBetween padding = "1rem 6%" backgroundColor = {alt}>
        <FlexBetween gap="1.75rem">
            <Typography 
                fontWeight="bold"
                fontSize = "clamp(1rem,2rem,2.25rem)" //clamp is a css that determines minimum value for font, preferred, max value, a
                color="primary"
                onClick={()=>navigate("/home")} //navigate to home with react router
                sx={{ //can put CSS properties where you can put in sudo properties with material UI
                    "&:hover" :{
                        color:primaryLight,
                        cursor: "pointer",
                    },
                }}
            >
                Sociopedia
            </Typography>
            {isNonMobileScreens && ( //if is mobile screen, don't show this
                <FlexBetween 
                    backgroundColor = {neutralLight} 
                    borderRadius="9px" 
                    gap="3rem" 
                    padding="0.1rem 1.5rem"
                >
                    <InputBase placeholder="Search..." />
                    <IconButton>
                        <Search /> 
                    </IconButton>
                </FlexBetween>
            )}
        </FlexBetween>

        {/* DESKTOP NAV, non mobile screens ~2:34, flipping dark and light mode using redux */}
        {isNonMobileScreens ? (
            <FlexBetween gap="2rem">
                <IconButton onClick={()=> dispatch(setMode())}> 
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{fontSize: "25px"}} />
                    ): (
                        <LightMode sx={{ color: dark, fontSize: "25px"}} />
                    )}
             </IconButton>
             <Message sx={{fontSize: "25px"}} />
             <Notifications sx={{fontSize: "25px"}} />
             <Help sx={{fontSize: "25px"}} />
             <FormControl variant="standard" value = {fullName}>
                <Select
                    value={fullName}
                    sx= {{
                        backgroundColor: neutralLight,
                        width: "150px",
                        borderRadius: "0.25rem",
                        p: "0.25rem 1rem",
                        "& .MuiSvgIcon-root:": {
                            pr: "0.25rem",
                            width: "3rem"
                        },
                        "& .MuiSelect-select:focus":{
                            backgroundColor: neutralLight
                        }
                    }}
                    input={<InputBase/>}
                >
                    <MenuItem value={fullName}>
                        <Typography>{fullName}</Typography>
                    </MenuItem>
                    <MenuItem onClick={()=>dispatch(setLogOut())}>Log Out</MenuItem>
                </Select>
             </FormControl>
            </FlexBetween>
        ) : (
            <IconButton
                onclick={()=>setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
                <Menu />
            </IconButton>
        )}

        {/* MOBILE NAV 2:41*/}
        {!isNonMobileScreens && isMobileMenuToggled && (
            <Box
                position = "fixed"
                right = "0"
                bottom="0"
                height= "100%"
                zIndex="10"
                maxWidth="500px"
                minWidth="300px"
                backgroundColor={background}
            >
                {/* CLOSE ICON */}
                <Box display="flex" justifyContent="flex-end" p="1rem">
                    <IconButton
                     onclick={()=>setIsMobileMenuToggled(!isMobileMenuToggled)}
                    >
                        <Close/>
                    </IconButton>
                </Box>

                {/* Menu Items */}
                    <FlexBetween dispaly="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
                    <IconButton onClick={()=> dispatch(setMode())} sx={{fontSize: "25px"}}> 
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{fontSize: "25px"}} />
                        ): (
                            <LightMode sx={{ color: dark, fontSize: "25px"}} />
                        )}
                    </IconButton>
                    <Message sx={{fontSize: "25px"}} />
                    <Notifications sx={{fontSize: "25px"}} />
                    <Help sx={{fontSize: "25px"}} />
                    <FormControl variant="standard" value = {fullName}>
                        <Select
                            value={fullName}
                            sx= {{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root:": {
                                    pr: "0.25rem",
                                    width: "3rem"
                                },
                                "& .MuiSelect-select:focus":{
                                    backgroundColor: neutralLight
                                }
                            }}
                            input={<InputBase/>}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={()=>dispatch(setLogOut())}>Log Out</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            </Box>
        )}

    </FlexBetween>;
}

export default NavBar;