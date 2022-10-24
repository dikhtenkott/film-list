import { gql } from '@apollo/client';

const FILMS = gql`
  query Query($first: Int, $after: String, $before: String, $last: Int) {
    allFilms(first: $first, after: $after, before: $before, last: $last) {
      films {
        title
        director
        releaseDate
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export {
  FILMS
}
