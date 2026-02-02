use anchor_lang::prelude::*;
use crate::state::MarketState;

#[derive(Accounts)]
pub struct InitializeMarket<'info> {
    #[account(
        init,
        payer = authority,
        space = MarketState::INIT_SPACE,
        seeds = [b"market_state"],
        bump
    )]
    pub market_state: Account<'info, MarketState>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

pub fn initialize_market_handler(
    ctx: Context<InitializeMarket>, 
    treasury: Pubkey,
    arcium_mxe_key: Pubkey,
    fee_basis_points: u16
) -> Result<()> {
    let market_state = &mut ctx.accounts.market_state;
    market_state.authority = ctx.accounts.authority.key();
    market_state.treasury = treasury;
    market_state.arcium_mxe_key = arcium_mxe_key;
    market_state.fee_basis_points = fee_basis_points;
    market_state.total_volume = 0;
    market_state.bump = ctx.bumps.market_state;
    
    msg!("GhostMarket Initialized. Authority: {}", market_state.authority);
    Ok(())
}
