import { PublicKey, clusterApiUrl, Keypair } from '@solana/web3.js'
import web3 from "@solana/web3.js";


async function verify_address(address) {
    try {
        address = new PublicKey(address);
        if(!PublicKey.isOnCurve(address))
        {
            console.log("Invalid Address..!");
            return false;
        }
    } catch (err) {
        console.log("Invalid Address..!");
        return false;
    }

    
    const network = clusterApiUrl('devnet')
    const opts = { preflightCommitment: 'processed' }
    const conn = new web3.Connection(network, opts.preflightCommitment);
    if(await conn.getAccountInfo(address) === null){
        console.log("Address does not exist..!");
        return false;
    }
    console.log(await conn.getAccountInfo(address));
    return true;
  }

  
  
let input = null;
input = "DS2tt4BX7YwCw7yrDNwbAdnYrxjeCPeGJbHmZEYC8RTb"; // valid and exist
// input = "DS2tt4BX7YwCw7yrDNwbAdnYrxjeCPeGJbHm555ZEYC8RTb"; // invalid
// input = new Keypair().publicKey.toBase58(); // not exist
  verify_address(input);
