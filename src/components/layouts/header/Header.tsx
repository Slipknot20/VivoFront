'use client'
import React, { useState } from "react";
import Link from "next/link";
import { FaSearch, FaUser, FaShoppingCart, FaBars } from "react-icons/fa";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-violeta fixed top-0 w-full z-50">
            <div className="container mx-auto flex justify-between items-center h-full py-4 px-4 md:px-28">
                <div className="flex items-center">
                    <Link href="/">
                        <img src="/logo-vinovivo.png" alt="logo" className="h-12 md:h-24" />
                    </Link>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/">
                        <span className="text-beige hover:text-gray-300">PRODUCTOS</span>
                    </Link>
                    <Link href="/concept">
                        <span className="text-beige hover:text-gray-300">CONCEPTO</span>
                    </Link>
                    <Link href="/contact">
                        <span className="text-beige hover:text-gray-300">CONTACTO</span>
                    </Link>
                    <div className="flex space-x-1 items-center">
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="text-violeta px-2 py-1 border border-gray-300 rounded-lg"
                        />
                        <FaSearch className="text-white text-xl" />
                    </div>
                    <div className="flex space-x-4 items-center">
                        <FaUser className="text-white text-2xl cursor-pointer hover:text-gray-300" />
                        <FaShoppingCart className="text-white text-2xl cursor-pointer hover:text-gray-300" />
                    </div>
                </div>
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-white text-2xl cursor-pointer hover:text-gray-300">
                        <FaBars />
                    </button>
                </div>
            </div>

            {/* Menú hamburguesa */}
            {isMenuOpen && (
                <div className="md:hidden bg-violeta py-4">
                    <div className="flex flex-col items-center space-y-4">
                        <Link href="/products">
                            <span className="text-beige hover:text-gray-300">PRODUCTOS</span>
                        </Link>
                        <Link href="/concept">
                            <span className="text-beige hover:text-gray-300">CONCEPTO</span>
                        </Link>
                        <Link href="/contact">
                            <span className="text-beige hover:text-gray-300">CONTACTO</span>
                        </Link>
                        <div className="flex space-x-1 items-center">
                            <input
                                type="text"
                                placeholder="Buscar"
                                className="text-violeta px-2 py-1 border border-gray-300 rounded-lg"
                            />
                            <FaSearch className="text-white text-xl" />
                        </div>
                        <div className="flex space-x-4 items-center">
                            <FaUser className="text-white text-2xl cursor-pointer hover:text-gray-300" />
                            <FaShoppingCart className="text-white text-2xl cursor-pointer hover:text-gray-300" />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
