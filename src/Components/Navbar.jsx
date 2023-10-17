'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Navbar() {
    const [user, setUser] = useState(null);

    async function handleLogin() {
        setUser(() => axios.get('/api/auth/login'));
    }

    async function handleLogout() {
        setUser(null);
    }

    return (
        <header className="absolute flex flex-row justify-between px-20 py-4 bg-blue-400 border-b-2 border-black w-full">
            <h1 className="uppercase font-bold text-3xl">SAM</h1>

            <nav className="flex flex-row gap-4 text-xl">
                <div className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center inline-flex items-center">
                    <h1 className="">Name of the user</h1>
                </div>

                {user ? (
                    <button
                        className="border rounded-lg px-2 py-1 border-black"
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                ) : (
                    <button
                        className="border rounded-lg px-2 py-1 border-black"
                        onClick={handleLogin}
                    >
                        Log In
                    </button>
                )}
            </nav>
        </header>
    );
}
