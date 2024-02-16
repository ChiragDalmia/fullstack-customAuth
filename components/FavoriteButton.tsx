import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/outline';

import useCurrentUser from '@/hook/useCurrentUser';
import useFavorites from '@/hook/useFavorites';

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { data: currentUser, mutate: mutateUser } = useCurrentUser();
  const { mutate: mutateFavorites } = useFavorites();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    setIsFavorite(currentUser?.favoriteIds?.includes(movieId) ?? false);
  }, [currentUser, movieId]);

  const updateFavoriteStatus = async (isAdding: boolean) => {
    try {
      const response = isAdding
        ? await axios.post<{ favoriteIds: string[] }>('/api/favorite', { movieId })
        : await axios.delete<{ favoriteIds: string[] }>('/api/favorite', { data: { movieId } });

      const updatedFavoriteIds = response.data.favoriteIds;
      mutateUser({ ...currentUser, favoriteIds: updatedFavoriteIds });
      mutateFavorites();
    } catch (error) {
      console.error('Error updating favorites', error);
    }
  };

  const toggleFavorites = useCallback(() => {
    updateFavoriteStatus(!isFavorite);
  }, [isFavorite, updateFavoriteStatus]);

  const Icon = isFavorite ? CheckIcon : PlusIcon;

  return (
    <button
      onClick={toggleFavorites}
      className={`p-2 rounded-full transition-all ease-in-out duration-300 ${isFavorite ? 'bg-green-400 hover:bg-green-500' : 'bg-gray-200 hover:bg-gray-300'} flex justify-center items-center`}
    >
      <Icon className={`w-4 h-4 lg:w-6 lg:h-6 ${isFavorite ? 'text-white' : 'text-black'}`} />
    </button>
  );
};

export default FavoriteButton;
