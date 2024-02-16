import React from 'react';

import { MovieInterface } from '@/types';
import MovieCard from '@/components/MovieCard';

interface MovieListProps {
  data: MovieInterface[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (data.length === 0) {
    return null;
  }

  return (
    <section className="mt-4 px-4 md:px-12">
      <h2 className="text-white text-lg md:text-xl lg:text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data.map(movie => <MovieCard key={movie.id} data={movie} />)}
      </div>
    </section>
  );
};

export default MovieList;
