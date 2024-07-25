import ProfileDetailsForm from "@/app/components/ProfileDetailsForm";

const ProfileDetails = () => {
    return (
        <main className="bg-normalWhite w-full rounded-lg h-[85vh] p-5">
      <div>
          <div className="mt-4 ml-2 flex flex-col gap-2">
            <h2 className="text-3xl font-bold">Profile Details</h2>
            <p className="mt-2 text-greyDarkest">Add your details to create a personal touch to your profile</p>
          </div>
      </div>
      <ProfileDetailsForm />
    </main>
    )
}

export default ProfileDetails;