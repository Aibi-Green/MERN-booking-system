import { useQuery } from 'react-query'
import { toast } from 'sonner'
const API_BASE_URL = import.meta.env.API_BASE_URL

export const LoginUser = () => {

    const loginUser = async (data: {
        email: string;
        password: string
    }) => {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                // Authorization: `Bearer ${accessToken}`
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error("Failed to fetch user")
        }

        return response.json()
    }

    const {
        isLoading,
        error
    } = useQuery("loginUser", loginUser)

    if (error) {
        toast.error(error.toString())
    }

    return { isLoading }
}