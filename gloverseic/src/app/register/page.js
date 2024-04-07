"use client";
import Image from "next/image";
import {useState} from "react";
import Link from "next/link";
import {signIn} from "next-auth/react";

export default function RegisterPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userCreated, setUserCreated] = useState(false);
    const [creatingUser, setCreatingUser] = useState(false);
    const [error, setError] = useState(false);
    async function handleFormSubmit (ev) {
        ev.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        });
        if(response.ok){
            setUserCreated(true);
        }
        else{
            setError(true);
        }
            setCreatingUser(false);
    }
    return(
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl font-bold">Register</h1>
            {userCreated && (
                <div className="my-4 text-center">User created. Now you can{' '}
                    <Link className="underline" href={'/login'}>Login</Link></div>
            )}
            {error && (
                    <div className="my-4 text-center">Error. Please try again later.</div>
                )
            }
            <form className="block max-w-sm mx-auto mt-8" onSubmit={handleFormSubmit}>
                <input type="text" placeholder="email" value={email}
                       disabled={creatingUser}
                       onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" placeholder="password" value={password}
                       disabled={creatingUser}
                        onChange={ev => setPassword(ev.target.value)}/>
                <button type="submit" disabled={creatingUser}>Register</button>
                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>
                <button
                    onClick={() => signIn('google', {callbackUrl: '/'})}
                    className="flex gap-4 justify-center">
                    <Image src={'/google_icon.png'} alt={''} width={20} height={20}/>
                    Login with Google</button>
                <div className="text-center my-4 text-gray-500">Already have an account? {' '}
                    <Link className="underline" href={'/login'}>Login here</Link>
                </div>
            </form>

        </section>
    );
}