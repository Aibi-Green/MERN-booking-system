import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email: string, password: string) => {
        const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${VITE_API_BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
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
            dispatch({ type: 'LOGIN', payload: {
                email: email,
                token: json.token
            }})
        }
        setIsLoading(false)
    }

    return {isLoading, error, login}
}