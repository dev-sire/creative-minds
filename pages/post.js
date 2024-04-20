import { auth, db } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Post() {
    //State that stores form data

    const [post, setPost] = useState({ description: "" });
    const [user, loading] = useAuthState(auth);
    const route = useRouter();
    const routeData = route.query;

    // Handling Submit: restrict from sending empty description or too long description
    // check if post already exist or you are to make a new one
    const submitPost = async (e) => {
        e.preventDefault();
        // Make a new Post
        if (!post.description) {
            toast.error("Description Field Empty. 😃", {
                position: "top-center",
                autoClose: 1500,
            });
            return;
        }
        if (post.description.length > 300) {
            toast.error("Description Too Long. 😢", {
                position: "top-center",
                autoClose: 1500,
            });
            return;
        }

        // If it is an existing post, update it using docRef
        if (post?.hasOwnProperty("id")) {
            const docRef = doc(db, 'posts', post.id);
            const updatedPost = { ...post, timestamp: serverTimestamp() };
            await updateDoc(docRef, updatedPost);
            return route.push('/');
        }
        else {
            // Make a new Post by default 
            const collectionRef = collection(db, 'posts');
            await addDoc(collectionRef, {
                ...post,
                timestamp: serverTimestamp(),
                user: user.uid,
                avatar: user.photoURL,
                username: user.displayName,
            });
            setPost({ description: "" });
            toast.success("Post has been Made 🎉",{
                position: "top-center",
                autoClose: 1500,
            });
            return route.push("/");
        }
    }

    // check if the user is logged in to access this route
    const checkuser = async () => {
        if (loading) return;
        if (!user) route.push("/auth/login");
        if (routeData.id) {
            setPost({ description: routeData.description, id: routeData.id });
        }
    }

    useEffect(() => {
        checkuser();
    }, [user, loading]);

    return (
        <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
            <form onSubmit={submitPost}>
                <h1 className="text-2xl font-bold">
                    {post.hasOwnProperty("id") ? 'Edit Your Post' : 'Create A New Post'}
                </h1>
                <div className="py-2">
                    <h3 className="text-lg font-medium py-2">Description</h3>
                    <textarea
                        value={post.description}
                        onChange={(e) => setPost({ ...post, description: e.target.value })}
                        className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm resize-none focus:outline-none">
                    </textarea>
                    <p className={`text-cyan-600 font-medium text-sm ${post.description.length > 300 ? "text-red-600" : ''}`}>
                        {post.description.length}/300
                    </p>
                </div>
                <button type="submit" className="w-full p-2 my-2 bg-cyan-600 text-white font-medium rounded-lg text-sm">Submit</button>
            </form>
        </div>
    );
}