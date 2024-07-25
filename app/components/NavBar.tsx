'use client'

import Image from "next/image";
import devLinksImg from '../../public/solar_link-circle-bold.png'
import { IoIosLink } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import NavLink from "./NavLink";
import Link from "next/link";

const NavBar = () => {

    // const router = useRouter();
    // const pathname = router.pathname;
    // console.log(pathname)

    return ( 
        <div className="flex justify-between w-11/12 bg-normalWhite rounded-md mx-auto mt-4 items-center py-2 px-4">
            <div className="flex items-center">
                <Image src={devLinksImg} alt=""/>
                <p className="text-3xl font-bold">devlinks</p>
            </div>
            <div className="flex gap-5">
                <NavLink href="/home">
                    <IoIosLink />
                    <p>Links</p>
                </NavLink>
                <NavLink href="/home/profile-details">
                    <RxAvatar />
                    <p>Profile Details</p>
                </NavLink>
            </div>
            <Link href={'/preview'} className="flex items-center text-deepBlue border border-deepBlue px-6 py-2 rounded-lg">
                <div className="block md:hidden">
                    <IoEyeOutline />
                </div>
                <p className="hidden md:block">Preview</p>
            </Link>
        </div>
     );
}
 
export default NavBar;