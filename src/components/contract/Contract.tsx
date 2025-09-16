'use client';

import { useContext, useEffect, useState } from 'react';
import {
  Contract,
  type ContractInstanceWithAddress,
  getAllFunctionAbis,
  type FunctionAbi,
  FunctionType,
  DeployMethod,
  type DeployOptions,
  TxStatus,
} from '@aztec/aztec.js';
import { AztecContext } from '../../aztecEnv';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { formatFrAsString } from '../../utils/conversion';
import { CreateContractDialog } from './components/CreateContractDialog';
import ClearIcon from '@mui/icons-material/Clear';
import { CopyToClipboardButton } from '../common/CopyToClipboardButton';
import { ContractFilter } from './components/ContractFilter';
import { FunctionCard } from './components/FunctionCard';
import { useTransaction } from '../../hooks/useTransaction';
import { ContractDocumentationLinks, ContractMethodOrder } from '../../utils/constants';
import Box from '@mui/material/Box';
import { trackButtonClick } from '../../utils/matomo';

const FORBIDDEN_FUNCTIONS = ['process_log', 'sync_private_state', 'public_dispatch'];

export function ContractComponent() {
  const [currentContract, setCurrentContract] = useState<Contract | null>(null);
  const [functionAbis, setFunctionAbis] = useState<FunctionAbi[]>([]);
  const [filters, setFilters] = useState({
    searchTerm: '',
    private: true,
    public: true,
    utility: true,
  });
  const [isLoadingArtifact, setIsLoadingArtifact] = useState(false);
  const [openCreateContractDialog, setOpenCreateContractDialog] = useState(false);

  const { sendTx } = useTransaction();

  const {
    node,
    wallet,
    currentContractAddress,
    currentContractArtifact,
    defaultContractCreationParams,
    setCurrentContractArtifact,
    setCurrentContractAddress,
  } = useContext(AztecContext);


  useEffect(() => {
    const loadCurrentContract = async () => {
      setIsLoadingArtifact(true);
      setFunctionAbis(getAllFunctionAbis(currentContractArtifact));
      setFilters({
        searchTerm: '',
        private: true,
        public: true,
        utility: true,
      });
      if (currentContractAddress) {
        const { isContractPubliclyDeployed } = await wallet.getContractMetadata(currentContractAddress);
        // Temporarily filter out not-yet-published contracts
        if (isContractPubliclyDeployed) {
          const contractInstance = await node.getContract(currentContractAddress);
          await wallet.registerContract({ instance: contractInstance, artifact: currentContractArtifact });
          const contract = await Contract.at(currentContractAddress, currentContractArtifact, wallet);
          setCurrentContract(contract);
        }
      }
      setIsLoadingArtifact(false);
    };
    if (currentContractArtifact) {
      loadCurrentContract();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentContractArtifact, currentContractAddress, wallet]);

  useEffect(() => {
    if (!currentContractAddress) {
      setOpenCreateContractDialog(true);
    }
  }, [currentContractAddress]);

  const handleContractCreation = async (
    contract?: ContractInstanceWithAddress,
    publiclyDeploy?: boolean,
    interaction?: DeployMethod,
    opts?: DeployOptions,
  ) => {
    setOpenCreateContractDialog(false);
    if (contract && publiclyDeploy) {
      const txReceipt = await sendTx(
        `Deploy ${currentContractArtifact.name}`,
        interaction,
        contract.address,
        opts,
      );
      // Temporarily ignore undeployed contracts
      if (txReceipt?.status === TxStatus.SUCCESS) {
        setCurrentContractAddress(contract.address);
      }
    } else if (contract) {
      setCurrentContractAddress(contract.address);
    }
  };

  return (
    <div>
      {!currentContractArtifact ? (
        !isLoadingArtifact ? (
          'Not Loading'
        ) : (
          <div >
            <Typography variant="h5">Loading artifact...</Typography>
            <CircularProgress size={100} />
          </div>
        )
      ) : (
        <div >
          <div >
            <div>
              <Box >
                <Typography variant="h3">
                  {currentContractArtifact.name}
                </Typography>

                {!currentContractAddress && wallet && (
                  <div>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {
                        trackButtonClick('Deploy/Load Contract', 'Contract Actions');
                        setOpenCreateContractDialog(true);
                      }}
                    >
                      Deploy / Load Contract
                    </Button>
                    {openCreateContractDialog && (
                      <CreateContractDialog
                        contractArtifact={currentContractArtifact}
                        open={openCreateContractDialog}
                        onClose={handleContractCreation}
                        defaultContractCreationParams={defaultContractCreationParams}
                      />
                    )}
                  </div>
                )}

                {currentContractAddress && (
                  <div >
                    <Typography color="text.secondary">
                      {formatFrAsString(currentContractAddress.toString())}
                    </Typography>
                    <div>
                      <CopyToClipboardButton disabled={false} data={currentContractAddress.toString()} />
                      <IconButton
                        onClick={() => {
                          setCurrentContractAddress(null);
                          setCurrentContract(null);
                          setCurrentContractArtifact(null);
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                    </div>
                  </div>
                )}
              </Box>

              <Typography variant="caption" >
                Contract Class ID: {currentContract?.instance?.currentContractClassId.toString()}
              </Typography>
            </div>

            <ContractFilter filters={filters} onFilterChange={setFilters} />
          </div>
          {functionAbis
            .filter(
              fn =>
                !fn.isInternal &&
                !FORBIDDEN_FUNCTIONS.includes(fn.name) &&
                ((filters.private && fn.functionType === FunctionType.PRIVATE) ||
                  (filters.public && fn.functionType === FunctionType.PUBLIC) ||
                  (filters.utility && fn.functionType === FunctionType.UTILITY)) &&
                (filters.searchTerm === '' || fn.name.includes(filters.searchTerm)),
            )
            .sort((a, b) => {
              if (ContractMethodOrder[currentContractArtifact.name]) {
                return (
                  ContractMethodOrder[currentContractArtifact.name]?.indexOf(a.name) -
                  ContractMethodOrder[currentContractArtifact.name]?.indexOf(b.name)
                );
              }
              return 0;
            })
            .map(fn => (
              <FunctionCard
                fn={fn}
                key={fn.name}
                contract={currentContract}
                contractArtifact={currentContractArtifact}
                onSendTxRequested={sendTx}
              />
            ))}
        </div>
      )}
    </div>
  );
}
