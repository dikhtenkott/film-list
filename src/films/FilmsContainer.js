import { useCallback } from "react";
import { FILMS } from "./gql";
import { useQuery } from '@apollo/client';


import FilmsView from './FilmsView'

// tasks says pagination by 10 but totalCount is 6...
const LIMIT = 2

function FilmsContainer() {
  const { loading, error, data, refetch } = useQuery(FILMS, { variables: { first: LIMIT } });

  const pageInfo = data?.allFilms?.pageInfo || {}

  const loadNext = useCallback(() => {
    refetch({ after: pageInfo.endCursor, before: undefined });
  }, [refetch, pageInfo.endCursor])

  const loadPrev = useCallback(() => {
    refetch({ before: pageInfo.endCursor, after: undefined });
  }, [refetch, pageInfo.endCursor])

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }

  return (
    <FilmsView loadNext={loadNext} loadPrev={loadPrev} data={data.allFilms} />
  )
}

export default FilmsContainer;
