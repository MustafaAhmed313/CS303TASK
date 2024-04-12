import { useEffect , useState } from 'react'
import { StyleSheet , View , Text , Pressable , Image } from 'react-native';
import { router , Link } from 'expo-router';
import { signOutHandler } from '../firebase/auth';
import { getCurrentUserUuid , getUser } from '../firebase/users';

const Navbar = () => {

    const [uuid , setUuid] = useState('');

    const handleSignOut = () => {
        signOutHandler();
    }

    useEffect(() => {
        setUuid(getCurrentUserUuid());
    });

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Your Todos</Text>
            <View style={styles.logoutBox}>
                <Pressable style={styles.logoutButton} onPress={() => handleSignOut()}>
                    <Text style={styles.logoutText}>Sign Out</Text>
                </Pressable>
                <Pressable onPress={() => router.navigate(`/user/${uuid}`)}>
                    <Image style={{width: 50 , height: 50}} source={require('../assets/images/user.png')}/>
                </Pressable>              
            </View>
        </View>
    );
}

export default Navbar;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2B96E3',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '3%',
        paddingVertical: '1.1%'
    },
    logoutBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '35%',
        justifyContent: 'space-between'
    },
    logoutButton: {
        marginLeft: '5%',
        backgroundColor: 'white',
        padding: '5%',
        borderRadius: 15
    },
    headerText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 25
    },
    logoutText: {
        color: '#2B96E3',
        fontWeight: 'bold',
        fontSize: 15
    },
});