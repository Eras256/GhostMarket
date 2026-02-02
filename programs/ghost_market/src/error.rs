use anchor_lang::prelude::*;

#[error_code]
pub enum GhostError {
    #[msg("The provided name or URL is too long.")]
    NameTooLong,
    #[msg("Invalid URL encoding.")]
    InvalidUrl,
}
