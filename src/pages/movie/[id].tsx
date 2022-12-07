import { HStack, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";

import ErrorLine from "src/components/ErrorLine";
import Image from "src/components/Image";
import { useDetail } from "src/hooks/useDetail";
import { IMovieDetailParam } from "src/services/apiRoute";
import { Text } from "@chakra-ui/react";

const MovieDetail = ({}: IMovieDetailParam) => {
  const { query } = useRouter();
  const id: any | number = query?.id;

  const { data, isLoading, error, isError } = useDetail({
    movie_id: id
  });

  const Loading = () => (
    <HStack>
      <Skeleton height={400} width={400} style={{ marginRight: 5 }} />
      <Skeleton count={16} width={400} />
    </HStack>
  );
  return (
    <Stack>
      {isLoading && <Loading />}
      <ErrorLine error={error} isError={isError} />
      {!isError && (
        <HStack>
          <Image
            height={400}
            width={400}
            alt="poster"
            src={data?.poster_path}
          />
          <Stack height={120} width={600}>
            <Text>{data?.original_title}</Text>
            <Text>language {data?.original_language}</Text>
            <Text>popularity {data?.popularity}</Text>

            <Text>release date {data?.release_date}</Text>
            <Text>status {data?.status}</Text>
            <Text>budget : {data?.budget}</Text>
            <Text>overview : {data?.overview}</Text>
            <Text>tagline : {data?.tagline}</Text>
            <Text>vote average: {data?.vote_average} %</Text>
            <Text>vote count: {data?.vote_count}</Text>
          </Stack>
        </HStack>
      )}
    </Stack>
  );
};

export default MovieDetail;
