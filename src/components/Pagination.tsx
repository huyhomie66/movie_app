import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
  PaginationSeparator
} from "@ajna/pagination";
import { FC } from "react";

interface PaginationComponentProps {
  totalPage: number;
  total: number;
  setPageChange: (page: number) => void;
}

const PaginationComponent: FC<PaginationComponentProps> = ({
  totalPage,
  total,
  setPageChange
}) => {
  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    pagesCount: totalPage,
    limits: {
      outer: 2,
      inner: 2
    },
    total,
    initialState: { currentPage: 1 }
  });

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    setPageChange(page);
  };

  return (
    <Pagination
      pagesCount={pagesCount}
      currentPage={currentPage}
      onPageChange={onPageChange}
    >
      <PaginationContainer
        align="center"
        justify="space-between"
        p={4}
        w="full"
      >
        <PaginationPrevious
          _hover={{
            bg: "yellow.400"
          }}
          bg="yellow.300"
          onClick={() =>
            console.log(
              "Im executing my own function along with Previous component functionality"
            )
          }
        >
          <span>Previous</span>
        </PaginationPrevious>
        <PaginationPageGroup
          isInline
          align="center"
          separator={
            <PaginationSeparator
              onClick={() =>
                console.log(
                  "Im executing my own function along with Separator component functionality"
                )
              }
              bg="blue.300"
              fontSize="sm"
              w={7}
              jumpSize={11}
            />
          }
        >
          {pages.map((page: number) => (
            <PaginationPage
              w={7}
              bg="red.300"
              key={`pagination_page_${page}`}
              page={page}
              onClick={() =>
                console.log(
                  "Im executing my own function along with Page component functionality"
                )
              }
              fontSize="sm"
              _hover={{
                bg: "green.300"
              }}
              _current={{
                bg: "green.300",
                fontSize: "sm",
                w: 7
              }}
            />
          ))}
        </PaginationPageGroup>
        <PaginationNext
          _hover={{
            bg: "yellow.400"
          }}
          bg="yellow.300"
          onClick={() =>
            console.log(
              "Im executing my own function along with Next component functionality"
            )
          }
        >
          <span>next</span>
        </PaginationNext>
      </PaginationContainer>
    </Pagination>
  );
};

export default PaginationComponent;
