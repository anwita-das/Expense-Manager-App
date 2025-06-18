import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

function Login() {
    return (
        <>
        <div className="flex justify-center items-center min-h-screen bg-neutral-800 dark:bg-neutral-200">
            <div className="flex flex-col justify-center items-center h-auto w-sm bg-neutral-300 rounded-2xl shadow-md p-5 space-y-7">
                <h1 className="font-bold text-2xl text-neutral-800">Login</h1>
                    <div className="flex flex-row space-x-10">
                        <Label htmlFor="username" className={"dark:text-neutral-900"}>Username</Label>
                        <Input id="username" type="text" placeholder="Enter your username" className={"bg-neutral-200 dark:bg-neutral-100"}/>
                    </div>

                    <div className="flex flex-row space-x-10">
                        <Label htmlFor="password" className={"dark:text-neutral-900"}>Password</Label>
                        <Input id="password" type="password" placeholder="Enter your password" className={"bg-neutral-200 dark:bg-neutral-100"}/>
                    </div>
                    <Link to="/books" className="w-full">
                    <Button className="w-full mt-4 dark:bg-neutral-400">Login</Button>
                    </Link>
                    <p className="text-sm text-center text-gray-600">
                    Don’t have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
                    </p>
            </div>
        </div>
        </>
    );
}

export default Login;