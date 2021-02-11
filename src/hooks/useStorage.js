import { useState, useEffect } from 'react';
import { storage, db, timestamp } from '../firebase';

const useStorage = (file, metadata) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    // fires everytime the file dependency changes 
    // everytime a file is uploaded
    useEffect(() => {
        // get a reference to the file in the database
        const storageRef = storage.ref('gallery/'+file.name);
        // get a reference to the collection database 
        const collecttionRef = db.collection('gallery');

        // puts the file at the reference location whenever the state changes
        storageRef.put(file, metadata)
        
        .on('state_changed', (snapshot) => {
            // get the progress of the upload
            let progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progressPercent);
        }, (err) => { 
            setError(err);
        }, async () => { // fires when fully complete
            // get url of the image just uploaded
            const url = await storageRef.getDownloadURL();
            // get the timestamp that the image was created (saved) 
            const createdAt = timestamp;
            // add the image data to the collections database
            collecttionRef.add({ 
                url: url,
                timestamp: createdAt,
                title: file.name,
                caption: file.caption,
                width: file.width,
                height: file.height,
                user: file.user
            });
            setUrl(url);
        });
    }, [file, metadata]);

    return { progress, url, error }
}

export default useStorage;
