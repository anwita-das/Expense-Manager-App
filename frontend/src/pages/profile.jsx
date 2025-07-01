import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, uploadProfilePhoto } from "@/api/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { setTheme } from "@/lib/theme";
import { Link } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Navbar from "@/components/navbar";

function Profile() {

    const [user, setUser] = useState(null);
    const [isLightMode, setIsLightMode] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
      fetchUserProfile()
        .then(setUser)
        .catch((err) => console.error("User fetch failed", err));
    }, []);


    useEffect(() => {
      const stored = localStorage.getItem("theme");
      setIsLightMode(stored === "light");
    }, []);

    const handleToggle = (checked) => {
      const newTheme = checked ? "light" : "dark";
      setIsLightMode(checked);
      setTheme(newTheme);
    };

    const handlePhotoUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const updatedUser = await uploadProfilePhoto(file);
        setUser(updatedUser);
      } catch (err) {
        console.error("Upload failed:", err);
        alert("Upload failed");
      }
    };

  return (
    <div className="flex flex-col items-center bg-neutral-800 text-neutral-50 dark:bg-neutral-200 dark:text-neutral-900 min-h-screen">
      <div className="flex flex-col justify-center items-center p-3 space-y-4">
        <h1 className="text-4xl font-sans font-medium">
          Hello, {user ? user.name : "User"}!
        </h1>
        <Avatar className="w-40 h-40">
          {user?.profile_photo_url ? (
            <AvatarImage src={`http://localhost:8000${user.profile_photo_url}`} alt={user?.name} />
          ) : (
            <AvatarImage src="/placeholderPFP.jpg" alt="Placeholder" />
          )}
        </Avatar>
        <label
            htmlFor="upload-photo"
            className="bg-purple-900 hover:bg-purple-300 text-white dark:text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Upload Photo
            <input
              type="file"
              id="upload-photo"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>

      </div>

      <div className="w-[95%] h-auto bg-neutral-700 dark:bg-neutral-300 text-neutral-100 dark:text-neutral-900 m-2 rounded-4xl p-5 space-y-4">
        
        <div className="flex flex-row justify-between">
          <div className="text-md font-medium">Name:</div>
          <div className="font-bold text-lg">{user?.name || "—"}</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-md font-medium">Email:</div>
          <div className="font-bold text-lg">{user?.email || "—"}</div>
        </div>
      </div>

      <div className="w-[95%] h-auto bg-neutral-700 dark:bg-neutral-300 text-neutral-100 dark:text-neutral-900 m-2 rounded-4xl p-5">
        <div className="flex flex-row justify-between">
          <div className="text-lg font-medium">Currency Preference:</div>
          <div className="font-bold text-xl">
            {user?.currency_preference}
            {user?.currency_preference === "INR" ? " (₹)" : ""}
            {user?.currency_preference === "USD" ? " ($)" : ""}
          </div>
        </div>
      </div>

      <div className="w-[95%] h-auto bg-neutral-700 dark:bg-neutral-300 text-neutral-100 dark:text-neutral-900 m-2 rounded-4xl p-5">
        <div className="flex flex-row justify-between items-center">
          <div className="text-lg font-medium">Dark Mode:</div>
          <Switch checked={isLightMode} onCheckedChange={handleToggle} />
        </div>
      </div>

      <div className="flex flex-row justify-between m-5 space-x-3 mb-15">
        <Link to="/editprof">
          <Button variant="default" className="w-32 bg-purple-900 text-white dark:text-white hover:bg-purple-300">
            Update Profile
          </Button>
        </Link>
        <Link to="/">
          <Button variant="default" className="w-32 bg-red-500 text-white hover:cursor-pointer hover:bg-red-200">
            Log Out
          </Button>
        </Link>
        <Button variant="default" className="w-[32%] bg-red-500 text-white hover:cursor-pointer hover:bg-red-200">
          Delete Account
        </Button>
      </div>
      <Navbar />
    </div>
  );
}

export default Profile;