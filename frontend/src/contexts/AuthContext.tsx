import { createContext, useReducer } from 'react'

export type State = {
    user: string | null
}

export type Action = {
    type: "LOGIN" | "LOGOUT" | "SIGNUP",
    payload: { email: string, token: string }
}

export const AuthReducer = (state: State, action: Action) => {
    const { type } = action

    switch (type) {
        case "LOGIN":
        case "SIGNUP":
            return {
                user: action.payload
            }
        case "LOGOUT":
            return {
                user: null
            }
        default:
            return state
    }
}

export const AuthContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>
}>({
    state: { user: null },
    dispatch: () => undefined,
})

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        user: null
    })

    console.log('AuthContext state: ', state);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

