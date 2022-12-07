import {
  TabPanels,
  TabPanel,
  VStack,
  SimpleGrid,
  Tabs,
  TabList,
  Tab,
  Input
} from "@chakra-ui/react";
import PullToRefresh from "react-simple-pull-to-refresh";

import { FC, useState } from "react";
import { useQueryParam, StringParam, withDefault } from "use-query-params";

import styles from "src/styles/Home.module.css";
import { Layout } from "src/components/Layout";
import { usePlayNowList } from "src/hooks/usePlayNowList";
import { useTopRateList } from "src/hooks/useTopRateList";
import { useSearch } from "src/hooks/useSearch";
import MovieList from "src/components/MovieList";
import MovieGrid from "src/components/MovieGrid";

const PlayNowList: FC = () => {
  const [page, setPage] = useState<number>(1);
  const { isLoading, isError, data, error, refetch, isFetching } =
    usePlayNowList({ page });

  const handleRefresh = async () => {
    refetch();
  };

  const setPageChange = (page: number) => {
    setPage(page);
  };

  const movieListProps = {
    isLoading: isFetching || isLoading,
    isError,
    data,
    error
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <MovieList {...movieListProps} setPageChange={setPageChange} />
    </PullToRefresh>
  );
};

const TopRateList: FC = () => {
  const [page, setPage] = useState<number>(1);

  const setPageChange = (page: number) => {
    setPage(page);
  };

  const { isLoading, isError, data, error, refetch, isFetching } =
    useTopRateList({ page });

  const movieListProps = {
    isLoading: isFetching || isLoading,
    isError,
    data,
    error,
    setPageChange
  };

  const handleRefresh = async () => {
    refetch();
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <MovieGrid {...movieListProps} />
    </PullToRefresh>
  );
};

const SearchList: FC<{ searchText: string }> = ({ searchText }) => {
  const [page, setPage] = useState<number>(1);

  const setPageChange = (page: number) => {
    setPage(page);
  };

  const { data, isLoading, isError, error, refetch, isFetching } = useSearch({
    query: searchText,
    page
  });

  const movieListProps = {
    isLoading: isFetching || isLoading,

    isError,
    data,
    error,
    setPageChange
  };

  const handleRefresh = async () => {
    refetch();
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <MovieList {...movieListProps} />
    </PullToRefresh>
  );
};

export default function Home() {
  const [searchText, setSearch] = useQueryParam(
    "search",
    withDefault(StringParam, "")
  );

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const tabs = [
    {
      title: "Now Playing",
      component: <PlayNowList />
    },
    { title: "Top Rate", component: <TopRateList /> }
  ];

  const isShowingSearchList = searchText?.length > 0;
  return (
    <div className={styles.container}>
      <Layout>
        <VStack>
          <Tabs isFitted variant="enclosed" width={"60vw"} alignSelf="center">
            <TabList mb="1em">
              {tabs.map((tab) => (
                <Tab key={tab.title}>{tab.title}</Tab>
              ))}
            </TabList>
            <Input
              placeholder="Search"
              onChange={onSearch}
              value={searchText}
            />
            {isShowingSearchList && <SearchList searchText={searchText} />}
            {!isShowingSearchList && (
              <TabPanels>
                {tabs.map((tab) => (
                  <TabPanel key={tab.title}>{tab.component}</TabPanel>
                ))}
              </TabPanels>
            )}
          </Tabs>
        </VStack>
      </Layout>
    </div>
  );
}
