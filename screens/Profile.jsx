import { useEffect, useState , useLayoutEffect } from 'react';
import { StyleSheet , View , Text , TextInput , Pressable , Image , Modal} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getUser , updateUser } from '../firebase/users';

const Profile = () => {

    const { uid } = useLocalSearchParams();
    const [user , setUser] = useState({
        email: '',
        firstName: '',
        lastName: '',
        uuid: ''
    });
    const [visible , setVisible] = useState(false);
    const[firstName , setFirstName] = useState('');
    const[lastName , setLastName] = useState('');
    
    const fetchUserData = async () => {
        const data = await getUser(uid);
        if (data) {
            setUser(data);
        }
    }

    const handleEditUser = async () => {
        const data = {}
        data.firstName = (firstName) ? firstName : user.firstName; 
        data.lastName = (lastName) ? lastName : user.lastName; 
        setUser(await updateUser(data , uid));
        setVisible(false);
    }
    
    useLayoutEffect(() => {
        fetchUserData();
    } , []);
    
    return (
        <View style={styles.container}>
            <View style={[styles.imageBox]}>
                <Image style={{width: 100 , height: 100}} source={require('../assets/images/user.png')} />
            </View>
            <View style={styles.details}>
                <Text style={styles.label}><Text style={styles.text}>First Name:</Text> {user.firstName}  </Text>
                <Text style={styles.label}><Text style={styles.text}>Last Name:</Text> {user.lastName} </Text>
                <Text style={styles.label}><Text style={styles.text}>Email:</Text> {user.email} </Text>
            </View>
            <View style={[styles.buttonBox]}>
                <Pressable style={styles.button} onPress={() => setVisible(true)}>
                    <Text style={[styles.textButton]}>Edit</Text>
                </Pressable>
            </View>
            <Modal 
            visible={visible}
            style={styles.modal}
            animationType='slide'
            presentationStyle='pageSheet' 
            onRequestClose={() => setVisible(false)}>
                <View style={[styles.inputBox]}>
                    <Text style={[styles.text , styles.inputLabel]}>First Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={firstName}
                        onChangeText={(value) => setFirstName(value)}
                        placeholder={user.firstName}
                    />
                </View>
                <View style={[styles.inputBox]}>
                    <Text style={[styles.text , styles.inputLabel]}>Last Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={lastName}
                        onChangeText={(value) => setLastName(value)}
                        placeholder={user.lastName}
                    />
                </View>
                <View style={[styles.buttonBox , styles.modalButtonBox]}>
                    <Pressable style={[styles.button , styles.cancelButton]} onPress={() => setVisible(false)}>
                        <Text style={[styles.textButton]}>Cancel</Text>
                    </Pressable>
                    <Pressable style={[styles.button , styles.saveButton]} onPress={() => handleEditUser()}>
                        <Text style={[styles.textButton]}>Save</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: '#777',
        justifyContent: 'center',
        width: '80%',
        marginHorizontal: '10%',
        height: '50%',
    },
    imageBox: {
        alignItems: 'center',
        marginBottom: '20%',
    },
    text: {
        fontWeight: 'bold',
        color: '#2B96E3',
    },
    label: {
        marginVertical: '2.5%',
        fontSize: 20,
        borderBottomWidth : 5,
        borderRadius: 5,
        borderColor: '#2B96E3',
        paddingVertical: '3%'
    },
    buttonBox: {
        alignItems: 'center',
        marginTop: '20%'
    },
    button: {
        backgroundColor: '#edc511',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
        padding: '1%',
        borderRadius: 15,
    },
    modalButtonBox: {
        width: '80%',
        marginTop: '10%',
        marginHorizontal: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cancelButton: {
        backgroundColor: '#fc0341',
        width: '48%'
    },
    saveButton: {
        backgroundColor: '#07e685',
        width: '48%'
    },
    textButton: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    text: {
        fontWeight: 'bold'
    },
    input: {
        padding: '1%',
        borderBottomWidth: 5,
        borderColor: '#edc511',
        borderRadius: 5,
        marginVertical: '1%',
        fontWeight: 'bold'
    },
    inputLabel: {
        fontSize: 15
    },
    inputBox: {
        marginTop: '5%',
        marginHorizontal: '10%'
        
    },
})