import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { FaCodepen, FaDev, FaFacebook, FaFreeCodeCamp, FaGithub, FaGitlab, FaLinkedin, FaStackOverflow, FaTwitch, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaHashnode } from "react-icons/fa6";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";
import { arrayUnion, doc, DocumentReference, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/clientApp";
import { linkSync } from "fs";

const platformOptions = [
    {name: 'Github', icon: FaGithub},
    {name: 'Frontend Mentor', icon: ''},
    {name: 'Twitter', icon: FaTwitter},
    {name: 'LinkedIn', icon: FaLinkedin},
    {name: 'YouTube', icon: FaYoutube},
    {name: 'Facebook', icon: FaFacebook},
    {name: 'Twitch', icon: FaTwitch},
    {name: 'Dev.to', icon: FaDev},
    {name: 'Codewars', icon: ''},
    {name: 'Codepen', icon: FaCodepen},
    {name: 'freeCodeCamp', icon: FaFreeCodeCamp},
    {name: 'GitLab', icon: FaGitlab},
    {name: 'HashNode', icon: FaHashnode},
    {name: 'Stack Overflow', icon: FaStackOverflow},
]

const platformNames = platformOptions.map(p => p.name) as [string, ...string[]];

const schema = z.object({
    links: z.array(z.object({
        platform: z.enum(platformNames),
        url: z.string().url('Invalid url').min(2, 'Cannot be empty'),
    }))
})

type LinkFormData = z.infer<typeof schema>

type userData = {
    links: LinkFormData[];
}

const LinkForm = () => {

    const { userEmail } = useAuth();

    const { register, control, reset, formState: { errors }, handleSubmit } = useForm<LinkFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            links: [{platform: 'Facebook', url: ''}],
        }
    })

    const { fields, append, remove } = useFieldArray({
        control, 
        name: 'links'
    });

    const submitLink: SubmitHandler<LinkFormData> = async (data) => {
        if (!userEmail) {
            console.error('Not authenticated');
            return;
        }

        try {
            const userDocRef: DocumentReference = doc(db, 'links', userEmail);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                await setDoc(userDocRef, {links: arrayUnion(...data.links)}, {merge: true})
            } else {
                await setDoc(userDocRef, { links: data.links })
            }

            console.log('Links saved successfully')
        } catch (e) {
            console.error(e)
        }
    };

    return (
        <div>
            <form action="" onSubmit={handleSubmit(submitLink)}>
                <div className="">
                    {fields.map((field, index) => (
                        <div key={field.id}>
                            <div className="flex justify-between mb-3">
                                <p>Link #{index+1}</p>
                                <button type="button" onClick={() => remove(index)}>Remove</button>
                            </div>
                            
                            <div>
                                <label htmlFor="platform" className="block text-sm text-greyDarkest">Platform</label>
                                
                                <select 
                                    {...register(`links.${index}.platform`)} 
                                    className="block w-full border border-greyMediumDarker rounded-lg h-[35px]"
                                >

                                    {platformOptions.map((platform) => (
                                    <option key={platform.name} value={platform.name}>{platform.name}</option>
                                    ))}   
                                </select>
                            </div>
                            
                            <div className="my-3">
                                <label htmlFor="link" className="block text-sm text-greyDarkest">Link</label>
                                <input
                                    type="url"
                                    placeholder="Enter URL"
                                    className="w-full border border-greyMediumDarker rounded-lg h-[35px]"
                                    {...register(`links.${index}.url`)}
                                />
                                {errors.links?.[index]?.url && <p>{errors.links[index]?.url?.message}</p>}
                            </div>
                            <div className="flex justify-end">
                                <button className="bg-deepBlue px-4 py-2 w-fit float-right rounded-lg text-normalWhite" type="submit">Save</button>
                            </div>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    )
}

export default LinkForm