/* eslint-disable camelcase */
export type ItemsType = ItemType[];

export type ItemType = {
  id: number
  in_stock: boolean
  slug: string
  shop_id: string
  active: boolean
  created_at: string
  barcode: BarcodeType
};

export type BarcodeType = {
  id: number
  title: string
  selling_price: string
  images: string[]
  created_at: string
  category: string
  description: string
  storage?: {
    id: number
    shop: ShopType,
    slug: string,
    name: string
  }
};

export type ShopType = {
  id: number,
  user: string,
  slug: string,
  name: string,
  phone: string,
  email: string,
  description: string,
  address: string,
  icon: string,
  created_at: string,
  market_active: boolean
};
