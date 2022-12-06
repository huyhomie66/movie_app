import styles from "src/styles/Home.module.css";
import { Layout } from "src/components/Layout";
import {
  TabPanels,
  TabPanel,
  Spinner,
  Box,
  Text,
  VStack,
  SimpleGrid,
  Stack
} from "@chakra-ui/react";
import { usePlayNowList } from "src/hooks/usePlayNowList";
import { Tabs, TabList, Tab, Image, Input } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { IMovieListParams } from "src/services/apiRoute";
import { useTopRateList } from "src/hooks/useTopRateList";
import dynamic from "next/dynamic";

const ReactPullToRefresh = dynamic(() => import("react-pull-to-refresh"), {
  ssr: false
});
const initState: IMovieListParams = {
  page: 1
};

const PlayNowList: FC = () => {
  const [state, setState] = useState<IMovieListParams>(initState);
  const { isLoading, isError, data, error, refetch } = usePlayNowList(state);

  const handleRefresh = async () => {
    refetch();
  };

  return (
    <ReactPullToRefresh
      onRefresh={handleRefresh}
      className="your-own-class-if-you-want"
      style={{ textAlign: "center" }}
    >
      <Stack
        direction="row"
        style={{ overflowX: "scroll", flexDirection: "row" }}
      >
        {isLoading && <Spinner />}
        {!isLoading &&
          !isError &&
          data.results.map((item, index: number) => (
            <VStack
              key={index}
              style={{
                cursor: "pointer"
              }}
            >
              <Image
                marginRight={4}
                alt="poster"
                boxSize="120px"
                objectFit="cover"
                src={item.poster_path}
              />

              <Text fontSize={"xs"}>{item.title}</Text>
            </VStack>
          ))}
        {isError && <div>{JSON.stringify(error)}</div>}
      </Stack>
    </ReactPullToRefresh>
  );
};

const TopRateList: FC = () => {
  const [state, setState] = useState<IMovieListParams>(initState);
  const { isLoading, isError, data } = useTopRateList(state);
  console.log({ data });

  return (
    <SimpleGrid minChildWidth="120px" spacing="40px">
      {!isError &&
        !isLoading &&
        data.results.map((item, index) => (
          <Box
            key={index}
            height="200px"
            style={{
              cursor: "pointer"
            }}
          >
            <Image
              alt="poster"
              src={item.poster_path}
              height="80%"
              width={"100%"}
            />
            <Text fontSize={"sm"}>{item.title}</Text>
          </Box>
        ))}
    </SimpleGrid>
  );
};

export default function Home() {
  const [searchText, setSearch] = useState<string>();

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

  return (
    <div className={styles.container}>
      <Layout>
        <Input placeholder="Search" onChange={onSearch} />
        <VStack>
          <Tabs isFitted variant="enclosed" width={"60vw"} alignSelf="center">
            <TabList mb="1em">
              {tabs.map((tab) => (
                <Tab key={tab.title}>{tab.title}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {tabs.map((tab) => (
                <TabPanel key={tab.title}>{tab.component}</TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </VStack>
      </Layout>
    </div>
  );
}
