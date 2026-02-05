"use client"
import { Briefcase} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { AvatarFallback,Avatar } from "./ui/avatar";
import SignOutButton from "./sign-out-btn";
import { useSession } from "@/lib/auth/auth.client";

export default function Navbar() {
  const {data : session} = useSession()


  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link href={"/"} className=" flex item center gap-2 text-xl font-semibold text-primary">
          <Briefcase />
          job tracker

        </Link>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
            <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-black"
                >
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white">{session.user.name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>

                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <div>
                      <p>{session.user.name ?? "error"}</p>
                      <p>{session.user.email ?? "error"}</p>

                    </div>
                  </DropdownMenuLabel>
                  <SignOutButton/>

                </DropdownMenuContent>

              </DropdownMenu>
              
              
            </>
          ) : (<>
            <Link href="/sign-in">
              <Button variant='ghost' className="text-gray-700 hover:text-black">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-primary hover:bg-primary/90">Sign Up</Button>
            </Link>
          </>)}

        </div>
      </div>
    </nav>
  )
}
