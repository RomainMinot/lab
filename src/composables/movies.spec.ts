import { describe, expect, it } from 'vitest';
import { useMovies } from './movies';

const { getRuntimeDisplay, getVoteAverageDisplay } = useMovies();

describe('use movies composable', () => {
  describe('getVoteAverageDisplay', () => {
    it('should return a percentage string for various vote averages', () => {
      const testCases = [0, 2.5, 5, 7.8, 10];
      testCases.forEach((voteAverage) => {
        const result = getVoteAverageDisplay(voteAverage);
        expect(result).toMatch(/^\d{1,3}%$/);
      });
    });
  });

  describe('getRuntimeDisplay', () => {
    it('should return a runtime string in hours and minutes', () => {
      const testCases = [0, 45, 90, 120, 150];
      testCases.forEach((runtime) => {
        const result = getRuntimeDisplay(runtime);
        expect(result).toMatch(/^\d+h \d+min$/);
      });
    });
  });
});
