import Message from "@/components/Message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "@/utils/firebase";
import { toast } from "react-toastify";
import { Timestamp, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";

export default function Details() {
    const router = useRouter();
    const routeData = router.query;
    const [messages, setMessages] = useState('');
    const [allMessages, setAllMessages] = useState([]);

    const submitMessage = async () => {
        if (!auth.currentUser) return router.push("/auth/login");
        if (!messages) {
            toast.error("Don't Leave An Empty Message 😐", {
                position: "top-center",
                autoClose: 1500,
            });
            return;
        }
        if (messages.length > 300) {
            toast.error("Message Too Long 😐", {
                position: "top-center",
                autoClose: 1500,
            });
            return;
        }
        const docRef = doc(db, 'posts', routeData.id);
        await updateDoc(docRef, {
            comments: arrayUnion({
                messages,
                avatar: auth.currentUser.photoURL,
                userName: auth.currentUser.displayName,
                time: Timestamp.now(),
            }),
        });
        setMessages("");
    }

    const getComments = async() => {
        const docRef = doc(db, 'posts', routeData.id);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            setAllMessages(snapshot.data().comments);
        });
        return unsubscribe;
    }

    useEffect(() => {
        if (!router.isReady) return;
        getComments();
    }, [router.isReady]);

    return (
        <div>
            <Message {...routeData}>
                <div className="my-4">
                    <div className="flex">
                        <input
                            type="text"
                            value={messages}
                            onChange={(e) => setMessages(e.target.value)}
                            placeholder="Send A Message 😃"
                            className="bg-gray-800 text-white w-full p-2 text-sm rounded-md focus:outline-none"
                        />
                        <button onClick={submitMessage} className="bg-cyan-500 dark:bg-cyan-700 text-white py-2 px-4 text-sm ml-2 rounded-md">Submit</button>
                    </div>
                    <div className="py-6">
                        <h2 className="font-bold">All Comments</h2>
                        {allMessages?.map((message) => (
                            <div className="bg-white dark:bg-[#030c1e] border-2 p-4 m-4" key={message.time}>
                                <div className="flex items-center gap-2 mb-4">
                                    <img className="rounded-full w-10" src={message.avatar} alt="avatar" />
                                    {message.userName === "Aman Shahid" ? <h2 className="text-cyan-800 dark:text-amber-400">Aman Shahid (Dev)</h2> : <h2>{message.userName}</h2>}
                                </div>
                                <h2>{message.messages}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </Message>
        </div>
    )
}