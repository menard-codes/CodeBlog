import React, { useState } from 'react'
import { storage, firebase } from '../../app/firebaseApp';
import Error from '../../components/elements/Error';
import ImageUploadStyles from './ImageUpload.module.css';
import Clipboard from 'react-clipboard.js';
import { v4 as uuidv4 } from 'uuid'


function ImageUpload() {
    const metadata = {contentType: 'image/jpeg'};
    const [uploading, setUploading] = useState(false);
    const [uploadPercent, setUploadPercent] = useState(0);
    const [error, setError] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [copyMsg, setCopyMsg] = useState('');

    const handleUpload = file => {
        // upload file
        const folderRef = storage.ref(`/blogs/${uuidv4()}`);
        const uploadTask = folderRef.put(file, metadata);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
            const percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setUploading(true);
            setUploadPercent(percentage);
        }, error => {
            setError(error.code);
            setUploading(false);
        }, async () => {
            const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
            setImageUrl(downloadUrl);
            setUploading(false);
        })
    }

    return (
        <>
            {error && <Error msg={error} />}
            <label forhtml="uploadImg" className={ImageUploadStyles.fileUploadContainer}>
                <input
                    type="file"
                    id="uploadImg"
                    name="uploadImg"
                    onChange={e => handleUpload(e.target.files[0])}
                    accept="image/*"
                    className={ImageUploadStyles.fileUpload}
                />
                Upload Image for this Blog
            </label>
            {uploading && <p>Uploading... {uploadPercent}%</p>}
            {imageUrl && (
                <div className={ImageUploadStyles.successUpload}>
                    <div>
                        Success!
                        <Clipboard
                            data-clipboard-text={`![edit alt text](${imageUrl})`}
                            className={ImageUploadStyles.copy}
                            onClick={() => {
                                setCopyMsg('Copied to Clipboard')
                                setTimeout(() => setCopyMsg(''), 2000);
                            }}
                        >
                            {copyMsg || 'Copy Image MarkDown'}
                        </Clipboard>
                    </div>
                    <button className={ImageUploadStyles.exitBtn} onClick={() => setImageUrl('')}>
                        X
                    </button>
                </div>
            )}
        </>
    )
}

export default ImageUpload
