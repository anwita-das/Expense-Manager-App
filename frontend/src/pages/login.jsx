import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import axios from"axios";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/auth/login", {
                email,
                password,
            });

            const token = response.data.access_token;
            localStorage.setItem("token", token);
            navigate("/books");
        } catch (error) {
            console.error("Login failed:", error.response?.data?.detail || error.message);
            alert("Invalid email or password");
        }
    };

    return (
        <>
        <div className="flex justify-center items-center min-h-screen bg-neutral-800 dark:bg-neutral-200">
            <div className="flex flex-col justify-center items-center h-auto w-sm bg-neutral-300 rounded-2xl shadow-md p-5 space-y-7">
                <h1 className="font-bold text-2xl text-neutral-800">Login</h1>
                    <div className="flex flex-row space-x-15">
                        <Label htmlFor="email" className={"dark:text-neutral-900"}>Email</Label>
                        <Input 
                            id="email" 
                            type="text" 
                            placeholder="Enter your email id" 
                            className="bg-neutral-200 dark:bg-neutral-100" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-row space-x-10">
                        <Label htmlFor="password" className={"dark:text-neutral-900"}>Password</Label>
                        <Input 
                            id="password" 
                            type="password" 
                            placeholder="Enter your password" 
                            className={"bg-neutral-200 dark:bg-neutral-100"}
                            value = {password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <Button onClick={handleLogin} className="w-full mt-4 dark:bg-neutral-400">Login</Button>
                    
                    <p className="text-sm text-center text-gray-600">
                    Don’t have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
                    </p>
            </div>
        </div>
        </>
    );
}

export default Login;