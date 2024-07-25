

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z, ZodType } from "zod";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import {auth} from '@/firebase/clientApp'
import { useState } from "react";
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/clientApp';

const schema = z.object({
    image: z.instanceof(File).optional(),
    firstname: z.string().min(1, 'Cannot be empty'),
    lastname: z.string().min(1, 'Cannot be empty'),
    email: z.string().email('Invalid email address')
})

type ProfileFormData = z.infer<typeof schema>


const ProfileDetailsForm = () => {

    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const {register, handleSubmit, formState: { errors }, reset} = useForm<ProfileFormData>({
        resolver: zodResolver(schema)
    })

    const handleProfileSubmit = async (data: ProfileFormData) => {
        try {
            let ImageUrl = '';
            if (data.image) {
                const ImageRef = ref(storage, `profile-images/${data.email}`);
                await uploadBytes(ImageRef, data.image);
                ImageUrl = await getDownloadURL(ImageRef)
            }

            await setDoc(doc(db, 'users', data.email), {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                ImageUrl,
            });

            console.log('Profile Updated Successfully')
            reset();
        } catch (error) {
            console.error('Error updating profile', error)
        }
        console.log('data')
    }

    // const handleSignIn = (data: ProfileFormData) => {
    //     try {
    //         // const res = await signInWithEmailAndPassword(data.email, data.password)
    //         console.log(data)
    //         reset();
    //         // router.push('/home')
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }


    // const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setImagePreview(reader.result as string);
    //         };
    //         reader.readAsDataURL(file)
    //     }
    // }

    return ( 
        <div>
            <form onSubmit={handleSubmit(handleProfileSubmit)}>
                <div className="flex bg-greyLightest py-4 items-center px-6 rounded-lg mt-5 gap-36">
                    <div>
                        <p>Profile Picture</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="w-[200px] h-[200px] bg-greyMediumDarker rounded-lg">
                            <input 
                                type="file" 
                                id="image" 
                                accept="image/*"
                                // {...register('image')} 
                                // onChange={handleImageChange}
                            />
                        </div>
                        <div className="text-xs text-greyDarkest">
                            <p>Image must be below 1024by1024px. <br /> Use JPG or PNG format</p>
                        </div>
                    </div>
                </div>

                <div className="bg-greyLightest py-6 rounded-lg mt-5 px-6">
                    <div className="flex justify-between gap-12 items-center mb-4">
                        <label htmlFor="firstName">First Name</label>
                        <input 
                            type="text" 
                            {...register("firstname")}
                            id="" 
                            className="border border-greyMediumDarker w-3/5 h-[35px] rounded-lg"
                        />
                    </div>
                    <div className="flex justify-between gap-12 items-center mb-4">
                        <label htmlFor="lastname">Last Name</label>
                        <input 
                            type="text" 
                            {...register("lastname")}
                            id="" 
                            className="border border-greyMediumDarker w-3/5 h-[35px] rounded-lg"
                        />
                    </div>
                    <div className="flex justify-between gap-12 items-center mb-4">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="text" 
                            {...register("email")}
                            id="" 
                            className="border border-greyMediumDarker w-3/5 h-[35px] rounded-lg"
                        />
                    </div>
                </div>

                <div>
                    <button type="submit" className="bg-deepBlue ml-auto w-fit text-normalWhite px-3 py-1 rounded-lg">Save</button>
                </div>
            </form>
        </div>
     );
}
 
export default ProfileDetailsForm;