'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCartStore } from "../../store/cart-store";
import { Button } from "./ui/button";

const Navbar = () => {
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold hover:text-blue-600 transition-colors">
          My Ecommerce
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
          <Link href="/checkout" className="hover:text-blue-600 transition-colors">Checkout</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/checkout" className="relative">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <ul className="flex flex-col px-4 py-4 space-y-3 text-sm font-medium">
            <li>
              <Link href="/" className="block hover:text-blue-600 transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/products" className="block hover:text-blue-600 transition-colors">Products</Link>
            </li>
            <li>
              <Link href="/checkout" className="block hover:text-blue-600 transition-colors">Checkout</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
