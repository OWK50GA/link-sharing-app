"use client";

import Image from 'next/image';
import devLinksImg from '../../public/solar_link-circle-bold.png'
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z, ZodType } from "zod";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/clientApp'
import { useRouter } from 'next/navigation';
// import { redirect } from 'next/router';s

const SignUp = () => {

    const schema = z.object({
        email: z.string().email("Invalid email format"),
        password: z.string().min(8, 'Check again'),
    })

    type UserSignInDetails = z.infer<typeof schema>

    const { register, handleSubmit, formState: {errors, touchedFields}, reset } = useForm<UserSignInDetails>({
        resolver: zodResolver(schema)
    })

    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

    const router = useRouter();

    const handleSignIn = async (data: UserSignInDetails) => {
        try {
            const res = await signInWithEmailAndPassword(data.email, data.password)
            console.log({res})
            reset();
            router.push('/home')
        } catch (error) {
            console.error(error)
        }
    }

    return ( 
        <main className='p-5'>
            <div className='flex  sm:ml-0 md:w-fit md:mx-auto h-fit md:mt-28'>
                <Image src={devLinksImg} alt='DevLinks Image'/>
                <p className='font-bold text-3xl'>devlinks</p>
            </div>
            <div className='w-unset md:w-[450px] mx-auto mt-14 bg-normalWhite p-10 rounded-lg'>
                <div className='flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>Login</h2>
                    <p className='text-sm text-greyDarkest'>Add your details below to get back into the app</p>
                </div>
                <div className='mt-7'>
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleSignIn)}>
                        <div>
                            <label htmlFor="email" className='block text-sm font-sans font-light text-greyDarkest'>Email address</label>
                            <input 
                                type="text"
                                className='border border-greyMediumDarker rounded-md w-full h-[35px]'
                                {...register('email')}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className='block text-sm font-sans font-light text-greyDarkest'>Password</label>
                            <input 
                                type="password"
                                className='border border-greyMediumDarker rounded-md w-full h-[35px]'
                                {...register('password')}
                            />
                        </div>
                        <button className='w-full bg-deepBlue text-normalWhite py-2 rounded-md'>
                            Login
                        </button>
                    </form>
                    <div>
                        <p className='text-sm text-greyDarkest w-fit mx-auto mt-4'>
                            Don't have an account? <Link href={'/sign-up'} className='text-deepBlue'>Create Account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
     );
}
 
export default SignUp;