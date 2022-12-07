import React, { FC } from "react";

import { Box, Text, SimpleGrid, VStack, Stack } from "@chakra-ui/react";
import Image from "src/components/Image";
import ErrorLine from "src/components/ErrorLine";
import { MovieListResult } from "src/services/apiRoute";
import { useRouter } from "next/router";
import Pagination from "src/components/Pagination";
import Skeleton from "react-loading-skeleton";

export interface IParamMovieList {
  data: MovieListResult;
  isLoading: boolean;
  isError: boolean;
  error: any;
  setPageChange: (page: number) => void;
}

const MovieGrid: FC<IParamMovieList> = ({
  isLoading,
  isError,
  data,
  error,
  setPageChange
}) => {
  const { push } = useRouter();

  const onClick = (id: number) => {
    push(`/movie/${id}`);
  };

  const Loading = () => {
    return (
      <React.Fragment>
        {Array.from(Array(15).keys()).map((e, i) => (
          <Skeleton key={i} count={8} />
        ))}
      </React.Fragment>
    );
  };

  return (
    <Stack>
      {isLoading && <Loading />}

      {!isError && !isLoading && (
        <SimpleGrid minChildWidth="140px" spacing="40px" position={"relative"}>
          {data.results.map((item, index) => (
            <Box
              onClick={() => onClick(item.id)}
              key={index}
              _hover={{
                borderRadius: "4px",
                boxShadow: "10px 1px 51px -5px rgba(55,199,166,0.75)"
              }}
              maxHeight="400px"
              style={{
                cursor: "pointer",
                padding: 10
              }}
            >
              <Image
                alt="poster"
                src={item.poster_path}
                height={120}
                width={160}
              />
              <Text fontSize={"sm"}>{item.title}</Text>
              <Text fontSize={"sm"}>vote average: {item.vote_average}</Text>
              <Text fontSize={"sm"}>vote count: {item.vote_count}</Text>
              <Text fontSize={"sm"}>release_date: {item.release_date}</Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
      <ErrorLine error={error} isError={isError} />

      <Pagination
        totalPage={data?.total_pages}
        total={data?.total_results}
        setPageChange={setPageChange}
      />
    </Stack>
  );
};

export default MovieGrid;
