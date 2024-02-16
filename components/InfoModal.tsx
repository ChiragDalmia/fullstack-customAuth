import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import PlayButton from '@/components/PlayButton';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hook/useInfoModalStore';
import useMovie from '@/hook/useMovie';

interface InfoModalProps {
  visible?: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible = false, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(visible);

  const { movieId } = useInfoModalStore();
  const { data } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-80 transition duration-300">
      <div className="w-auto max-w-3xl mx-auto overflow-hidden rounded-md relative">
        <div className={`relative flex-auto transform duration-300 bg-zinc-900 drop-shadow-md ${isVisible ? 'scale-100' : 'scale-0'}`}>

          <div className="relative h-96">
            <video poster={data?.thumbnailUrl} autoPlay muted loop src={data?.videoUrl} className="object-cover w-full h-full brightness-[60%]" />
            <button onClick={onClose} className="absolute top-3 right-3 flex items-center justify-center w-10 h-10 rounded-full bg-black bg-opacity-70">
              <XMarkIcon className="w-6 text-white" />
            </button>
            <div className="absolute left-10 bottom-[10%]">
              <p className="text-3xl font-bold text-white md:text-4xl lg:text-5xl mb-8">
                {data?.title}
              </p>
              <div className="flex items-center gap-4">
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>

          <div className="px-12 py-8">
            <div className="flex items-center gap-2 mb-8">
              <p className="text-lg font-semibold text-green-400">
                New
              </p>
              <p className="text-lg text-white">
                {data?.duration}
              </p>
              <p className="text-lg text-white">
                {data?.genre}
              </p>
            </div>
            <p className="text-lg text-white">
              {data?.description}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InfoModal;
