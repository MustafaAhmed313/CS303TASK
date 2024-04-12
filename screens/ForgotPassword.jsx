import { useState } from 'react';
import { StyleSheet , View , Text , TextInput , Pressable , Image } from 'react-native';
import { Link } from 'expo-router';
import { resetPasswordHandler } from '../firebase/auth';


const ForgotPasword = () => {
    
    const[email , setEmail] = useState('');
    const[error , setError] = useState('');
    const[status , setStatus] = useState('') 

    const HandleForgotPassword = () => {
        resetPasswordHandler(email , setError , setStatus);
    }

    return (
        <View style={styles.container}>
            <View style={[styles.imageBox]}>
                <Image style={{width: 100 , height: 100}} source={require('../assets/images/login.png')} />
            </View>
            <Text style={styles.resetText}>We will send you a reset password email. Enter your email.</Text>
            <View>
                <Text style={[styles.text , styles.inputLabel]}>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(value) => validateStatus(value)}
                    placeholder='example@something.com'
                />
            </View>
            <View style={[styles.inputBox]}>
                {error && <Text style={styles.textError}>{error}</Text>}
                {status && <Text style={styles.status}>{status}</Text>}
            </View>
            <View style={[styles.buttonBox]}>
                <Pressable style={styles.button} onPress={() => HandleForgotPassword()}>
                    <Text style={[styles.text , styles.textButton]}>Send</Text>
                </Pressable>
                <Link href={'/account/login'} style={styles.textLink}>I have an Account. Go to Sign In</Link>
                <Link href={'/account/register'} style={styles.textLink}>I don't have an Account. Go to Sign Up</Link>
            </View>
        </View>
    );
}

export default ForgotPasword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: '#777',
        justifyContent: 'center',
        width: '80%',
        marginHorizontal: '10%'
    },
    text: {
        fontWeight: 'bold'
    },
    input: {
        padding: '1%',
        borderBottomWidth: 5,
        borderColor: '#2B96E3',
        borderRadius: 5,
        marginVertical: '1%',
        fontWeight: 'bold'
    },
    imageBox: {
        alignItems: 'center',
        marginBottom: '10%'
    },
    inputLabel: {
        fontSize: 15
    },
    inputBox: {
        marginTop: '5%'
    },
    buttonBox: {
        alignItems: 'center',
        marginTop: '5%'
    },
    button: {
        backgroundColor: '#2B96E3',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
        padding: '1%',
        borderRadius: 15,
        marginBottom: '5%'
    },
    textButton: {
        color: 'white',
        fontSize: 17
    },
    textLink: {
        color: '#2B96E3',
        textDecorationLine: 'underline',
        marginTop: '1.5%'
    },
    textError: {
        color: 'red',
        fontWeight: '500'
    },
    resetText: {
        fontWeight: 'bold',
        marginBottom: '5%'
    }, 
    status: {
        color: 'green',
        fontWeight: '500',
        textAlign: 'center'
    }
});

