import wallet from "/home/ghostgamer/.config/solana/id.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader({ address: "https://devnet.irys.xyz/", }));
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://devnet.irys.xyz/B28vNpDx9srVTrJpVqpepZQsbuguhZpySQmeyucRFyaF"
        const metadata = {
            name: "JohnnyRug",
            symbol: "JR",
            description: "Welcome to The Rug Day",
            image,
            attributes: [
                { trait_type: 'fun', value: 'high af' }
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: image
                    },
                ],
            },
            creators: []
        };
        const myUri = await umi.uploader.uploadJson(metadata)
        console.log("Your metadata URI: ", myUri);
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
