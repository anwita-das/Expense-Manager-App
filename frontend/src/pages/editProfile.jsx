import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';   
import { Link } from "react-router-dom";
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
    return(
        <>
        <div className="flex justify-center items-center bg-neutral-800 min-h-screen pb-2 dark:bg-neutral-200 dark:text-neutral-900">
            <div className="flex flex-col items-center justify-center w-[90%] h-auto m-5 p-4 rounded-2xl space-y-2 bg-neutral-600 dark:bg-neutral-300 text-neutral-50 dark:text-neutral-800">
                <div className="font-bold text-3xl">Edit Profile</div>
                
                <div className='mt-2 w-full'>
                    <div className='text-sm text-neutral-300 mb-2 ml-2 font-medium dark:text-neutral-800'>Name:</div>
                    <Input className='bg-neutral-700 p-3 rounded-2xl font-medium text-neutral-50 dark:bg-neutral-200 dark:text-neutral-800'/>
                </div>
                <div className='mt-2 w-full'>
                    <div className='text-sm text-neutral-300 mb-2 ml-2 font-medium dark:text-neutral-800'>Email:</div>
                    <Input className='bg-neutral-700 p-3 rounded-2xl font-medium text-neutral-50 dark:bg-neutral-200 dark:text-neutral-800'/>
                </div>
                <div className='mt-2 w-full'>
                    <div className='text-sm text-neutral-300 mb-2 ml-2 font-medium dark:text-neutral-800'>Currency Preference:</div>
                    <Select>
                    <SelectTrigger className="dark:bg-neutral-100 w-full hover:cursor-pointer">
                    <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-neutral-100 dark:text-neutral-900">
                    <SelectItem value="INR">INR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
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
            </div>
        </div>
        </>
    );
}

export default EditProfile;