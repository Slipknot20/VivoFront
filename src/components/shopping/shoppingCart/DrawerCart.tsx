"use client";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useCart } from "@/context/CartContext";
import DrawerCartHeader from "./DrawerCartHeader";
import DrawerCartFooter from "./DrawerCartFooter";
import ProductCard from "./ProductCard";
import TitleSection from "./TitleSection";

export default function DrawerCart() {
    const { isOpen, closeCart, cartItems  } = useCart();

    return (
        <Drawer open={isOpen} onOpenChange={(isOpen) => !isOpen && closeCart()} direction="right">
            <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 sm:w-[440px] w-[400px] rounded-none flex flex-col">
                <DrawerCartHeader />
                <div className="flex-grow overflow-y-auto mx-auto w-full max-w-sm">
                    <TitleSection />
                    {cartItems.map((item) => (
                        <ProductCard key={item.id} item={item} />
                    ))}
                </div>
                <DrawerCartFooter />
            </DrawerContent>
        </Drawer>
    );
}
