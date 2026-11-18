// ADR 0023 — block-explorer links for payout tx hashes. Both values are typed by hand in admin, so
// an unknown currency or an odd-looking hash gets no link and shows as plain text.

const TX_URL_BY_CURRENCY: Record<string, (hash: string) => string> = {
  BTC: (hash) => `https://mempool.space/tx/${hash}`,
  LTC: (hash) => `https://litecoinspace.org/tx/${hash}`,
  ETH: (hash) => `https://etherscan.io/tx/${hash}`,
  USDTTRC20: (hash) => `https://tronscan.org/#/transaction/${hash}`,
};

const TX_HASH = /^[A-Za-z0-9]+$/;

export function txExplorerUrl(cryptoCurrency: string, txHash: string): string | null {
  const currency = cryptoCurrency.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const buildUrl = Object.hasOwn(TX_URL_BY_CURRENCY, currency)
    ? TX_URL_BY_CURRENCY[currency]
    : undefined;
  return buildUrl && TX_HASH.test(txHash) ? buildUrl(txHash) : null;
}
