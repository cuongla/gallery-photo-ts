/* eslint-disable import/no-anonymous-default-export */
import {
    ADD_IMAGE,
    GET_IMAGES,
    DELETE_IMAGE,
    GalleryAction,
    GalleryState
} from '../types/galleryTypes';

const initialState: GalleryState = {
    images: [],
    imagesLoaded: false,
}

export default (state = initialState, action: GalleryAction) => {
    switch (action.type) {
        case GET_IMAGES:
            return {
                ...state,
                images: action.payload,
                imagesLoaded: true
            };
        case ADD_IMAGE:
            return {
                ...state,
                images: [action.payload, ...state.images],
            };
        case DELETE_IMAGE:
            return {
                ...state,
                images: [...state.images].filter(image => image.id !== action.payload.id)
            };
        default:
            return state;
    }
}