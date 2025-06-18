import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { setTheme } from "@/lib/theme";

function Profile() {

    const [isLightMode, setIsLightMode] = useState(false);

    useEffect(() => {
    const stored = localStorage.getItem("theme");
    setIsLightMode(stored === "light"); // true only if theme is light
    }, []);

    const handleToggle = (checked) => {
    const newTheme = checked ? "light" : "dark";
    setIsLightMode(checked);
    setTheme(newTheme);
    };
  return (
    <div className="flex flex-col items-center bg-neutral-800 text-neutral-50 dark:bg-neutral-200 dark:text-neutral-900 min-h-screen">
      <div className="flex flex-col justify-center items-center p-3 space-y-4">
        <h1 className="text-4xl font-sans font-medium">Hello, anwitadas!</h1>
        <Avatar className="w-40 h-40">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <label htmlFor="upload-photo">
          <Button variant="default" className="bg-purple-900 hover:bg-purple-300 text-white dark:text-white">Upload Photo</Button>
        </label>
      </div>

      <div className="w-[95%] h-auto bg-neutral-600 dark:bg-neutral-300 text-neutral-100 dark:text-neutral-900 m-2 rounded-4xl p-5 space-y-4">
        <div className="flex flex-row justify-between">
          <div className="text-md font-medium">Username:</div>
          <div className="font-bold text-lg">anwitadas</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-md font-medium">Full name:</div>
          <div className="font-bold text-lg">Anwita Das</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-md font-medium">Email:</div>
          <div className="font-bold text-lg">anwita@example.com</div>
        </div>
      </div>

      <div className="w-[95%] h-auto bg-neutral-600 dark:bg-neutral-300 text-neutral-100 dark:text-neutral-900 m-2 rounded-4xl p-5">
        <div className="flex flex-row justify-between">
          <div className="text-lg font-medium">Currency Preference:</div>
          <div className="font-bold text-xl">INR</div>
        </div>
      </div>

      <div className="w-[95%] h-auto bg-neutral-600 dark:bg-neutral-300 text-neutral-100 dark:text-neutral-900 m-2 rounded-4xl p-5">
        <div className="flex flex-row justify-between items-center">
          <div className="text-lg font-medium">Dark Mode:</div>
            <Switch checked={isLightMode} onCheckedChange={handleToggle} />
        </div>
      </div>

      <div className="flex flex-row justify-between m-5 space-x-3 mb-15">
        <Button variant="default" className="bg-purple-900 text-white dark:text-white hover:bg-purple-300">Update Profile</Button>
        <Button variant="default" className="bg-red-500 text-white hover:cursor-pointer hover:bg-red-200">Delete Account</Button>
      </div>
    </div>
  )
}

export default Profile;
