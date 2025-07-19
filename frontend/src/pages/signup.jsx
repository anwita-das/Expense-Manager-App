import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { signupUser, loginUser } from "@/api/auth";
import { isValidEmail, isValidPassword, isNonEmptyName } from "../../utils/validation";

function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSignup = async () => {
        const newErrors = {};
        if (!isNonEmptyName(name)) {
            newErrors.name = "Please enter your name.";
        }

        if (!isValidEmail(email)) {
            newErrors.email = "Please enter a valid email.";
        }

        if (!isValidPassword(password)) {
            newErrors.password = "Password must be at least 6 characters.";
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;
        try {
            await signupUser(name, email, password);
            const loginData = await loginUser(email, password);
            localStorage.setItem("token", loginData.access_token);
            navigate("/books");
        } catch (error) {
            console.error("Signup/Login failed:", error.response?.data?.detail || error.message);
            alert(error.response?.data?.detail || "Something went wrong.");        
        }
    };

    return (
        <>
        <div className="flex justify-center items-center min-h-screen bg-neutral-800 dark:bg-neutral-200">
            <div className="flex flex-col justify-center items-center h-auto w-sm bg-neutral-300 rounded-2xl shadow-md p-5 space-y-7">
                <h1 className="font-bold text-2xl text-neutral-800">Sign Up</h1>
                    <div className="flex flex-col w-full space-y-3">
                        <Label htmlFor="fullname" className={"dark:text-neutral-900"}>Name<span className="text-red-500 ml-1">*</span></Label>
                        <Input id="fullname" type="text" placeholder="Enter your full name" className={"bg-neutral-200 dark:bg-neutral-100 text-neutral-800"} onChange={(e) => setName(e.target.value)}/>
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div className="flex flex-col w-full space-y-3">
                        <Label htmlFor="email" className={"dark:text-neutral-900"}>Email<span className="text-red-500 ml-1">*</span></Label>
                        <Input id="email" type="text" placeholder="Enter your email id" className={"bg-neutral-200 dark:bg-neutral-100 text-neutral-800"} onChange={(e) => setEmail(e.target.value)}/>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="flex flex-col w-full space-y-3">
                        <Label htmlFor="password" className={"dark:text-neutral-900"}>Password<span className="text-red-500 ml-1">*</span></Label>
                        <Input id="password" type="password" placeholder="Enter your password" className={"bg-neutral-200 dark:bg-neutral-100 text-neutral-800"} onChange={(e) => setPassword(e.target.value)}/>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <Button onClick={handleSignup} className="w-full mt-4 dark:bg-neutral-400">Register</Button>

                    <p className="text-sm text-center text-gray-600">
                        Already have an account? <Link to="/" className="text-blue-500 hover:underline">Login</Link>
                    </p>
            </div>
        </div>
        </>
    );
}

export default Signup;