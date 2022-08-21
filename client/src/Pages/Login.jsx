import React, { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import AppBarLogin from "../Components/AppBarLogin";
import FormLogin from "../Components/Login/FormLogin";
import { AuthContext } from '../Context/AuthContext';
import { loginUser, fetchBusinessData, fetchRol } from '../Services/LoginServices'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [isLoading, setIsLoading] = useState()

    const { setToken, setBusinessId, setFullLogo, setFirstName, setColor, isLoggedIn, setIsLoggedIn, role, setRole } = useContext(AuthContext)

    const fetchUserData = (token) => {
        fetchBusinessData(token)
            .then(response => {
                setFullLogo(response.data.data.businesses.fullLogo)
                setColor(response.data.data.businesses.color)
                setBusinessId(response.data.data.businesses._id)
            })
            .catch(error => {
                setErrMsg(error)
            })

        fetchRol(token)
            .then(response => {
                setFirstName(response.data.data.firstName)
                setRole(response.data.data.role)
            })
            .catch(error => {
                setErrMsg(error)
            })
    }

    const onChangeEmail = (event) => {
        event.preventDefault()
        setEmail(event.target.value)
    }

    const onChangePassword = (event) => {
        event.preventDefault()
        setPassword(event.target.value)
    }

    const onClick = () => {
        setIsLoading(true)
        loginUser(email, password)
            .then(response => {
                var token = response.data.token
                setIsLoading(false)
                setToken(token)
                fetchUserData(token)
                setIsLoggedIn(true)
            })
            .catch(error => {
                setEmail('')
                setPassword('')
                setErrMsg(error)
                setIsLoading(false)
            }
            )
    }

    if (isLoggedIn) {
        switch (role) {
            case 'user':
                return (
                    <Navigate replace to="/DashboardUser" />
                )
            case 'admin':
                return (
                    <Navigate replace to="/DashboardAdmin" />
                )
            case 'root':
                return (
                    <Navigate replace to="/DashboardRoot" />
                )
            default:
                return (
                    <>
                        <AppBarLogin />
                        <br />
                        <FormLogin loading={isLoading} onChangeEmail={onChangeEmail} onChangePassword={onChangePassword} onClick={onClick} email={email} password={password} />
                    </>
                )
        }
    }

    return (
        <>
            <AppBarLogin />
            <br />
            <FormLogin loading={isLoading} onChangeEmail={onChangeEmail} onChangePassword={onChangePassword} onClick={onClick} email={email} password={password} />
        </>
    )

}

export default Login;