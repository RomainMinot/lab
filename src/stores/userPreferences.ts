import type { MovieHomeSection } from '~/types/movie';

export const useUserPreferences = defineStore('user-preferences', () => {
  const homePageLastType = useStorage('homepageDefaultType', 'now_playing' as MovieHomeSection);
  const defaultLanguage = useStorage('language', 'en-US');

  function setHomePageLastType(type: MovieHomeSection) {
    homePageLastType.value = type;
  }

  function setDefaultLanguage(language: string) {
    defaultLanguage.value = language;
  }

  return {
    homePageLastType,
    defaultLanguage,
    setHomePageLastType,
    setDefaultLanguage,
  };
});
