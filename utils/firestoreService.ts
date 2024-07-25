import { db } from "@/firebase/clientApp"
import { doc, getDoc } from "firebase/firestore"

export const fetchUserLinks = async (userId: string) => {
    try {
        const userDocRef = doc(db, 'links', userId)
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            let links = userDoc.data().links || [];
            console.log(links)
            return links
        } else {
            console.error('No such document');
            return []
        }
    } catch(error) {
        console.error('Error in fetching document: ', error);
        return []
    }
}

export const fetchUserDetails = async (userId: string) => {
    try {
        const userDetailsRef = doc(db, 'users', userId)
        const userDetails = await getDoc(userDetailsRef)

        if (userDetails.exists()) {
            let details = userDetails.data() || {}
            console.log(details)
            return details
        } else {
            console.error('No such User');
            return {}
        }
    } catch (error) {
        console.error('Error in fetching document: ', error);
        return {}
    }
}