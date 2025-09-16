// import React, { useState } from 'react';
// import { Box, Paper, Typography, Grid, TextField, Button, Divider } from '@mui/material';
// import { useAppDispatch, useAppSelector } from '../redux/hooks';
// import { setLiquidity, setTokenA, setTokenB } from '../redux/tokenSlice';
// import TokenSelect from '../components/TokenSelect';

// const AddLiquidityPage: React.FC = () => {
//     const dispatch = useAppDispatch();
//     // use `any` in selector to avoid circular-type inference issues; then destructure safely
//     const tokens = useAppSelector((s: any) => s.tokens || {});
//     const { tokenA, tokenB } = tokens;

//     const [a, setA] = useState('');
//     const [b, setB] = useState('');

//     const handleAdd = () => {
//         dispatch(setLiquidity({ amountA: a, amountB: b }));
//         alert(`Mock add liquidity: ${a} ${tokenA?.symbol ?? 'TOKEN A'} + ${b} ${tokenB?.symbol ?? 'TOKEN B'}`);
//     };

//     return (
//         <Box >
//             <Paper sx={{ width: 680, p: 3 }} elevation={6}>
//                 <Typography variant="h5">Add Liquidity</Typography>
//                 <Divider sx={{ my: 2 }} />
//                 <Grid container spacing={2}>
//                     <Grid size={{ xs: 12, md: 12 }} >
//                         <Typography variant="caption">Token A</Typography>
//                         <Box >
//                             <TextField
//                                 label={`Amount ${tokenA?.symbol ?? ''}`}
//                                 value={a}
//                                 onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setA(e.target.value)}
//                                 fullWidth
//                                 type="number"
//                             />
//                         </Box>
//                         <Box>
//                             <TokenSelect
//                                 value={tokenA?.symbol ?? null}
//                                 onChange={(s) => dispatch(setTokenA({ symbol: s }))}
//                             />
//                         </Box>
//                     </Grid>

//                     <Grid size={{ xs: 12, md: 12 }} >
//                         <Typography variant="caption">Token B</Typography>
//                         <Box>
//                             <TextField
//                                 label={`Amount ${tokenB?.symbol ?? ''}`}
//                                 value={b}
//                                 onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setB(e.target.value)}
//                                 fullWidth
//                                 type="number"
//                             />
//                         </Box>
//                         <Box >
//                             <TokenSelect
//                                 value={tokenB?.symbol ?? null}
//                                 onChange={(s) => dispatch(setTokenB({ symbol: s }))}
//                             />
//                         </Box>
//                     </Grid>

//                     <Grid size={{ xs: 12, md: 12 }}>
//                         <Button variant="contained" fullWidth onClick={handleAdd}>
//                             Add Liquidity
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </Paper>
//         </Box>
//     );
// };

// export default AddLiquidityPage;
