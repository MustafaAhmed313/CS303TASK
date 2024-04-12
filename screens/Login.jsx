import { useState} from 'react'
import { StyleSheet , View , Text , TextInput , Pressable , Image } from 'react-native';
import { Link , router } from 'expo-router';
import { signInHandler } from '../firebase/auth';

const Login = () => {
    
    const[email , setEmail] = useState('');
    const[password , setPassword] = useState('');
    const[error , setError] = useState('');

    const handleSignIn = () => {
        signInHandler(email , password , setError);
    }

    return (
        <View style={styles.container}>
            <View style={[styles.imageBox]}>
                <Image style={{width: 100 , height: 100}} source={require('../assets/images/login.png')} />
            </View>
            <View>
                <Text style={[styles.text , styles.inputLabel]}>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    placeholder='example@something.com'
                />
            </View>
            <View style={[styles.inputBox]}>
                <Text style={[styles.text , styles.inputLabel]}>Password:</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    placeholder='strong password'
                    secureTextEntry
                />
            </View>
            <View style={[styles.inputBox]}>
                {error && <Text style={styles.textError}>{error}</Text>}
                <Link style={styles.textLink} href='/account/forgotPassword'>Forgot Password?</Link>
            </View>
            <View style={[styles.buttonBox]}>
                <Pressable style={styles.button} onPress={() => handleSignIn()}>
                    <Text style={[styles.text , styles.textButton]}>Sign In</Text>
                </Pressable>
                <Link href={'/account/register'} style={styles.textLink}>I don't have an Account. Go to Sign Up</Link>
            </View>
        </View>
    );
}

export default Login;

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
    }
});