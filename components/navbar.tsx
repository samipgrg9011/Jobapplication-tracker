import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { getSession } from "@/lib/auth/auth";

export default async function Navbar() {
  const session = await getSession()
  

  return (
    <nav className="border-b border-gray-200 bg-white">
        <div className="container mx-auto flex h-16 items-center px-4 justify-between">
            <Link href={"/"} className=" flex item center gap-2 text-xl font-semibold text-primary">
            <Briefcase/>
            job tracker
        
            </Link>
        
        <div className="flex items-center gap-4">
       { <>
          <Link href="/sign-in">
          <Button variant = 'ghost'className="text-gray-700 hover:text-black">Sign In</Button>
          </Link>
          <Link href="/sign-up">
          <Button className="bg-primary hover:bg-primary/90">Sign Up</Button>
          </Link>
        </>}
        
        </div>
        </div>
    </nav>
  )
}
