'use client'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/clientApp'
import { useRouter } from 'next/navigation'

export default function Home() {

  const [user] = useAuthState(auth)
  const router = useRouter();

  // if (!user) {
  //   setTimeout(() => {
  //     router.push('/login')
  //   }, 500)
  // } else if (user) {
  //   setTimeout(() => {
  //     router.push('/home')
  //   }, 500)
  // }

  return (
    <main className="">
      Redirecting...
    </main>
  );
}
