export function getTrackingUrl(carrier: string, trackingNumber: string): string | null {
  const n = encodeURIComponent(trackingNumber)
  switch (carrier) {
    case 'ukrposhta': return `https://track.ukrposhta.ua/tracking_UA.html?barCode=${n}`
    case 'dhl':       return `https://www.dhl.com/en/express/tracking.html?AWB=${n}`
    case 'ups':       return `https://www.ups.com/track?tracknum=${n}`
    case 'fedex':     return `https://www.fedex.com/fedextrack/?trknbr=${n}`
    case 'usps':      return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${n}`
    default:          return null
  }
}

export const CARRIER_LABELS: Record<string, string> = {
  ukrposhta: 'Укрпошта',
  dhl: 'DHL',
  ups: 'UPS',
  fedex: 'FedEx',
  usps: 'USPS',
  other: 'Other',
}
