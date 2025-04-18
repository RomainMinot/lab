interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  original_title: string;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  genres?: Genre[];
  genre_ids?: number[];
  runtime: number;
}

interface MoviesData {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface CreditsItem {
  id: number;
  name: string;
  profile_path: string;
  character?: string;
  job?: string;
  order: number;
}

interface MovieTypeData {
  label: string;
  value: string;
  selected: boolean;
}

export { CreditsItem, Genre, Movie, MoviesData, MovieTypeData };
