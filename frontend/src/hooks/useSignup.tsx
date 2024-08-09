import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (
        username:string,
        email: string, 
        password: string,
        name: string,
        contact_person: string,
        contact_number: string,
        address: string,
    ) => {
        const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${VITE_API_BASE_URL}/users/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                name: name,
                contact_person: contact_person,
                contact_number: contact_number,
                address: address
            })
        })
        const json = await response.json()
        console.log(json);

        if (!response.ok) {
            setError(json.message)
        } else {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify({
                email: email,
                token: json.token
            }))

            // update the auth context
            dispatch({ type: 'SIGNUP', payload: {
                email: email,
                token: json.token
            }})
        }
        setIsLoading(false)
    }

    return {isLoading, error, signup}
}