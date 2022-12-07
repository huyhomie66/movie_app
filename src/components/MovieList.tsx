import { FC, Fragment } from "react";
import Skeleton from "react-loading-skeleton";

import { Text, List, HStack, VStack, Stack } from "@chakra-ui/react";
import Image from "src/components/Image";
import ErrorLine from "src/components/ErrorLine";
import { IParamMovieList } from "src/components/MovieGrid";
import { useRouter } from "next/router";
import { MovieInfo } from "src/services/apiRoute";
import Pagination from "src/components/Pagination";

interface IMovieListProps extends IParamMovieList {
  setPageChange: (page: number) => void;
}
const MovieList: FC<IMovieListProps> = ({
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

  const Loading = () => (
    <Fragment>
      {Array.from(Array(10).keys()).map((e, i) => (
        <HStack key={i}>
          <Skeleton height={120} width={120} style={{ marginRight: 4 }} />
          <Skeleton count={5} width={300} />
        </HStack>
      ))}
    </Fragment>
  );

  return (
    <Stack>
      <List spacing={3} height={"74vh"} overflow="scroll" position="relative">
        {!isError && (
          <Fragment>
            {isLoading && <Loading />}
            {!isLoading &&
              data.results.map((item: MovieInfo, index: number) => (
                <HStack
                  onClick={() => onClick(item.id)}
                  key={index}
                  _hover={{
                    borderRadius: "4px",
                    boxShadow: "10px 1px 51px -5px rgba(55,199,166,0.75)"
                  }}
                  style={{
                    cursor: "pointer"
                  }}
                >
                  <Image
                    height={120}
                    width={120}
                    alt="poster"
                    src={item.poster_path}
                    layout={"contain"}
                  />
                  <VStack>
                    <Text fontSize={"xs"}>{item.title}</Text>
                    <Text fontSize={"sm"}>
                      vote average: {item.vote_average}
                    </Text>
                    <Text fontSize={"sm"}>vote count: {item.vote_count}</Text>
                    <Text fontSize={"sm"}>
                      release_date: {item.release_date}
                    </Text>
                  </VStack>
                </HStack>
              ))}
          </Fragment>
        )}
        <ErrorLine error={error} isError={isError} />
      </List>

      <Pagination
        totalPage={data?.total_pages}
        total={data?.total_results}
        setPageChange={setPageChange}
      />
    </Stack>
  );
};

export default MovieList;
