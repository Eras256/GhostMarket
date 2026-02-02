use anchor_lang::prelude::*;

#[account]
pub struct MarketState {
    pub authority: Pubkey,
    pub treasury: Pubkey,
    pub arcium_mxe_key: Pubkey, // Global MXE for default computations
    pub fee_basis_points: u16,
    pub total_volume: u64,
    pub bump: u8,
}

impl MarketState {
    // Discriminator (8) + 32 + 32 + 32 + 2 + 8 + 1
    pub const INIT_SPACE: usize = 8 + 32 + 32 + 32 + 2 + 8 + 1;
}

#[account]
pub struct Listing {
    pub seller: Pubkey,
    pub mint: Pubkey,
    pub price: u64,
    pub is_private: bool,
    pub arcium_mxe_pubkey: Option<Pubkey>,
    pub x402_gateway_url: String, // Max 200 chars
    pub bump: u8,
}

impl Listing {
    pub const MAX_URL_LEN: usize = 200;
    
    // Discriminator (8) + 32 + 32 + 8 + 1 + (1 + 32) [Option<Pubkey>] + (4 + 200) [String] + 1
    pub const INIT_SPACE: usize = 8 + 32 + 32 + 8 + 1 + 33 + (4 + 200) + 1;
}
