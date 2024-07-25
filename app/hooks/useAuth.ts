import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"

export const useAuth = () => {
    const [userEmail, setUserEmail] = useState<string | null>(null)

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email)
            } else {
                setUserEmail(null)
            }
        })

        return () => unsubscribe();
    }, [])

    return { userEmail }
}