import Message from "@/components/Message";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  // A local state that holds all posts data
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  }

  useEffect(() => {
    getPosts()
  }, []);

  return (
    <>
    <Head>
      <link rel="icon" type="image/png" href="/favicon.png" />
      <title>Creative Minds | Share Your Thoughts with Others | By DevSire</title>
    </Head>
    <div className="my-12 text-md font-medium">
      <h2 className="font-bold text-lg">See what other people are saying</h2>
      {allPosts.map((post) => {
        return (
          <Message key={post.id} {...post}>
            <Link href={{ pathname: `/${post.id}`, query: {...post} }}>
              <button>
                {post.comments?.length > 0 ? post.comments?.length : 0} Comments
              </button>
            </Link>
          </Message>
        )
      })}
    </div>
    </>
  );
}