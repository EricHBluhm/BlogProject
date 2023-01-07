import { Box } from "@mui/material";
import {styled} from "@mui/system";

//reusing css as a component 2:20:38, explanation : 2:27 ish
const FlexBetween = styled(Box)({ //the box lets us do padding="string" etc and configure other css properties. Box is from material UI
    display: "flex",
    justifyContent: "space-between",
    alignItems : "center",
})

export default FlexBetween;