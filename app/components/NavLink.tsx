import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
    href: string,
    children: React.ReactNode;
}

const NavLink = (props: NavLinkProps) => {

    const {href, children} = props
    const pathname = usePathname();
    const isActive = pathname === href;

    return ( 
        <Link
            href={href} 
            className={isActive ? "flex items-center gap-2 text-deepBlue bg-greyMediumLighter rounded-lg px-5 py-2" : "flex items-center gap-2"}
        >
            {children}
        </Link>
     );
}
 
export default NavLink;