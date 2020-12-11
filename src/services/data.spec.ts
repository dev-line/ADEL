export interface ProductSchema {
  id?: number;
  createdAt?: string;
  updateAt?: string;
  published?: boolean;
  name: string;
  image?: string;
  price_silver: number;
  price_blacquer: number;
  type?: string;
  qn?: number;
  total?: number;
  categories?: CategSchema[];
}
export interface CategSchema {
  name: string;
  id: number;
  createdAt: string;
  updateAt: string;
  products?: ProductSchema[];
}
export interface OrdersSchema {
  id: number;
  createdAt: string;
  updateAt: string;
  name: string;
  gender: string;
  phone: number;
  address: string;
  Products?: string;
  delivered?: boolean;
}

export interface InfoSchema {
  id?: number;
  createdAt?: string;
  facebook?: string;
  Instagram?:string;
  phone?: string;
  email?: string;
  address?: string;
  about?: string;
}

export interface UserSchema {
  email: string
  id: number
  name: string
  password?: string
  OldPass?: string
  username: string
}
