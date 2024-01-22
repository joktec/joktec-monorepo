export enum OrderType {
  BOOKING = 'booking',
  OTHER = 'other',
}

export enum PaymentMethod {
  COD = 'cod',
  BANKING = 'banking',
  MOMO = 'momo',
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  COMPLETE = 'complete',
  REJECT = 'reject',
  CANCEL = 'cancel',
  EXPIRED = 'expired',
}
