import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MockedProvider } from "@apollo/client/testing";
import { FILMS } from "./gql";
import FilmsContainer from './FilmsContainer'

const mocks = [
  {
    request: {
      query: FILMS,
      variables: {
        first: 2
      }
    },
    result: {
      "data": {
        "allFilms": {
          "films": [
            {
              "title": "A New Hope",
              "director": "George Lucas",
              "releaseDate": "1977-05-25"
            },
            {
              "title": "The Empire Strikes Back",
              "director": "Irvin Kershner",
              "releaseDate": "1980-05-17"
            },
            {
              "title": "Return of the Jedi",
              "director": "Richard Marquand",
              "releaseDate": "1983-05-25"
            },
            {
              "title": "The Phantom Menace",
              "director": "George Lucas",
              "releaseDate": "1999-05-19"
            }
          ],
          "pageInfo": {
            "endCursor": "YXJyYXljb25uZWN0aW9uOjM=",
            "hasNextPage": true,
            "hasPreviousPage": false,
            "startCursor": "YXJyYXljb25uZWN0aW9uOjA="
          }
        }
      }
    }
  }
];

it("renders without error", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <FilmsContainer />
    </MockedProvider>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();

  const items = await screen.findAllByRole('rowgroup');
  expect(items).toHaveLength(2);
});

it("should show error UI", async () => {
  const filmMock = {
    request: {
      query: FILMS,
      variables: {
        first: 2
      }
    },
    error: new Error("An error occurred")
  };
  render(
    <MockedProvider mocks={[filmMock]} addTypename={false}>
      <FilmsContainer />
    </MockedProvider>
  );
  expect(await screen.findByText("Error!")).toBeInTheDocument();
});

it("pagination works", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <FilmsContainer />
    </MockedProvider>
  );
  expect(await screen.findByText("Next")).toBeInTheDocument();
  await userEvent.click(screen.getByText("Next"));
  expect(await screen.findByText("Return of the Jedi")).toBeInTheDocument();
});
