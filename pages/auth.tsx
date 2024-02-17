import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';
import { NextPageContext } from 'next';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import Input from '@/components/Input';
import Image from 'next/image';

// Constants for routes, API endpoints, and image paths
const LOGIN_ROUTE = '/';
const PROFILE_ROUTE = '/profiles';
const REGISTER_API = '/api/register';
const LOGO_IMAGE = '/images/logo.png';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (session) {
    return { redirect: { destination: PROFILE_ROUTE, permanent: false } };
  }
  return { props: {} };
}

const Auth: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [variant, setVariant] = useState<'login' | 'register'>('login');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const toggleVariant = useCallback(() => {
    setVariant(prevVariant => prevVariant === 'login' ? 'register' : 'login');
    setErrorMessage(''); // Clear error message on variant toggle
  }, []);

  const handleError = (error: any) => {
    setLoading(false); // Stop loading on error
    setErrorMessage(error.message || 'An error occurred, please try again.');
  };

  const performSignIn = useCallback(async (provider: string, options: any) => {
    setLoading(true);
    try {
      await signIn(provider, options);
      router.push(PROFILE_ROUTE);
    } catch (error) {
      handleError(error);
    }
  }, [router]);

  const validateCredentials = useCallback(() => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Email and password cannot be empty.');
      return false;
    }
    return true;
  }, [email, password]);

  const validateRegistration = useCallback(() => {
    if (!email.trim() || !name.trim() || !password.trim()) {
      setErrorMessage('Email, username, and password cannot be empty.');
      return false;
    }
    return true;
  }, [email, name, password]);

  const login = useCallback(() => {
    if (!validateCredentials()) return;
    setLoading(true);
    performSignIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: PROFILE_ROUTE
    });
  }, [email, password, performSignIn, validateCredentials]);

  const register = useCallback(async () => {
    if (!validateRegistration()) return;
    setLoading(true);
    try {
      await axios.post(REGISTER_API, { email, name, password });
      login();
    } catch (error) {
      handleError(error);
    }
  }, [email, name, password, login, validateRegistration]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.png')] bg-no-repeat bg-center bg-fixed bg-cover overflow-x-hidden overflow-y-hidden">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
        <Image src={LOGO_IMAGE} className="h-12" alt="Logo" width={200} height={12} />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  id="name"
                  type="text"
                  label="Username"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} 
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email address"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
              />
              <Input
                type="password" 
                id="password" 
                label="Password" 
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
              />
            </div>
            <button 
              onClick={variant === 'login' ? login : register} 
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition disabled:bg-red-500" 
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div onClick={() => performSignIn('google', { callbackUrl: PROFILE_ROUTE })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle size={32} />
              </div>
              <div onClick={() => performSignIn('github', { callbackUrl: PROFILE_ROUTE })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FaGithub size={32} />
              </div>
            </div>
            <p className="text-neutral-500 mt-5">
              {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
              <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
}


export default Auth;
