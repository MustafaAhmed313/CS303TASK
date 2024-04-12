import {
    collection,
    addDoc
} from 'firebase/firestore';
import { db } from './config';

const collectionReference = collection(db , 'todos');

const createTodo = async (data) => {
    await addDoc(collectionReference , data);
}

export {
    createTodo,
}
