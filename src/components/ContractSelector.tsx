import { useState, useEffect, useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { CopyToClipboardButton } from './common/CopyToClipboardButton';
import {
  convertFromUTF8BufferAsString,
  formatFrAsString,
  parseAliasedBuffersAsString,
} from '../utils/conversion';
import { AztecContext } from '../aztecEnv';
import { AztecAddress, loadContractArtifact } from '@aztec/aztec.js';
import { parse } from 'buffer-json';
import { Box, InputLabel } from '@mui/material';
import { trackButtonClick } from '../utils/matomo';
import { filterDeployedAliasedContracts } from '../utils/contracts.js';
import { steps } from './DeployStepper.js';

export function ContractSelector({ theContract }) {

  const [contracts, setContracts] = useState([]);

  const [isContractsLoading, setIsContractsLoading] = useState(false);

  const {
    currentContractAddress,
    wallet,
    walletDB,
    isPXEInitialized,
    pendingTxUpdateCounter,
    setCurrentContractArtifact,
    setCurrentContractAddress,
    setShowContractInterface,
    setDefaultContractCreationParams,
  } = useContext(AztecContext);

  useEffect(() => {
    const refreshContracts = async () => {
      setIsContractsLoading(true);
      const aliasedContracts = await walletDB.listAliases('contracts');
      const contracts = parseAliasedBuffersAsString(aliasedContracts);
      // Temporarily filter out undeployed contracts
      const deployedContracts = await filterDeployedAliasedContracts(contracts, wallet);
      setContracts(deployedContracts);
      setIsContractsLoading(false);
    };

    if (walletDB && wallet) {
      refreshContracts();
    }
  }, [currentContractAddress, walletDB, wallet, pendingTxUpdateCounter]);


  useEffect(() => {
    handleContractChange()
  }, [wallet, theContract]);

  const handleContractChange = async () => {
    trackButtonClick(`Contract Change`, 'Contract Selector');

    setIsContractsLoading(true);
    setDefaultContractCreationParams({});
    let contractArtifactJSON
    try {
      if (theContract === steps[0]) {
        ({ TokenContractArtifact: contractArtifactJSON } = await import(`../components/contract/components/artifacts/token/Token.js`));
      } else if (theContract === steps[1]) {
        ({ FactoryV3ContractArtifact: contractArtifactJSON } = await import(`../components/contract/components/artifacts/factory/FactoryV3.js`));
      } else {
        ({ RouterV3ContractArtifact: contractArtifactJSON } = await import(`../components/contract/components/artifacts/router/RouterV3.js`));
      }

      const contractArtifact = await loadContractArtifact(contractArtifactJSON);
      setCurrentContractArtifact(contractArtifact);
      setCurrentContractAddress(undefined);
      setShowContractInterface(true);
    } finally {
      setIsContractsLoading(false);
    }

  };

  if (isContractsLoading) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          minWidth: { xs: "100%", sm: "auto" },
          mt: { xs: 1, sm: 0 },
          order: { xs: 3, sm: 2 },  // to position after buttons if needed
        }}
      >
        <CircularProgress size={24} color="primary" sx={{ marginRight: '1rem' }} />
        <Typography component='span' variant="body1">Loading contract...</Typography>
      </Box>
    );
  }

  return (
    <div >
      {currentContractAddress && (
        <CopyToClipboardButton disabled={!currentContractAddress} data={currentContractAddress?.toString()} />
      )}
    </div>
  );
}
