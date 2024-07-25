'use client'

import Image from "next/image";
import getStarted from '../../public/Group 273.png'
import NavBar from "../components/NavBar";
import SkeletonLoader from "../components/HomeSkeleton";
import LinkForm from "../components/LinkForm";
import { useState } from "react";

export default function Home() {

  const [renderLey, setRenderKey] = useState(0)
  const [linkListEmpty, setLinkListEmpty] = useState(true)
  const handleAddLink = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setLinkListEmpty(false)
  }

  const showSecondTab = !linkListEmpty;


  return (
    <main className="bg-normalWhite w-full rounded-lg h-[85vh] p-5">
      <div>
          <div className="mt-4 ml-2 flex flex-col gap-2">
            <h2 className="text-3xl font-bold">Customize your links</h2>
            <p className="mt-2 text-greyDarkest">Add/edit/remove links below and then share all your profiles with the world</p>
            <button 
              className="text-deepBlue border border-deepBlue bg-greyMediumLighter rounded-lg py-2 font-semibold text-sm mt-6"
              onClick={handleAddLink}
            >
               + Add New Link
            </button>
          </div>
      </div>
      {
        !showSecondTab?
          <div className="bg-greyLightest w-[52rem] h-[55vh] mt-5 rounded-lg flex flex-col justify-center">
            <Image src={getStarted} alt=""className="w-fit mx-auto"/>
          </div>
          :
          <div className="bg-greyMediumLighter w-[52rem] h-fit mt-5 rounded-lg flex flex-col justify-center p-4">
            <LinkForm />
          </div>
      }
    </main>
  );
}
