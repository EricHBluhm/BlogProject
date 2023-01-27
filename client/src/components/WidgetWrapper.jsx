import { Box } from "@mui/material";
import {styled} from "@mui/system";

//wrap widgets and give us a base styling for eahc

const WidgetWrapper = styled(Box)(({ theme }) => ({
    padding:"1.5rem 1.5rem 0.75rem 1.5rem", //top right bottom left
    backgroundColor: theme.palette.background.alt,
    borderRadius:"0.75rem"
}));

export default WidgetWrapper;