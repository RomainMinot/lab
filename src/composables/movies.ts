import moviedbApi from '~/services/moviedbApi';

export function useMovies() {
  function getPosterUrl(path: string, imageSize: 'w1920' | 'w1280' | 'w780' | 'w300' = 'w1280') {
    const baseUrl = 'https://image.tmdb.org/t/p';
    return `${baseUrl}/${imageSize}/${path}`;
  }

  function getVoteAverageDisplay(voteAverage: number) {
    const voteAveragePercentage = Number.parseInt(voteAverage.toFixed(1).charAt(0)) > 5 ? Math.round(voteAverage * 10) : Math.floor(voteAverage * 10);
    return `${voteAveragePercentage}%`;
  }

  async function getGenres(ids: number[] | undefined) {
    if (!ids)
      return [];

    const genresPromises = ids.map(async (id) => {
      const { data: genre } = await moviedbApi.getGenre(id.toString());
      return genre.value;
    });

    return await Promise.all(genresPromises);
  };

  function getRuntimeDisplay(runtime: number) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  }

  return {
    getPosterUrl,
    getVoteAverageDisplay,
    getGenres,
    getRuntimeDisplay,
  };
}
