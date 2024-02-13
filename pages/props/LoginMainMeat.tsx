
import React, { useCallback, useState, useMemo, useEffect } from 'react';
import Input from '../components/Input';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

interface MainMeatProps {
  // Add any props if needed
}


const LoginMainMeat: React.FC<MainMeatProps> = () => {
const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [variant, setVariant] = useState<"login" | "signup">("login");

  const toggleVariant = useCallback(() => {
    setVariant(currentVariant => currentVariant === "login" ? "signup" : "login");
  }, []);

  const { heading, bottomMessage, bottomLink } = useMemo(() => ({
    heading: variant === "login" ? 'Sign in' : 'Register',
    bottomMessage: variant === "signup" ? 'Have an account already?' : 'First time baby girl?',
    bottomLink: variant === "signup" ? 'Sign in' : 'Register'
  }), [variant]);

  const renderInput = (label: string, value: string, setValue: React.Dispatch<React.SetStateAction<string>>, type: string, id: string) => (
    <Input 
      label={label}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      id={id}
      type={type}
      value={value}
    />
  );

  const [divLoaded, setDivLoaded] = useState(false);
  useEffect(() => {
    // Trigger the transition after the component has mounted
    setTimeout(()=>setDivLoaded(true),800)
  }, []);

  const login = useCallback(async()=>{
    try {
      await signIn('credentials',{
        email,
        password,
        redirect: false,
        callbackUrl: '/'
      })

      router.push('/');
    } catch (error) {
      console.log(error)
    }
  },[email , password, router])

  const register = useCallback(async()=>{
    try {
      await axios.post('/api/register',{
        email,
        name,
        password,
      });

      login();
    } catch (error) {
      console.log(error)
    }
  },[email , name, password, login]);

  

  const handleSubmit = useCallback(async () => {
    if (variant === 'signup') {
      await register();
    } else {
      await login();
    }
  }, [variant, login, register]);


  return (
    <div className={`bg-black bg-opacity-70 lg:px-16 lg:py-16 m:px-12 md:px-12 sm:px-10 sm:py-10 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-4/5 
    transition-all duration-500 ease-in-out ${divLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} z-0`}>
      <h2 className='text-white text-4xl mb-8 font-semibold'>{heading}</h2>
      <div className="flex flex-col gap-4">
        {renderInput('Email', email, setEmail, 'email', 'email')}

        {variant === 'signup' && renderInput('Username', name, setName, 'text', 'name')}
        {renderInput('Password', password, setPassword, 'password', 'password')}

      </div>

      

      <button onClick={handleSubmit} className="auth-login-button">{heading}</button>

      <p className='text-neutral-500 mt-12'>
        {bottomMessage}
        <span className='text-white ml-1 hover:underline cursor-pointer' onClick={toggleVariant}>
          {bottomLink}
        </span>
      </p>
    </div>
  );
}


export default LoginMainMeat;