export interface Artist {
  id: string;
  name: string;
  bio: string;
  location: string;
  roles: string[];
  genres: string[];
  experience_level:'nacional' | 'internacional';
  social_media?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
  websites?: {
    portfolio?: string;
    behance?: string;
    website?: string;
    artstation?: string;
  };
  publications?: string[];
  awards?: string[];
  contact_email?: string;
  founded_year?: number;
  last_updated?: string;
  images?: {
    featured?: {
      url?: string;
      alt?: string;
      width?: number;
      height?: number;
    };
  };
}

export interface SearchFilters {
  genre?: string;
  level?: string;
  role?: string;
}

export interface SearchResult extends Artist {
  score?: number;
}

export interface ArtistsData {
  artists: Artist[];
  works: Work[];
}

export interface Work {
  id: string;
  title: string;
  artists: string[];
  year: number;
  synopsis: string;
  genres: string[];
  format: string;
  publication_status: string;
}
