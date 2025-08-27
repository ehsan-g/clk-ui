// src/pages/SwapPage.tsx
import React from 'react';
import { Box, Grid, Paper, TextField, Button, Typography, Divider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setSwapAmountA, setSwapAmountB, setTokenA, setTokenB } from '../redux/tokenSlice';
import TokenSelect from '../components/TokenSelect';

const mockPrice = (from?: string, to?: string, amount = 0) => {
    if (!from || !to || amount === 0) return 0;
    if (from === 'ETH' && to === 'USDC') return amount * 1800;
    if (from === 'USDC' && to === 'ETH') return amount / 1800;
    return amount;
};

const SwapPage: React.FC = () => {
    const dispatch = useAppDispatch();
    // avoid TS '{}' inference by selecting tokens as `any`
    const tokens = useAppSelector((s: any) => s.tokens || {});
    const { tokenA, tokenB, swapAmountA, swapAmountB } = tokens;

    const handleAmountAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        dispatch(setSwapAmountA(v));
        const num = Number(v || 0);
        const out = mockPrice(tokenA?.symbol, tokenB?.symbol, num);
        dispatch(setSwapAmountB(String(out || '')));
    };

    const doSwap = () => {
        alert(`Mock swap: ${swapAmountA ?? ''} ${tokenA?.symbol ?? 'A'} → ${swapAmountB ?? ''} ${tokenB?.symbol ?? 'B'}`);
    };

    return (
        <Box mt={4} display="flex" justifyContent="center">
            <Paper sx={{ width: 520, p: 3, bgcolor: 'background.paper' }} elevation={6}>
                <Typography variant="h5" gutterBottom>
                    Swap
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="caption">From</Typography>
                        <Box display="flex" gap={2} alignItems="center" mt={1}>
                            <TextField
                                label={`Amount ${tokenA?.symbol ?? ''}`}
                                value={swapAmountA ?? ''}
                                onChange={handleAmountAChange}
                                fullWidth
                                type="number"
                            />
                            <TokenSelect
                                value={tokenA?.symbol ?? null}
                                onChange={(s) => dispatch(setTokenA({ symbol: s }))}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="caption">To</Typography>
                        <Box display="flex" gap={2} alignItems="center" mt={1}>
                            <TextField
                                label={`Estimated ${tokenB?.symbol ?? ''}`}
                                value={swapAmountB ?? ''}
                                fullWidth
                                type="number"
                                disabled
                            />
                            <TokenSelect
                                value={tokenB?.symbol ?? null}
                                onChange={(s) => dispatch(setTokenB({ symbol: s }))}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" fullWidth onClick={doSwap}>
                            Swap
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default SwapPage;
