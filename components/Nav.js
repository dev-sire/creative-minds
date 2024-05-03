import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { HiLightBulb } from "react-icons/hi";
import ThemeSwitch from "@/components/ThemeSwitcher";

export default function Nav() {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="md:max-w-2xl md:mx-auto font-poppins flex justify-between items-center py-8 px-4 sticky top-0 bg-white dark:bg-[#101720] shadow-md">
      <div className="flex flex-1">
        <HiLightBulb className="text-cyan-800 text-3xl mr-1 hidden md:block md:mr-2 dark:text-amber-400 " />
        <Link href="/">
          <button className="md:text-xl text-lg font-bold md:font-medium">Creative Minds</button>
        </Link>
      </div>
      <div className="mx-4">
        <ThemeSwitch />
      </div>
      <ul className="flex items-center md:gap-10">
        {!user && (
          <Link href={"/auth/login"}>
            <a className="py-2 px-4 text-sm bg-cyan-500 dark:bg-cyan-700 text-white rounded-lg font-medium ml-8">
              Join Now
            </a>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-6">
            <Link href="/post">
              <button className="font-medium bg-cyan-500 dark:bg-cyan-700 text-white py-2 px-2 md:px-4 rounded-lg textx-sm">
                Post
              </button>
            </Link>
            <Link href="/dashboard">
              <img
                className="w-12 rounded-full cursor-pointer"
                src={user.photoURL}
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}
