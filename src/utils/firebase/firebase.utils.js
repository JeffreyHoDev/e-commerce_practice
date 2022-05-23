import { initializeApp } from 'firebase/app';
import { getAuth, 
    signInWithPopup, 
    signInWithRedirect, 
    signOut, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9szFHVgc7cKylFB1pEtGJjeoXmybdTao",
    authDomain: "e-commerce-practice-87f0f.firebaseapp.com",
    projectId: "e-commerce-practice-87f0f",
    storageBucket: "e-commerce-practice-87f0f.appspot.com",
    messagingSenderId: "701161786361",
    appId: "1:701161786361:web:8f6fafb6c15b7ecea94b28"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

// Firestore database
export const db = getFirestore();
// collection -> document -> data
export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid ) // get document, [database, collection name, document name]
    // console.log(userDocRef)
    const userSnapshot = await getDoc(userDocRef)

    // if user data exist
        // return userDocRef
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, { 
                displayName, 
                email, 
                createdAt,
                ...additionalInformation
            })
        }catch(err){
            console.log(err.message)
        }
    }

    return userDocRef
    //if user data not exist
        // create doc from usersnapshot
}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return ;

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return ;

    return await signInWithEmailAndPassword(auth, email, password)
}


export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)