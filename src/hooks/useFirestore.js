import { useState, useEffect } from 'react';
import { storage, db, timestamp } from '../firebase';

const useFirestore = (collection, username) => {
    // get data from the collection given
    const [docs, setDocs] = useState([]);

    // reroll whenever the collection is updated
    useEffect(() => {
        const unsubscribe = db.collection(collection)
        .where('user', '==', username)
        // .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                let documents = [];
                // loop through all the items in the database collection
                snapshot.forEach(doc => {
                    documents.push({
                        ...doc.data(),
                        id: doc.id
                    })
                });
                setDocs(documents);
            });

            // unsubscribe from this collection when we are no longer using it
            return() => unsubscribe();

    }, [collection])

    return { docs }
}

export default useFirestore;
