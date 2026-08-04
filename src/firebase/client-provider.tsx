'use client';

import React, { useMemo, useEffect, useState, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const res = useMemo(() => {
    if (typeof window === 'undefined') {
      return { services: null };
    }
    try {
      const services = initializeFirebase();
      return { services };
    } catch (e) {
      return { error: e instanceof Error ? e : new Error(String(e)) };
    }
  }, []);

  if (mounted && res.error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-6 text-zinc-50 font-sans">
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-md shadow-2xl">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-100">Firebase Configuration Error</h2>
          <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
            Failed to initialize Firebase. This usually happens when the Firebase API key is missing or invalid in local development.
          </p>
          <div className="mt-6 rounded-lg bg-zinc-950 p-4 border border-zinc-800">
            <div className="text-xs font-mono text-amber-400 break-all">{res.error.message}</div>
          </div>
          <div className="mt-6 space-y-3">
            <p className="text-xs text-zinc-500">To resolve this locally:</p>
            <ol className="list-decimal list-inside text-xs text-zinc-400 space-y-1">
              <li>Create a <code className="rounded bg-zinc-800 px-1 py-0.5 text-zinc-300">.env</code> file in the root directory.</li>
              <li>Copy the keys from <code className="rounded bg-zinc-800 px-1 py-0.5 text-zinc-300">.env.example</code>.</li>
              <li>Add your Firebase project credentials.</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <FirebaseProvider
      firebaseApp={res.services?.firebaseApp ?? null}
      auth={res.services?.auth ?? null}
      firestore={res.services?.firestore ?? null}
    >
      {children}
    </FirebaseProvider>
  );
}