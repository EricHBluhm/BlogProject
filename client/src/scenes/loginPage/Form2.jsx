//register functionality
//something in here not right FIX


import {useState } from "react";
import{
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {Formik} from "formik"; //form library
import * as yup from "yup"; // validation library
import {useNavigate} from "react-router-dom"; //navigate when register/login, navigate to different pages
import {useDispatch} from "react-redux"; //us react redux to store our user information
import {setLogin} from "state";
import Dropzone from "react-dropzone"; //so we can drop a file/image so they can upload file
import FlexBetween from "components/FlexBetween";

//can do more validation, but this is the base validation for yup
const registerSchema=yup.object().shape({ //create yup validation schema, determines the shape of how the form library is going to saving the information
    firstName: yup.string().required("required"),
    lastName:yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
})

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = { //this sets up the initial values
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

const initialValuesLogin={
    email: "",
    passowrd: "",
};

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const {palette} = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("min-width:600px"); //boolean
    const isLogin = pageType === "login"; //boolean
    const isRegister = pageType === "register"; //boolean


    const register = async(values,onSubmitProps) => { //3:22 REWATCH
        const formData = new FormData(); //allows for to send form info with image
        for (let value in values) { //loop through every values and append it for formData to send picture
            formData.append(value, values[value])
        }
        formData.append('picturePath', values.picture.name);

        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method:"POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login");
        }
    };


    const login = async(values,onSubmitProps) => {
        const loggedInResponse = await fetch(
            "http://localhost:3001/auth/login",
            {
                method:"POST",
                headers: {"Content=Type": "application/json"},
                body: JSON.stringify(values),
            }
        );
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn){
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/home");
        }
    }


    //3:22 for this function
    const handleFormSubmit = async(values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues = {isLogin ? initialValuesLogin : initialValuesRegister} //if we are on islogin page, we will initalize values with initialValuesLogin values, otherwise use initialValuesRegister values
            validaitonSchema= {isLogin ? loginSchema : registerSchema}
        >
            {/* FORMIK STUFF 3:03 */}
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit = {handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTempalteColumns="repeat(4, minmax(0, 1fr))" // split grid into 4 sections, min 0 otherqise split into equal fractions of 4
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4"}, 
                        }}
                    >
                        {isRegister && (  //if on register page, these are our inputs
                            <>
                                <TextField 
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name = "firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)} //if firstname has been touched or not or if there is an error. Shows if we have error for this particular text field
                                    helperText={touched.firstName && errors.firstName} //if touched, but have error, we will show error, otherqise show it has been touched
                                    sx={{gridColumn: "span 2"}}
                                />
                                <TextField 
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name = "lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)} //if lastname has been touched or not or if there is an error. Shows if we have error for this particular text field
                                    helperText={touched.lastName && errors.lastName} //if touched, but have error, we will show error, otherqise show it has been touched
                                    sx={{gridColumn: "span 2"}}
                                />
                                <TextField 
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name = "location"
                                    error={Boolean(touched.location) && Boolean(errors.location)} //if location has been touched or not or if there is an error. Shows if we have error for this particular text field
                                    helperText={touched.location && errors.location} //if touched, but have error, we will show error, otherqise show it has been touched
                                    sx={{gridColumn: "span 4"}}
                                />
                                <TextField 
                                    label="Occupation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name = "occupation"
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)} //if occupation has been touched or not or if there is an error. Shows if we have error for this particular text field
                                    helperText={touched.occupation && errors.occupation} //if touched, but have error, we will show error, otherqise show it has been touched
                                    sx={{gridColumn: "span 4"}}
                                />
                                <Box
                                    gridColumn = "span 4"
                                    border={`1px solid ${palette.neutralmedium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone 
                                        acceptedFiles = ".jpgm,jpeg,.png"
                                        multiple={false}
                                        onDrop = {(acceptedFiles)=> 
                                            setFieldValue("picture", acceptedFiles[0])
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{ "&:hover" : {cursor:"pointer"}}}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add Picture Here</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>{values.picture.name}</Typography>
                                                        <EditOutlinedIcon/>
                                                    </FlexBetween>
                                                )}

                                            </Box>

                                        )}
                                    </Dropzone>

                                </Box>
                              
                            </>
                        )} 

                        <TextField 
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name = "email"
                            error={Boolean(touched.email) && Boolean(errors.email)} //if email has been touched or not or if there is an error. Shows if we have error for this particular text field
                            helperText={touched.email && errors.email} //if touched, but have error, we will show error, otherqise show it has been touched
                            sx={{gridColumn: "span 4"}}
                        />
                        <TextField 
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name = "password"
                            error={Boolean(touched.password) && Boolean(errors.password)} //if password has been touched or not or if there is an error. Shows if we have error for this particular text field
                            helperText={touched.password && errors.password} //if touched, but have error, we will show error, otherqise show it has been touched
                            sx={{gridColumn: "span 4"}}
                        />
                    </Box>
                    
                    {/* BUTTONS */}

                    <Box>
                        <Button fullwidth type="submit" sx={{
                            m: "2rem 0",
                            p: "1rem",
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover": {color: palette.primary.main},
                        }}>
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography //link below to swithc between login and register
                            onClick= {()=> {
                                setPageType(isLogin ? "register" : "login");
                                resetForm(); //when we switch ebtween register and login, clean up inputs
                            }}
                            
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover" : {
                                    cursor: "pointer",
                                    color: palette.primary.light,
                                },
                            }}
                        >
                            {isLogin ? "Don't have an acocunt? Sign up here." : "Already have an account? Login herer."}

                        </Typography>
                    </Box>



                </form>
            )}

        </Formik>
    );
};

export default Form;