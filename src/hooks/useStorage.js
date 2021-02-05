import { useState, useEffect } from 'react';
// import firebase from 'firebase';
// import { useAuth } from '../../contexts/AuthContext';
import { storage } from '../firebase';

const useStorage = (file, metadata) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    // upload the image to storage

    // fires everytime the file dependency changes 
    // everytime a file is uploaded
    useEffect(() => {
        // get a reference to the file in the database
        const storageRef = storage.ref('gallery/'+file.name);
        // puts the file at the reference location whenever the state changes
        storageRef.put(file, metadata)
        // .then(function(snapshot) {
        //     console.log("Uploaded", snapshot.totalBytes, "bytes.");
        // });
        .on('state_changed', (snapshot) => {
            // get the progress of the upload
            let progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progressPercent);
        }, (err) => { 
            setError(err);
        }, async () => { // fires when fully complete
            // get url of the image just uploaded
            const url = await storageRef.getDownloadURL();
            setUrl(url);
        });
    }, [file, metadata]);

    return { progress, url, error }
}

export default useStorage;
