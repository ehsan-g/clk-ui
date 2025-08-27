import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const PoolPage = () => {
  const { token1, token2 } = useSelector((state) => state.tokens);

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        Liquidity Pools
      </Typography>
      <Typography variant="h6">
        Add Liquidity for {token1} and {token2}
      </Typography>
      <Button variant="contained" fullWidth>
        Add Liquidity
      </Button>
    </Box>
  );
};

export default PoolPage;
