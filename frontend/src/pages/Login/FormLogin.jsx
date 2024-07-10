import { useTheme } from "@emotion/react";
import { EditOutlined } from "@mui/icons-material";
import { TextField, Box, Button, Typography, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authLogin, signup } from "services/api";
import { setLogin } from "store";
import * as yup from "yup"


const initialValuesRegister = {
    firstName: "",
    lastName: "",
    location: "",
    occupation: "",
    picture: "",
    email: "",
    password: "",
}

// const initialValuesLogin = {
//     email: "",
//     password: "",
// }

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
})

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
})

const FormLogin = () => {
    const dispath = useDispatch()
    const navigate = useNavigate()
    const { palette } = useTheme()
    const isNonMobile = useMediaQuery("(min-width: 600px)")
    const [isLogin, setIsLogin] = useState(true)

    const login = async (values, e) => {
    
        const userRes = await authLogin(values)

        if (userRes) {
            const { token, user } = userRes
            if (token) {
                e.resetForm()
                dispath(setLogin({ user, token }))
                
                navigate('/home')
            } 
        } else {
            const { msg } = userRes


        } 
    }

    const register = async (values, e) => {
        const formData = new FormData()
        for (let value in values) {
            formData.append(value,values[value])
        }

        formData.append('picturePath', values.picture.name)
        const res = signup(formData)

        if (res) {
            e.resetForm()
            setIsLogin(true)
        }
    }

    const handleFormSubmit = (values, e) => {
        if (isLogin) {
            return login(values,e)
        }

        return register(values,e)

    }

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesRegister}
            validationSchema={isLogin? loginSchema :registerSchema}
        >
            {
                ({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm
                }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4,minmax(0,1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                                }}
                            >
                                {
                                    !isLogin ?
                                        <>
                                            <TextField
                                                label="First Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.firstName}
                                                name="firstName"
                                                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                                helperText={touched.firstName && errors.firstName}
                                                sx={{ gridColumn: "span 2" }}
                                            />
                                            <TextField
                                                label="Last Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.lastName}
                                                name="lastName"
                                                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                                helperText={touched.lastName && errors.lastName}
                                                sx={{ gridColumn: "span 2" }}
                                            />
                                            <TextField
                                                label="Location"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.location}
                                                name="location"
                                                error={Boolean(touched.location) && Boolean(errors.location)}
                                                helperText={touched.location && errors.location}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                            <TextField
                                                label="Occupation"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.occupation}
                                                name="occupation"
                                                error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                                helperText={touched.occupation && errors.occupation}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                            <Box
                                                gridColumn="span 4"
                                                p="1rem"
                                                border={`1px solid ${palette.neutral.medium}`}
                                                borderRadius="5px"
                                            >
                                                <Dropzone
                                                    accept={{ 'image/jpeg': ['.jpg', '.jpeg', '.png'] }}
                                                    multiple={false}
                                                    onDrop={(files) => setFieldValue("picture", files[0])}
                                                >
                                                    {({ getInputProps, getRootProps }) => {
                                                        return <Box
                                                            {...getRootProps()}
                                                            border={`2px dashed ${palette.primary.main}`}
                                                            p="1rem"
                                                            sx={{ "&:hover": { cursor: "pointer" } }}
                                                        >
                                                            <input {...getInputProps()} />
                                                            {
                                                                !values.picture ?
                                                                    <p>Add Picture Here</p>
                                                                    :
                                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                        <Typography>{values.picture.name}</Typography>
                                                                        <EditOutlined />
                                                                    </div>
                                                            }
                                                        </Box>
                                                    }}
                                                </Dropzone>

                                            </Box>
                                        </>
                                        : null
                                }

                                <TextField
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    label="Password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={Boolean(touched.password) && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    sx={{ gridColumn: "span 4" }}
                                />


                                <Box
                                    gridColumn="span 4"
                                >
                                    <div style={{ display: "flex", gap: "0.2rem" }}>
                                        <Button
                                            fullWidth
                                            type="submit"
                                            sx={{
                                                m: "2rem 0",
                                                p: "1rem",
                                                backgroundColor: palette.primary.main,
                                                color: palette.background.alt,
                                                "&:hover": { color: palette.primary.main }
                                            }}
                                        >{isLogin ? "LOGIN" : "REGISTER"}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outlined"
                                            sx={{
                                                m: "2rem 0",
                                                p: "1rem",
                                            }}
                                            onClick={() => { }}
                                        >GUEST</Button>
                                    </div>
                                    <Typography
                                        onClick={
                                            () => {
                                                setIsLogin(!isLogin)
                                                resetForm()
                                            }
                                        }
                                        sx={{
                                            textDecoration: "underline",
                                            color: palette.primary.main,
                                            "&:hover": {
                                                cursor: "pointer",
                                                color: palette.primary.light
                                            }
                                        }}
                                    >
                                        {isLogin ? "Don't have a account? Sign up here" : "Already have a account? Login here"}
                                    </Typography>
                                </Box>
                            </Box>
                        </form>
                    )

                }
            }

        </Formik>

    )
}


export default FormLogin