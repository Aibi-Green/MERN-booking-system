import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import { Loader2, MailIcon } from "lucide-react"
import { PasswordInput } from "../ui/password-input"
import { useLogin } from '../../hooks/useLogin'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password is required" })
})

type LoginFormData = z.infer<typeof formSchema>

const LoginForm = () => {
    const {isLoading, error, login} = useLogin()
    
    const form = useForm<LoginFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        login(values.email, values.password)
    }

    return (<>
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="email.example@harmony.com"
                                    suffix={<MailIcon />} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    {...field}
                                    placeholder="****"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="text-center text-destructive text-sm font-semibold">
                    {error}
                </div>
                {isLoading ? (
                    <Button disabled className="w-full">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading
                    </Button>
                ) : (
                    <Button
                        type="submit"
                        className="w-full">
                        Sign In
                    </Button>
                )}
            </form>
        </Form>
    </>)
}

export default LoginForm