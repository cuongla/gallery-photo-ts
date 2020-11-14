export const GET_IMAGES = 'GET_IMAGES';
export const ADD_IMAGE = 'ADD_IMAGE';
export const DELETE_IMAGE = 'DELETE_IMAGE';

// Gallery actions
export interface GalleryImage {
    id?: string,
    imageUrl: string;
    filePath: string;
    fileName: string;
    createdAt: number;
    uploaderName: string;
    uploaderId: string;
}

export interface GalleryState {
    images: GalleryImage[];
    imageLoaded: boolean;
}

interface AddImageAction {
    type: typeof ADD_IMAGE;
    payload: GalleryImage;
}

interface GetImageAction {
    type: typeof GET_IMAGES;
    payload: GalleryImage[];
}

interface DeleteImageAction {
    type: typeof DELETE_IMAGE;
    payload: GalleryImage;
}

export type GalleryAction = AddImageAction | GetImageAction | DeleteImageAction;