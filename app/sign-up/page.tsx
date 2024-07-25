'use client'

import Link from 'next/link';
import devLinksImg from '../../public/solar_link-circle-bold.png'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z, ZodType } from "zod";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import {auth} from '@/firebase/clientApp'
import { useRouter } from 'next/navigation';

const SignUp = () => {

    const schema = z.object({
        email: z.string().email("Invalid email format"),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    })

    type UserAuthDetails = z.infer<typeof schema>

    const { register, handleSubmit, formState: {errors, touchedFields}, reset } = useForm<UserAuthDetails>({
        resolver: zodResolver(schema)
    })

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
    const router = useRouter();

    const handleSignUp = async (data: UserAuthDetails) => {
        try {
            const res = await createUserWithEmailAndPassword(data.email, data.password)
            console.log(res)
            reset();
            router.push('/login')
        } catch (e) {
            console.error(e)
        }
    }

    return ( 

        <main className='p-5'>
            <div className='flex sm:ml-0 md:w-fit md:mx-auto h-fit md:mt-28'>
                <Image src={devLinksImg} alt='DevLinks Image'/>
                <p className='font-bold text-3xl'>devlinks</p>
            </div>
            <div className='w-unset md:w-[450px] mx-auto mt-14 bg-normalWhite p-10 rounded-lg'>
                <div className='flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>Create Account</h2>
                    <p className='text-sm text-greyDarkest'>Let's get you started sharing your links</p>
                </div>
                <div className='mt-7'>
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleSignUp)}>
                        <div>
                            <label htmlFor="email" className='block text-sm font-sans font-light text-greyDarkest'>Email address</label>
                            <input 
                                type="text"
                                className='border border-greyMediumDarker rounded-md w-full h-[35px]'
                                {...register('email')}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className='block text-sm font-sans font-light text-greyDarkest'>Create Password</label>
                            <input 
                                type="password"
                                className='border border-greyMediumDarker rounded-md w-full h-[35px]'
                                {...register('password')}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className='block text-sm font-sans font-light text-greyDarkest'>Confirm Password</label>
                            <input 
                                type="password"
                                className='border border-greyMediumDarker rounded-md w-full h-[35px]'
                                {...register('confirmPassword')}
                            />
                        </div>
                        <button className='w-full bg-deepBlue text-normalWhite py-2 rounded-md'>
                            Create New Account
                        </button>
                    </form>
                    <div>
                        <p className='text-sm text-greyDarkest w-fit mx-auto mt-4'>
                            Already have an account? <Link href={'/login'} className='text-deepBlue'>Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
     );
}
 
export default SignUp;