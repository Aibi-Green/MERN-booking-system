import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import { Building, Loader2, MailIcon, MapPin, Phone } from "lucide-react"
import { PasswordInput } from "../ui/password-input"
import { useSignup } from '../../hooks/useSignup'
import { PersonIcon } from "@radix-ui/react-icons"

const formSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().email(),
    password: z.string().min(6, { message: "Password is required" }),
    confirmPassword: z.string().min(6),
    name: z.string().optional(),
    contact_person: z.string().min(1, { message: "Contact person is required" }),
    contact_number: z.string().min(11, { message: "Contact number is required" }),
    address: z.string().optional()
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
        });
    }
})

type SignupFormData = z.infer<typeof formSchema>

const SignupForm = () => {
    const { isLoading, error, signup } = useSignup()

    const form = useForm<SignupFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
            contact_person: "",
            contact_number: "",
            address: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        signup(
            values.username,
            values.email,
            values.password,
            values.name || "",
            values.contact_person,
            values.contact_number,
            values.address || "",
        )
    }

    return (<>
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="text"
                                    placeholder="harmonyHeights"
                                    suffix={<PersonIcon />} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
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
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Organization Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="org A"
                                    suffix={<Building />} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contact_person"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact Person</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Juliet Abby"
                                    suffix={<PersonIcon />} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contact_number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="XXXX XXX XXXX"
                                    suffix={<Phone />} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Blk XX Lot X Subd..."
                                    suffix={<MapPin />} />
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
                        Sign Up
                    </Button>
                )}
            </form>
        </Form>
    </>)
}

export default SignupForm