import { auth, db } from "@/utils/firebase";
import Message from "@/components/Message";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { BsTrash2Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

export default function Dashboard(){
    const route = useRouter();
    const[user, loading] = useAuthState(auth);
    const[posts, setPosts] = useState([]);

    const getData = async () => {
        if(loading) return;
        if(!user) return route.push("/auth/login");
        const collectionRef = collection(db, 'posts');
        const q = query(collectionRef, where("user", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return unsubscribe;
    }
    // delete a post
    const deletePost = async (id) => {
        const docRef = doc(db, 'posts', id);
        await deleteDoc(docRef);
    }

    useEffect(() =>{
        getData()
    }, [user, loading])

    return(
        <div>
            <h1 className="text-lg font-medium">Your Posts</h1>
            <div>
                {posts.map((post) => {
                    return (
                        <Message key={post.id} {...post}>
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => deletePost(post.id)}
                                    className="flex items-center justify-center text-pink-600 dark:text-pink-400 gap-2 py-2 text-sm"
                                >
                                    <BsTrash2Fill className="text-2xl"/>
                                    Delete
                                </button>
                                <Link href={{pathname: "/post", query: post}}>
                                    <button className="flex items-center justify-center text-teal-600 dark:text-teal-400 gap-2 py-2 text-sm">
                                        <AiFillEdit className="text-2xl"/>
                                        Edit
                                    </button>
                                </Link>
                            </div>
                        </Message>
                    );
                })}
            </div>
            <button className="font-medium text-white bg-gray-600 py-2 px-4 my-6 rounded-md" onClick={() => auth.signOut()}>Sign Out</button>
        </div>
    );
}