import React, {FC, useRef, FormEvent} from 'react';
import Button from './Button';

interface FileUploadProps {
    onChange: (e: FormEvent<HTMLInputElement>) => void
}

const FileUpload: FC<FileUploadProps> = ({ onChange }) => {
    const fileInput = useRef<HTMLInputElement>(null);

    const pickImageButtonClickHandler = () => {
        if(fileInput.current) {
            fileInput.current.click();
        }
    }

    return (
        <div className="file-upload">
            <input 
                type="file"
                onChange={onChange}
                className="is-hidden"
                multiple
                ref={fileInput}
            />
            <Button 
                text="Add Images"
                onClick={pickImageButtonClickHandler}
                type="button"
                className="is-link"
            />
        </div>
    )
}


export default FileUpload;