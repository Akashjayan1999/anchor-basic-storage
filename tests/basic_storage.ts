import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { BasicStorage } from "../target/types/basic_storage";

describe("basic_storage", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.basicStorage as Program<BasicStorage>;

  it("Is initialized!", async () => {
    // Add your test here.
    const seeds: Array<Buffer | Uint8Array> = [];
    const [myStoragePDA, _bump] =  anchor.web3.PublicKey.findProgramAddressSync(
      seeds,
      program.programId
    );
    console.log("My Storage PDA", myStoragePDA.toBase58());
    const tx = await program.methods.initialize().accountsPartial({myStorage: myStoragePDA}).signers([]).rpc();
    console.log("Your transaction signature", tx);

    const tx2 = await program.methods.set(new anchor.BN(42)).accountsPartial({myStorage: myStoragePDA}).signers([]).rpc();
    console.log("Your transaction signature", tx2);

    const myStorageAccount = await program.account.myStorage.fetch(myStoragePDA);
    console.log("My Storage Account", myStorageAccount);


    const tx3 = await program.methods.printX().accountsPartial({myStorage: myStoragePDA}).signers([]).rpc();
    console.log("Your transaction signature", tx3);


    const tx4 = await program.methods.incrementX().accountsPartial({myStorage: myStoragePDA}).signers([]).rpc();
    console.log("Your transaction signature", tx4);

    const tx5 = await program.methods.printX().accountsPartial({myStorage: myStoragePDA}).signers([]).rpc();
    console.log("Your transaction signature", tx5);

    let myStorageStruct = await program.account.myStorage.fetch(myStoragePDA);
    console.log("The value of x is:",myStorageStruct.x.toString());

    const connection = program.provider.connection;
    const accountInfo = await connection.getAccountInfo(myStoragePDA);
   console.log("Account Info:", JSON.stringify(accountInfo, null, 2));
  });
});
