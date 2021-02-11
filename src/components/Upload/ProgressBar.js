import './ProgressBar.css';
import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';

const ProgressBar = ({file, setUploading, metadata, title, caption, size, setOpen, user}) => {
    // Set the image title and caption
    file.name = title;
    file.caption = caption;
    file.width = size[0];
    file.height = size[1];
    file.user = user;

    // Store the image into the firebase storage
    const { progress, url, error} = useStorage(file, metadata);
    console.log(progress, url);
    console.log(error);
    
    useEffect(() => {
        // Once the file is fully uploaded and a url is created
        // get rid of the progress bar
        console.log("url: "+url)
        if(url) {
            
            // console.log(setUploading())
            setUploading(null);
            // Close dialog box
            setOpen(false)
        }
    }, [url, setUploading, setOpen]);

    return (
        <div className='progress-bar' style={ {width: progress + '%'} }></div>
    )
}
 
export default ProgressBar;  
