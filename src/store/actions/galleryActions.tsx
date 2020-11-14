import { ThunkAction } from 'redux-thunk';

import {
    GET_IMAGES,
    ADD_IMAGE,
    DELETE_IMAGE,
    GalleryAction,
    GalleryImage,
} from '../types/galleryTypes';
import { User } from '../types/authTypes';
import { RootState } from '..';
import firebase from '../../firebase/config';


// Add Image
export const addImage = (files: FileList, user: User, onProgess: (num: number, file: File) => void): ThunkAction<void, RootState, null, GalleryAction> => {
    return async dispatch => {
        Array.from(files).forEach(async (file: File) => {
            const filePath = `images/${user.id}/${new Date().getTime()}-${file.name}`
            const storageRef = firebase.storage().ref(filePath);
            const uploadTask = storageRef.put(file);

            uploadTask.on('state_changed', snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                onProgess(progress, file);
            }, error => {
                console.log(error);
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then(async downloadUrl => {
                    try {
                        const data: GalleryImage = {
                            imageUrl: downloadUrl,
                            fileName: file.name,
                            filePath: filePath,
                            uploaderName: user.firstName,
                            uploaderId: user.id,
                            createdAt: new Date().getTime()
                        }

                        const ref = await firebase.firestore().collection('gallery').add(data);
                        data.id = ref.id;
                        dispatch({
                            type: ADD_IMAGE,
                            payload: data
                        })
                    } catch(err) {
                        console.log(err);
                    }
                }).catch(err => console.log(err)) 
            })
        });
    }
}

// Get Images
export const getImages = (): ThunkAction<void, RootState, null, GalleryAction> => {
    return async dispatch => {
        try {
            const docs = await firebase.firestore().collection('gallery').get();

            // get images from firebase
            // then addto array for displaying
            const arr: GalleryImage[] = [];
            docs.forEach(doc => {
                const { createdAt, fileName, filePath, imageUrl, uploaderName, uploaderId } = doc.data();
                arr.push({ createdAt, fileName, filePath, imageUrl, uploaderName, uploaderId, id: doc.id })
            })

            dispatch({
                type: GET_IMAGES,
                payload: arr
            })
        }catch (err) {

        }
    }
}

// Delete Image
export const deleteImage = (image: GalleryImage, onSuccess: () => void): ThunkAction<void, RootState, null, GalleryAction> => {
    return async dispatch => {
        try{
            const imageRef = firebase.storage().ref().child(image.filePath);
            await imageRef.delete();

            // update firebase
            await firebase.firestore().collection('gallery').doc(image.id).delete();

            // dispatch action 
            dispatch({
                type: DELETE_IMAGE,
                payload: image
            });
            onSuccess();
        } catch(err) {
            console.log(err);
        }
    }
}