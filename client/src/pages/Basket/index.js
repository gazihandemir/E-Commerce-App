import React from "react";
import { Link } from "react-router-dom";
import { Alert, Image, Button, Box, Text } from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";

function Basket() {
  const { items, removeFromBasket } = useBasket();
  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  return (
    <Box p="5">
      {items.length < 1 && ( // sepet boş ise
        <Alert status="warning">You have not any items in your basket.</Alert>
      )}
      {items.length > 0 && ( // sepette eleman var ise
        <>
          <ul style={{ listStyle: "decimal" }}>
            {items.map((item) => (
              <li key={item._id} style={{ marginBottom: 15 }}>
                <Link to={`/product/${item._id}`}>
                  <Text fontSize={18}>
                    {item.title} - {item.price} TL
                  </Text>
                  <Image
                    htmlWidth={200}
                    src={item.photos[0]}
                    alt="basket item"
                    loading="lazy"
                  />
                </Link>
                <Button
                  mt="2"
                  size="sm"
                  colorScheme="pink"
                  onClick={() => removeFromBasket(item._id)}
                >
                  Remove from basket
                </Button>
              </li>
            ))}
          </ul>
        </>
      )}
      <Box mt="10">
        <Text fontSize="22">Total : {total}</Text>
      </Box>
    </Box>
  );
}

export default Basket;
