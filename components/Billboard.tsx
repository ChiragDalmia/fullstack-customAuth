import React, { useCallback, useEffect, useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

import PlayButton from '@/components/PlayButton';
import useBillboard from '@/hook/useBillboard';
import useInfoModalStore from '@/hook/useInfoModalStore';

interface BillboardData {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
}

const Billboard: React.FC = () => {
  const { openModal } = useInfoModalStore();
  const { data, isLoading, error } = useBillboard();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 640);
    };

    handleResize(); // Check initial size
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleOpenModal = useCallback(() => {
    if (data) {
      openModal(data.id);
    }
  }, [openModal, data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) return <div className='flex justify-center items-center h-screen text-cyan-100'>Error loading billboard data.</div>;

  return (
    <div className="relative h-[56.25vw]">
      <video poster={data?.thumbnailUrl} className="w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500" autoPlay muted loop src={data?.videoUrl} />
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} />
          <button onClick={handleOpenModal} className="bg-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex items-center hover:bg-opacity-20 transition">
            <InformationCircleIcon className="w-4 md:w-7 mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
