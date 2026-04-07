use anchor_lang::prelude::*;

declare_id!("9ZMU6uYtBGZRQH1LcpSaHj3JzVUT26jdaKgSPpfs1GTb");

#[program]
pub mod basic_storage {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init,
    payer =signer,
    space = size_of::<MyStorage>()+8,
    seeds =[],
    bump)]
    pub my_storage: Account<'info, MyStorage>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}


#[account]
pub struct MyStorage{
    x:i64,
    y:i64
}
