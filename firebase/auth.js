import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail 
} from 'firebase/auth';
import { router } from 'expo-router';
import { auth } from './config';
import { createUser } from './users';

const signUpHandler = async (email , firstName , lastName , password , error) => {
    try {
        const cred = await createUserWithEmailAndPassword(auth , email , password);
        const data = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            uuid: cred.user.uid
        }
        createUser(data);
        console.log(cred.user.email);
        router.replace('/home/app');
    } catch (err) {
        const message = err.message.substring(
            err.message.indexOf(':') 
        )
        error(message.substring(2));
        console.log(err.message);
    }
}

const signInHandler = async (email , password , error) => {
    try {
        const cred = await signInWithEmailAndPassword(auth , email , password);
        console.log(cred.user.email);
        router.replace('/home/app');
    } catch (err) {
        const message = err.message.substring(
            err.message.indexOf(':') 
        )
        error(message.substring(2));
        console.log(err.message);
    }
}

const signOutHandler = async () => {
    await signOut(auth);
    router.replace('/account/login');
}

const resetPasswordHandler = async (email , error , status) => {
    try {
        await sendPasswordResetEmail(auth , email);
        status('The reset password email has been sent. check your email inbox!');
        error('');
    } catch (err) {
        const message = err.message.substring(
            err.message.indexOf(':') 
        )
        error(message.substring(2));
        status('');
        console.log(err.message);
    }
}

export {
    signUpHandler,
    signInHandler,
    signOutHandler,
    resetPasswordHandler
}