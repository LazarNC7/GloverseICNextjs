"use client";
import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {signIn} from "next-auth/react";


export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);
    async function handleFormSubmit(ev){
        ev.preventDefault();
        setLoginInProgress(true);

        await signIn('credentials', {email, password, callbackUrl: '/'});
        setLoginInProgress(false);
    }
    return(
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl font-bold ">
                Login
            </h1>
            <form className="block max-w-sm mx-auto mt-8" onSubmit={handleFormSubmit}>
                <input type="text" name="email" placeholder="email" value={email}
                       disabled={loginInProgress}
                       onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" name="password" placeholder="password" value={password}
                       disabled={loginInProgress}
                       onChange={ev => setPassword(ev.target.value)}/>
                <button disabled={loginInProgress} type="submit">Login</button>
                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>
                <button type="button" onClick={() => signIn('google', {callbackUrl: '/'})}
                        className="flex gap-4 justify-center">
                    <Image src={'/google_icon.png'} alt={''} width={20} height={20}/>
                    Login with Google</button>
                <div className="text-center my-4 text-gray-500">Not having an account? {' '}
                    <Link className="underline" href={'/register'}>Register here</Link>
                </div>

            </form>
        </section>
    );
}