'use client'

import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const [message, setMessage] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    console.log("fetching")
    fetch('http://localhost:4000', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Welcome to our Full Stack App</h1>
      <p className="text-xl mb-4">{message}</p>
      {session ? (
        <>
          <p>Signed in as {session?.user?.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <button onClick={() => signIn('google')}>Sign in with Google</button>
      )}
    </main>
  );
}
