import React, { useState, useEffect } from "react";
import { Grid, Pagination, Container } from "@mui/material";
import ProductCard from "./ProductCard";
import withProducts from "./hoc/withProducts";
import type { WithProductsProps } from "../types";
import { useSearchParams } from "react-router-dom";

const ProductList = (props: WithProductsProps) => {
  const { products } = props
  
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);
  const itemsPerPage = 6;

  useEffect(() => {
    setSearchParams({ page: String(page) });
  }, [page, setSearchParams]);
  
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const paginatedProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container>
      <Grid container spacing={3}>
        {paginatedProducts.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id} component={"div"}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(products.length / itemsPerPage)}
        page={page}
        onChange={handleChange}
        sx={{ mt: 3, display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
};

export default withProducts(ProductList);
