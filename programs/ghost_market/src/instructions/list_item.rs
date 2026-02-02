use anchor_lang::prelude::*;
use crate::state::{Listing, MarketState};
use crate::error::GhostError;

#[derive(Accounts)]
#[instruction(listing_id: u64)]
pub struct ListItem<'info> {
    #[account(
        init,
        payer = seller,
        space = Listing::INIT_SPACE,
        seeds = [b"listing", seller.key().as_ref(), &listing_id.to_le_bytes()], 
        bump
    )]
    pub listing: Account<'info, Listing>,
    
    #[account(mut)]
    pub seller: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

pub fn list_item_handler(
    ctx: Context<ListItem>,
    listing_id: u64,
    price: u64,
    is_private: bool,
    arcium_mxe_pubkey: Option<Pubkey>,
    x402_gateway_url: String,
) -> Result<()> {
    require!(x402_gateway_url.len() <= 200, GhostError::NameTooLong);
    
    let listing = &mut ctx.accounts.listing;
    listing.seller = ctx.accounts.seller.key();
    listing.mint = Pubkey::default(); 
    listing.price = price;
    listing.is_private = is_private;
    listing.arcium_mxe_pubkey = arcium_mxe_pubkey;
    listing.x402_gateway_url = x402_gateway_url;
    listing.bump = ctx.bumps.listing;
    
    msg!("Item Listed. ID: {}, Price: {}", listing_id, price);
    Ok(())
}
