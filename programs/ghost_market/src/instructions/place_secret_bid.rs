use anchor_lang::prelude::*;
use crate::state::Listing;

// --- MOCK ARCIUM SDK (Simulation of External Crate) ---
// This module simulates the interface of the Arcium SDK for the hackathon context
// since the actual crate is private or not available in this environment.
pub mod arcium_sdk {
    use super::*;

    pub mod state {
        use super::*;
        #[derive(Accounts)]
        pub struct MXE<'info> {
            /// CHECK: Mock
            pub account: AccountInfo<'info>,
        }
    }

    pub mod cpi {
        use super::*;
        
        #[derive(Accounts)]
        pub struct QueueComputation<'info> {
            /// CHECK: MXE Account
            pub mxe: AccountInfo<'info>,
            /// CHECK: Authority
            pub authority: AccountInfo<'info>,
        }

        pub fn queue_computation<'info>(
            _ctx: CpiContext<'_, '_, '_, 'info, QueueComputation<'info>>,
            _function_name: &str,
            _encrypted_input: Vec<u8>
        ) -> Result<()> {
            // In a real environment, this invokes the Arcium Program.
            // Here we just log to prove the CPI path is structured correctly.
            msg!("CPI to Arcium: Queueing computation '{}'", _function_name);
            msg!("Encrypted Payload Size: {} bytes", _encrypted_input.len());
            Ok(())
        }
    }
}
// -------------------------------------------------------

#[derive(Accounts)]
#[instruction(encrypted_amount: Vec<u8>)]
pub struct PlaceSecretBid<'info> {
    #[account(mut)]
    pub listing: Account<'info, Listing>,
    
    #[account(mut)]
    pub bidder: Signer<'info>,

    /// CHECK: The Arcium Multi-Party Execution Environment account
    pub arcium_mxe: UncheckedAccount<'info>,

    /// CHECK: Arcium Main Program
    pub arcium_program: UncheckedAccount<'info>,
    
    pub system_program: Program<'info, System>,
}

pub fn place_secret_bid_handler(
    ctx: Context<PlaceSecretBid>,
    encrypted_amount: Vec<u8>,
) -> Result<()> {
    let listing = &ctx.accounts.listing;
    
    // 1. Validate that the input is actually encrypted (basic length check for ElGamal/RSA)
    require!(encrypted_amount.len() >= 64, ErrorCode::InvalidCiphertext);

    // 2. Queue the computation on Arcium Network via CPI
    // We are asking Arcium nodes to: Decrypt(bid) > Decrypt(reserve_price)
    let cpi_program = ctx.accounts.arcium_program.to_account_info();
    let cpi_accounts = arcium_sdk::cpi::QueueComputation {
        mxe: ctx.accounts.arcium_mxe.to_account_info(),
        authority: ctx.accounts.bidder.to_account_info(),
    };
    
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    
    // The "function_hash" corresponds to the compiled circuit for "Greater Than" logic
    arcium_sdk::cpi::queue_computation(cpi_ctx, "compare_bid_circuit", encrypted_amount.clone())?;

    emit!(SecretBidPlaced {
        listing: listing.key(),
        bidder: ctx.accounts.bidder.key(),
        mxe: ctx.accounts.arcium_mxe.key(),
        encrypted_amount: encrypted_amount 
    });

    msg!("Secret Bid Placed for Listing {}", listing.key());

    Ok(())
}

#[event]
pub struct SecretBidPlaced {
    pub listing: Pubkey,
    pub bidder: Pubkey,
    pub mxe: Pubkey,
    pub encrypted_amount: Vec<u8>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("This listing does not support private bidding.")]
    NotPrivateListing,
    #[msg("The provided MXE does not match the listing configuration.")]
    InvalidMXE,
    #[msg("Invalid ciphertext length.")]
    InvalidCiphertext,
}
