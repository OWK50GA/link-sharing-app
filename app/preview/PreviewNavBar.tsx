import Link from "next/link";

const PreviewNavBar = () => {
    return ( 
        <div className="bg-normalWhite w-11/12 mx-auto p-3 flex justify-between items-center rounded-lg">
            <div>
                <Link href={'/home'} className="border border-deepBlue p-3 rounded-lg font-semibold text-deepBlue">
                    Back To Editor
                </Link>
            </div>
            <div>
                <button className="bg-deepBlue px-4 py-2 rounded-lg text-normalWhite">
                    Share Link
                </button>
            </div>
        </div>
     );
}
 
export default PreviewNavBar;