'use client';
import { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSignIn = () => {
    signInWithEmailAndPassword(email, password);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">Welcome Back</h2>

        {error && (
          <div className="mb-4 text-red-600 text-center">
            {error.message === "Firebase: Error (auth/user-not-found)." && "No user found with this email."}
            {error.message === "Firebase: Error (auth/wrong-password)." && "Incorrect password."}
            {!["Firebase: Error (auth/user-not-found).", "Firebase: Error (auth/wrong-password)."].includes(error.message) && error.message}
          </div>
        )}

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400"
        />

        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400"
        />

        <button
          onClick={handleSignIn}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Sign In
        </button>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/sign-up" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
