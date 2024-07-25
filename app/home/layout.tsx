import React from "react";
import NavBar from "../components/NavBar";
import SkeletonLoader from "../components/HomeSkeleton";

const HomeLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
    return ( 
        <div>
            <NavBar />
            <main className="flex w-11/12 mx-auto gap-5 mt-5">
                <div className="w-4/12 bg-normalWhite rounded-lg hidden lg:block">
                    <SkeletonLoader />
                </div>
                <div className="flex-grow">{children}</div>
            </main>
        </div>
     );
}
 
export default HomeLayout;