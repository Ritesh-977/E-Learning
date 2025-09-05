import {Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" });
    const [loginInput, setLoginInput] = useState({ email: "", password: "" });

    const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess, },] = useRegisterUserMutation();
    const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSucess },] = useLoginUserMutation();
    console.log(loginData);
    const navigate = useNavigate();
    const changeInputHandler = (e, type) => {
        const { name, value } = e.target;
        if (type == "signup") {
            setSignupInput({ ...signupInput, [name]: value });
        } else {
            setLoginInput({ ...loginInput, [name]: value });
        }
    };
    const handleRegistraion = async (type) => {
        const inputData = type === "signup" ? signupInput : loginInput;
        const action = type === "signup" ? registerUser : loginUser;
        await action(inputData);
    };

    useEffect(() => {
        if (registerIsSuccess && registerData) {
            toast.success(registerData.message || "Signup successful.")
        }
        if (registerError) {
            const message = registerError?.data?.message || "Signup Failed";
            toast.error(message);
        }
        if (loginIsSucess && loginData) {
            toast.success(loginData.message || "Login successful.")
            console.log("Success")
            navigate("/");
        }
        if (loginError) {
            const message = loginError?.data?.message || "Login Failed";
            toast.error(message);
        }
    }, [loginIsLoading, registerIsLoading, loginData, registerData, loginError, registerData])

    return (
        <div className="flex items-center w-full justify-center mt-20">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign Up</CardTitle>
                            <CardDescription>
                                Create a new account to start your Journey!!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <input
                                    className="uiverse-input"
                                    type="text"
                                    name="name"
                                    value={signupInput.name}
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    placeholder="Your Name"
                                    required="true" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-username">Email</Label>
                                <input
                                    className="uiverse-input"
                                    type="email"
                                    name="email"
                                    value={signupInput.email}
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    placeholder="Your Valid Email"
                                    required="true"
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-username">Password</Label>
                                <input
                                    className="uiverse-input"
                                    type="password"
                                    name="password"
                                    value={signupInput.password}
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    placeholder="Your Secret Key"
                                    required="true" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={registerIsLoading} onClick={() => handleRegistraion("signup")}>
                                {
                                    registerIsLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                        </>
                                    ) : "Signup"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Login Up Here to Start where you left!!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-current">Email</Label>
                                {/* <Input
                                    type="email"
                                    name="email"
                                    value={loginInput.email}
                                    onChange={(e) => changeInputHandler(e, "login")}
                                    placeholder="UserName or Email"
                                    required="true"
                                /> */}
                                <input
                                    type="email"
                                    name="email"
                                    value={loginInput.email}
                                    onChange={(e) => changeInputHandler(e, "login")}
                                    placeholder="Email"
                                    autoComplete="off"
                                    required
                                    className="uiverse-input"
                                />

                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-new">Password</Label>
                                <input
                                    className="uiverse-input"
                                    type="password"
                                    name="password"
                                    value={loginInput.password}
                                    onChange={(e) => changeInputHandler(e, "login")}
                                    placeholder="Password"
                                    required="true"
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={loginIsLoading} onClick={() => handleRegistraion("login")}>
                                {
                                    loginIsLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                        </>
                                    ) : "Login"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
export default Login;