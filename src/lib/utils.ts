import { IIdName} from "@/types/idName/idName.types";
import { Product} from "@/types/products/products.types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IwineDetail, WineType } from "@/types/detail/detail.types";
import { QuantitySoldData, StockData, TypeSalesData } from "@/types/reports/reports.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getProductList = async (): Promise<Product[]> => {
  const url: string = `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/product/type/all`;

  try {
    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error("Error fetching products"); 
    }

    const data: Product[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getProduct = async (id:number) => {
  const url: string = `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/product/id/${id}`
 

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  const products = await response.json();
  return products;
};

// -----------------------------

export const getProductsType = async (type:any): Promise<IwineDetail[]> => {
  const url: string = `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/product/type/${type}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching products");
    }

    const data: IwineDetail[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export const getTypes = async (): Promise<WineType[]> => {
  const url: string = `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commercetype/all`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching products");
    }

    const data: WineType[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// -------------------------------------

export const getVariety = async (): Promise<IIdName[]> => {
  const url: string = `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/variety/all`

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  const variety:IIdName[] = await response.json();
  return variety;
};

export const getType = async (): Promise<IIdName[]> => {
  const url: string = `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/type/all`

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  const type:IIdName[] = await response.json();
  return type;
};
export const getTypeRe = async (): Promise<WineType[]> => {
  const url: string = `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/type/all`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching types");
    }

    const data: WineType[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getWinery = async (): Promise<IIdName[]> => {
  const url: string = `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/type/all`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  const winery: IIdName[] = await response.json();
  return winery;
};
