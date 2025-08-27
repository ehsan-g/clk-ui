import React from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';


// Simple token selector component (replace with a richer token list or the Uniswap token list later)
const TOKENS = ['ETH', 'USDC', 'DAI', 'WETH'];


type Props = {
    value?: string | null;
    onChange: (symbol: string) => void;
};


const TokenSelect: React.FC<Props> = ({ value, onChange }) => {
    const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);


    return (
        <Box>
            <Button variant="outlined" onClick={(e) => setAnchor(e.currentTarget)}>
                {value ?? 'Select'}
            </Button>
            <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
                {TOKENS.map((t) => (
                    <MenuItem
                        key={t}
                        onClick={() => {
                            onChange(t);
                            setAnchor(null);
                        }}
                    >
                        <Typography>{t}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};


export default TokenSelect;