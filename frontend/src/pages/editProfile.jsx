import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserProfile, updateUserProfile } from "@/api/user";
import { isValidEmail, isNonEmptyName } from "../../utils/validation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

function EditProfile() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        currency_preference: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserProfile()
        .then((data) => {
            setUserData({
            name: data.name,
            email: data.email,
            currency_preference: data.currency_preference,
            });
        })
        .catch((err) => console.error("Failed to fetch user", err));
    }, []);

     const handleChange = (e) => {
        setUserData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const handleCurrencyChange = (value) => {
        setUserData((prev) => ({
        ...prev,
        currency_preference: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!isNonEmptyName(userData.name)) {
        newErrors.name = "Name is required.";
        }
        if (!isValidEmail(userData.email)) {
        newErrors.email = "Enter a valid email.";
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        try {
        await updateUserProfile(userData);
        navigate("/profile"); // redirect after successful update
        } catch (error) {
        console.error("Profile update failed", error);
        }
    };


    return(
        <>
        <div className="flex justify-center items-center bg-neutral-800 min-h-screen pb-2 dark:bg-neutral-200 dark:text-neutral-900">
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-[90%] h-auto m-5 p-4 rounded-2xl space-y-2 bg-neutral-700 dark:bg-neutral-300 text-neutral-50 dark:text-neutral-800">
                <div className="font-bold text-3xl">Edit Profile</div>
                
                <div className='mt-2 w-full'>
                    <div className='text-sm text-neutral-300 mb-2 ml-2 font-medium dark:text-neutral-800'>Name: <span className="text-red-500">*</span></div>
                    <Input
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        className="bg-neutral-600 p-3 rounded-2xl font-medium text-neutral-50 dark:bg-neutral-200 dark:text-neutral-800"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1 ml-2">{errors.name}</p>
                    )}           
                </div>
                <div className='mt-2 w-full'>
                    <div className='text-sm text-neutral-300 mb-2 ml-2 font-medium dark:text-neutral-800'>Email: <span className="text-red-500">*</span></div>
                    <Input
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="bg-neutral-600 p-3 rounded-2xl font-medium text-neutral-50 dark:bg-neutral-200 dark:text-neutral-800"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1 ml-2">{errors.email}</p>
                    )}           
                </div>
                <div className='mt-2 w-full'>
                    <div className='text-sm text-neutral-300 mb-2 ml-2 font-medium dark:text-neutral-800'>Currency Preference:</div>
                    <Select value={userData.currency_preference} onValueChange={handleCurrencyChange}>
                    <SelectTrigger className="dark:bg-neutral-100 w-full hover:cursor-pointer">
                    <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-neutral-100 dark:text-neutral-900">
                    <SelectItem value="INR">INR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div className="flex flex-row justify-center mt-3 space-x-2 w-full">
                <Button type="submit" className="w-[40%] bg-purple-950 hover:bg-purple-400 dark:text-neutral-50">
                    Save Changes
                </Button>
                <Link to="/profile"><Button variant="default" className="hover:cursor-pointer w-40 bg-red-500 hover:bg-red-300 text-neutral-50">
                    Cancel
                </Button></Link>
                </div>
            </form>
        </div>
        </>
    );
}

export default EditProfile;