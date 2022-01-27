import React from "react";
import Card from "../../components/Card";
import { Box, Grid, Flex, Button } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { fetchProductList } from "../../api";
function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("products", fetchProductList, {
    getNextPageParam: (lastPage, pages) => {
      const morePagesExist = lastPage.length === 3; // son grup var mı
      console.log(pages);
      if (!morePagesExist) {
        return;
      }
      return pages.length + 1; // Son grup var ise bir tane daha grup aç
    },
  });

  if (status === "loading") return "Loading...";

  if (status === "error") return "An error has occurred: " + error.message;
  console.log(data);

  return (
    <div>
      <Grid templateColumns="repeat(3,1fr)" gap={4}>
        {/* {data.pages[0].map((item, key) => {
          return <Card key={key} item={item} />;
        })} */}
        {data.pages.map((group, index) => {
          return (
            <React.Fragment key={index}>
              {group.map((item) => {
                return (
                  <Box w="100%" key={item._id}>
                    <Card item={item} />
                  </Box>
                );
              })}
            </React.Fragment>
          );
        })}
      </Grid>
      <Flex mt="10" justifyContent={"center"}>
        <Button
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
        <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      </Flex>
    </div>
  );
}

export default Products;
