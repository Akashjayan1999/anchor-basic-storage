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
  });
});
