
export interface Product {
    id: number;
    name: string;
    description: string;
    year: string,
    image: string;
    price: number;
    nameWinery: string,
    nameVariety: string,
    nameType: string,
    stock?:number
  }
export interface ProductFormValues {
  name: string | undefined;
  description: string | undefined;
  image: string | undefined;
  year: number | undefined;
  price: number | undefined;
  stock: number | undefined;
  idWinery: number | undefined;
  idVariety: number| undefined;
  idType: number | undefined;
}
export interface ICardProduct {
  product: Product, 
  textButton: string, 
  icon: React.ReactNode, 
  href: string, 
  deleteProduct: (id:number) => void
}