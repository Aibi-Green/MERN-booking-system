// import { useState } from "react"
import { NavLink } from "react-router-dom"
import LoginForm from "../components/forms/LoginForm"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"

const Login = () => {
    return (<>
        <div className='h-lvh overflow-hidden bg-heroImg bg-center 
        items-center text-white flex flex-col justify-center'>
            <Card className="md:w-96">
                <CardHeader>
                    <CardTitle className="text-center md:text-xl">SIGN IN</CardTitle>
                    <CardDescription className="text-center">Create and view your bookings<br />in Harmony Heights</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-orange-800">
                        <NavLink to="/signup">
                            Create an Account
                        </NavLink>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </>)
}

export default Login