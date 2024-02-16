import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import useMovie from '@/hook/useMovie';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data, isLoading, error } = useMovie(movieId as string);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Failed to load movie data.</div>;
  }

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <ArrowLeftIcon onClick={() => router.push('/')} className="w-6 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
        <p className="text-white text-xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {data?.title}
        </p>
      </nav>
      <video className="h-full w-full object-contain" autoPlay controls src={data?.videoUrl}></video>
    </div>
  );
};

export default Watch;
