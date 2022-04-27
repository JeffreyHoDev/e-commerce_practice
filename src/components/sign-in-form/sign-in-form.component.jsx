import { useState } from 'react'
import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import './sign-in-form.styles.scss'

const defaultFormFields = {
    "email": "",
    "password": ""
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields;

    const signInWithGoogle = async() => {
        const { user } = await signInWithGooglePopup()
        await createUserDocumentFromAuth(user)
    }
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({...formFields, [name]: value})
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
            try {
                const response = await signInAuthUserWithEmailAndPassword(email,password)
                console.log(response)
                resetFormFields()
            }catch(err){
                switch(err.code){
                    case 'auth/wrong-password':
                        alert("incorrect password for email")
                        break;
                    case 'auth/user-not-found':
                        alert("user not exist")
                        break;
                    default:
                        console.log(err)
                }
            }
    }

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                <div className='buttons-container'>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
                    <Button type="submit">Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;