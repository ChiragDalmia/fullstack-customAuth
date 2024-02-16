import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { ChevronDownIcon, PlayIcon } from '@heroicons/react/24/outline';

import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hook/useInfoModalStore';
import Image from 'next/image';

// Define the MovieInterface type here
interface MovieInterface {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  genre: string;
  // Add other fields as per your data structure
}

interface MovieCardProps {
  data: MovieInterface;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();

  const redirectToWatch = useCallback(() => {
    router.push(`/watch/${data.id}`);
  }, [router, data.id]);

  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <Image
        onClick={redirectToWatch}
        src={data.thumbnailUrl}
        alt={data.title}
        draggable={false}
        className="cursor-pointer object-cover transition duration-300 shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]"
        width={555}
        height={555}
      />
      <div className="
        opacity-0
        absolute
        top-0
        transition
        duration-200
        z-10
        invisible
        sm:visible
        delay-300
        w-full
        scale-0
        group-hover:scale-110
        group-hover:-translate-y-[6vw]
        group-hover:translate-x-[2vw]
        group-hover:opacity-100
      ">
        <Image
          onClick={redirectToWatch}
          src={data.thumbnailUrl}
          alt={data.title}
          draggable={false}
          width={100}
          height={100}
          className="cursor-pointer object-cover transition duration-300 shadow-xl rounded-t-md w-full h-[12vw]"
        />
        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <PlayButton onClick={redirectToWatch} movieId={data.id} />
            <FavoriteButton movieId={data.id} />
            <InfoButton onClick={() => openModal(data.id)} />
          </div>
          <MovieDetails data={data} />
        </div>
      </div>
    </div>
  );
};

interface PlayButtonProps {
  onClick: () => void;
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ onClick, movieId }) => (
  <div onClick={onClick} className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
    <PlayIcon className="text-black w-4 lg:w-6" />
  </div>
);

interface InfoButtonProps {
  onClick: () => void;
}

const InfoButton: React.FC<InfoButtonProps> = ({ onClick }) => (
  <div onClick={onClick} className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
    <ChevronDownIcon className="text-white group-hover:item:text-neutral-300 w-4 lg:w-6" />
  </div>
);

interface MovieDetailsProps {
  data: MovieInterface;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ data }) => (
  <>
    <p className="text-green-400 font-semibold mt-4">
      New <span className="text-white">2023</span>
    </p>
    <div className="flex flex-row mt-4 gap-2 items-center">
      <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
    </div>
    <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
      <p>{data.genre}</p>
    </div>
  </>
);

export default MovieCard;
