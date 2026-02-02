import bs58 from 'bs58';
import fs from 'fs';

const secretKeyString = "5qVqB9UMWS3bkBjpptsyFc91TR4JpuLwX9ertiUnoE8jFWRMbCiuoTjBoFCoD6M4E9osUMXwVFYvrkuGsm3XnrTn";
const secretKey = bs58.decode(secretKeyString);
const keypair = Array.from(secretKey);

fs.writeFileSync('deploy-wallet.json', JSON.stringify(keypair));
console.log('Keypair saved to deploy-wallet.json');
