// import React, { useState, useEffect } from 'react';
import './Gallery.css';
import React from 'react';
import Nav from '../../components/Navigation/Navbar';
import useFirestore from '../../hooks/useFirestore';
import { useAuth } from '../../contexts/AuthContext';
// import { storage } from '../../firebase';
// import Posts from '../../components/Posts/Post';

const Gallery = () => {
    const { currentUser } = useAuth();
    // const [gallery, setGallery] = useState([]);

    // useEffect(() => {
        // let i = 0; 

        // storage
        //     .ref('gallery/')
        //     .child(`${currentUser.displayName}`)
        //     .listAll()
        //     .then((res) => {
        //         res.items.forEach((item => {
        //             item.getDownloadURL().then((url) => {
        //                 i++;
        //                 console.log(item.name)
        //                 console.log(item)
        //                 console.log(url)

        //                 let img = document.createElement('img');
        //                 img.src = url

        //                 console.log(img)
        //                 console.log(img.width)

        //                 let name = item.name
        //                 setGallery(old => [...old, {i, name, img}]) 
        //             })
        //         }))
        //     }
    // )
    // }, []) // run every single time a gallery item changes


    // Get the images from the gallery database
    const { docs } = useFirestore('gallery', currentUser.displayName);
    console.log(docs); 

    // if(docs.length === 0) {
    //     console.log("no images in gallery");
    //     alert("None");
    // }



    return (
        <div className='container'>
            <Nav />
            <div className="gallery-title">
                <h1>Gallery</h1>
                <div className="gallery-buttons">
                    <a href="#/">New Image</a>
                    <a href="#/">Import Image</a>
                </div>
            </div>
            <div className="gallery-container">
                {/* Check there are images in the gallery database then */}
                {/* loop through all the images and display them */}
                { docs && docs.map(doc => (
                    <div className="wrapper" key={doc.id}>
                        <div className="img-wrap">
                            <img src={doc.url} alt={doc.title} />
                        </div>
                        <div className="img-name">{doc.title}</div>
                    </div>
                )) }
            </div>



            {/* <div className="gallery"> */}

            {/* <div className="feed-container">

                <div className="gallery-container">
                     

                </div>
            </div> */}
                
                {/* { gallery.map(({id, name, img}) => (
                    <div className="gallery-item">
                        <Posts 
                            key={id}
                            postId={id}
                            user={currentUser}
                            username={currentUser.displayName}
                            // caption={post.caption}
                            imageUrl={img.src}
                        />
                        
                    </div>
                ))} */}
                
            {/* </div> */}
        </div>
    )
}

export default Gallery;