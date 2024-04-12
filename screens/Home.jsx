import { useEffect, useState , useLayoutEffect } from 'react'
import { StyleSheet , View , Text , TextInput , Pressable , Image , Modal } from 'react-native';
import { Link } from 'expo-router';
import { signUp } from '../firebase/auth';
import Navbar from '../components/Navbar';
import { MaterialIcons } from '@expo/vector-icons';
import { getCurrentUserUuid } from '../firebase/users';

const Home = () => {

    const [uid , setUid] = useState('');
    const [visible , setVisible] = useState(false);
    const [title , setTitle] = useState('');
    const [content , setContent] = useState('');

    const handleAddTodo = () => {

    }

    useLayoutEffect(() => {
        setUid(getCurrentUserUuid);
    } , [])

    return (
        <View>
            <Navbar />
            <View style={styles.container}>
                <View style={styles.addButtonBox}>
                    <Pressable style={styles.addTodoButton} onPress={() => setVisible(true)}>
                        <MaterialIcons
                            name='add'
                            size={30}
                            style={styles.addIcon} 
                        />
                        <Text style={styles.textButton}>Add Todo</Text>
                    </Pressable>
                </View>
            </View>
            <Modal
            visible={visible}
            style={styles.modal}
            animationType='slide'
            presentationStyle='pageSheet' 
            onRequestClose={() => setVisible(false)}>
                <View style={[styles.inputBox]}>
                    <Text style={[styles.text , styles.inputLabel]}>Title:</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={(value) => setTitle(value)}
                        placeholder={'Todo title!'}
                    />
                </View>
                <View style={[styles.inputBox]}>
                    <Text style={[styles.text , styles.inputLabel]}>Content:</Text>
                    <TextInput
                        style={styles.input}
                        value={content}
                        onChangeText={(value) => setContent(value)}
                        placeholder={'Todo content'}
                    />
                </View>
                <View style={[styles.buttonBox , styles.modalButtonBox]}>
                    <Pressable style={[styles.button , styles.cancelButton]} onPress={() => setVisible(false)}>
                        <Text style={[styles.textButton]}>Cancel</Text>
                    </Pressable>
                    <Pressable style={[styles.button , styles.createButton]} onPress={() => handleEditUser()}>
                        <Text style={[styles.textButton]}>Create</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        borderColor: '#777',
        justifyContent: 'center',
        width: '80%',
        marginHorizontal: '10%'
    },
    addTodoButton: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: '2.5%',
        alignItems: 'center',
        backgroundColor: '#07e685',
        marginHorizontal: '30%',
        marginVertical: '5%',
        borderRadius: 15

    },
    textButton: {
        fontWeight: 'bold',
        color: 'white',
        marginRight: '5%'
    },
    addIcon: {
        color: 'white',
        marginLeft: '5%'
    },
    modalButtonBox: {
        width: '80%',
        marginTop: '10%',
        marginHorizontal: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: '#edc511',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
        padding: '1%',
        borderRadius: 15,
    },
    addButtonBox: {
        alignItems: 'center',
        marginTop: '2%'
    },
    buttonBox: {
        alignItems: 'center',
        marginTop: '20%'
    },
    cancelButton: {
        backgroundColor: '#fc0341',
        width: '48%'
    },
    createButton: {
        backgroundColor: '#07e685',
        width: '48%'
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
    inputLabel: {
        fontSize: 15
    },
    inputBox: {
        marginTop: '5%',
        marginHorizontal: '10%'
        
    },
});