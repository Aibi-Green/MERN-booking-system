// import { useState } from "react"
import { NavLink } from "react-router-dom"
import SignupForm from "../components/forms/SignupForm"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"

const Signup = () => {
    return (<>
        <div className='overflow-hidden bg-heroImg bg-center 
        items-center text-white flex flex-col py-20'>
            <Card className="md:w-96">
                <CardHeader>
                    <CardTitle className="text-center md:text-xl">Create Account</CardTitle>
                    <CardDescription className="text-center">Create and view your bookings<br />in Harmony Heights</CardDescription>
                </CardHeader>
                <CardContent>
                    <SignupForm />
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-orange-800">
                        <NavLink to="/login">
                            Log In
                        </NavLink>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </>)
}

export default Signup