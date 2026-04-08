use anchor_lang::prelude::*;

declare_id!("9ZMU6uYtBGZRQH1LcpSaHj3JzVUT26jdaKgSPpfs1GTb");

#[program]
pub mod basic_storage {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

     pub fn set(ctx: Context<Set>, new_x: u64) -> Result<()> {
        let my_storage = &mut ctx.accounts.my_storage;
        my_storage.x = new_x;
        Ok(())
    }

    pub fn print_x(ctx: Context<PrintX>) -> Result<()> {
    let x = ctx.accounts.my_storage.x;
    msg!("The value of x is {}", x);
    Ok(())
}

    pub fn increment_x(ctx: Context<IncrementX>) -> Result<()> {
        let my_storage = &mut ctx.accounts.my_storage;
        my_storage.x += 1;
        Ok(())
    }

}
#[derive(Accounts)]
pub struct Set<'info> {
    #[account(mut, seeds = [], bump)]
    pub my_storage: Account<'info, MyStorage>,
}

#[derive(Accounts)]
pub struct PrintX<'info> {
    pub my_storage: Account<'info, MyStorage>,
}

#[derive(Accounts)]
pub struct IncrementX<'info> {
    #[account(mut, seeds = [], bump)]
    pub my_storage: Account<'info, MyStorage>,
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
    x:u64,
    y:i64
}
