
const { ethers } = require('ethers');
const abi = require('../abi.json');
const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
const beaconDepositABI = abi.abi;
const beaconDepositContractAddress = '0x00000000219ab540356cBB839Cbe05303d7705Fa';
const contract = new ethers.Contract(beaconDepositContractAddress, beaconDepositABI, provider);
const Deposit = require('../models/depositSchema')
const { sendTelegramAlert }= require("./Telegram")




function calculateTransactionFee(gasUsed, gasPrice) {
 
    const totalFeeWei = BigInt(gasUsed) * BigInt(gasPrice);
    
    const totalFeeEth = Number(totalFeeWei) / 1e18;

    return totalFeeEth;
}


let lastBlockProcessed = null; 


async function listenForDeposits() {
    try {
        console.log("Listening for Ethereum 2.0 deposits...");


        contract.on('DepositEvent', async (pubkey, withdrawal_credentials, amount, signature, index, event) => {
            try {
         
                console.log("New Deposit Detected");
                await processDepositEvent(event,pubkey);
                lastBlockProcessed = event.log.blockNumber; 
            } catch (err) {
                console.error("Error processing deposit event:", err);
         
                await handleFilterError(err);
            }
        });

    } catch (error) {
        console.error("Error setting up event listener:", error);
        await handleFilterError(error);
    }
}


async function processDepositEvent(event,pubkey) {
    const txReceipt = await provider.getTransactionReceipt(event.log.transactionHash);
    const gasUsed = txReceipt.gasUsed; 
    const gasPrice = txReceipt.gasPrice; 
    const fee = calculateTransactionFee(gasUsed, gasPrice);

    const blockNumber = event.blockNumber;
    const block = await provider.getBlock(blockNumber);


    const newDeposit = new Deposit({
        blockNumber: event.log.blockNumber,
        blockTimestamp: block.timestamp,
        fee: fee, 
        hash: event.log.transactionHash,
        pubkey:pubkey
    });
    await newDeposit.save();
    sendTelegramAlert(JSON.stringify(newDeposit, null, 2))
    console.log("Deposit saved to database successfully.");
}


async function handleFilterError(error) {
    if (error.code === -32000 && error.message === 'filter not found') {
        console.error("Filter lost, recreating...");
        

        await recreateFilter();
    } else {
        console.error("Unhandled error:", error);
    }
}

async function recreateFilter() {
    console.log("......provider.........")
    console.log(provider)
    const currentBlock = await provider.getBlockNumber();
    
    if (lastBlockProcessed !== null) {
        const filter = {
            address: contract.address,
            fromBlock: lastBlockProcessed + 1, 
            toBlock: currentBlock
        };

        const events = await contract.queryFilter('DepositEvent', filter.fromBlock, filter.toBlock);
        
        for (const event of events) {
            await processDepositEvent(event);
        }
    } else {
        console.log("No previously processed block found, listening for new events...");
        listenForDeposits(); 
    }
}



module.exports = {
    listenForDeposits
};