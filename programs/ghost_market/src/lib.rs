use anchor_lang::prelude::*;

pub mod state;
pub mod instructions;
pub mod error;

use instructions::*;

declare_id!("5oCgPmgHbb5h1qv3tkyVSW21Zjw75NzYEb5XYjUiqGxa");

#[program]
pub mod ghost_market {
    use super::*;

    pub fn initialize_market(ctx: Context<InitializeMarket>, treasury: Pubkey, arcium_mxe_key: Pubkey, fee_basis_points: u16) -> Result<()> {
        initialize_market_handler(ctx, treasury, arcium_mxe_key, fee_basis_points)
    }

    pub fn list_item(
        ctx: Context<ListItem>, 
        listing_id: u64, 
        price: u64, 
        is_private: bool, 
        arcium_mxe_pubkey: Option<Pubkey>, 
        x402_gateway_url: String
    ) -> Result<()> {
        list_item_handler(ctx, listing_id, price, is_private, arcium_mxe_pubkey, x402_gateway_url)
    }

    pub fn execute_ghost_sale(
        ctx: Context<ExecuteGhostSale>,
        proof: [u8; 64],
        root: [u8; 32],
        nullifier_hash: [u8; 32],
    ) -> Result<()> {
        execute_ghost_sale_handler(ctx, proof, root, nullifier_hash)
    }

    pub fn place_secret_bid(
        ctx: Context<PlaceSecretBid>,
        encrypted_amount: Vec<u8>
    ) -> Result<()> {
        place_secret_bid_handler(ctx, encrypted_amount)
    }
}
