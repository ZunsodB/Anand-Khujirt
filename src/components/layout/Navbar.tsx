"use client";

import { useState, useEffect } from "react";
import { Phone, Menu, X, UserCircle } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            id="navbar"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="/" className="flex flex-col group">
                        <span
                            className={`font-serif text-xl font-bold tracking-wide transition-colors duration-300 ${isScrolled ? "text-emerald-dark" : "text-white"
                                }`}
                        >
                            АНАНД ХУЖИРТ
                        </span>
                        <span
                            className={`text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 ${isScrolled ? "text-charcoal/50" : "text-white/70"
                                }`}
                        >
                            С У В И Л А Л
                        </span>
                    </a>

                    {/* Desktop Right Side */}
                    <div className="hidden md:flex items-center gap-6">
                        <a
                            href="tel:+97699123456"
                            id="nav-phone"
                            className={`flex items-center gap-2 text-base font-medium transition-colors duration-300 hover:opacity-80 ${isScrolled ? "text-charcoal" : "text-white"
                                }`}
                        >
                            <Phone className="w-5 h-5" />
                            <span>Холбоо барих</span>
                        </a>
                        <a
                            href="/auth/login"
                            id="nav-login-btn"
                            className={`flex items-center gap-2 text-base font-medium transition-colors duration-300 hover:opacity-80 ${isScrolled ? "text-charcoal" : "text-white"
                                }`}
                        >
                            <UserCircle className="w-5 h-5" />
                            <span>Нэвтрэх/Бүртгүүлэх</span>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        id="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${isScrolled
                            ? "text-charcoal hover:bg-cream-dark"
                            : "text-white hover:bg-white/10"
                            }`}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-7 h-7" />
                        ) : (
                            <Menu className="w-7 h-7" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-60 mt-4" : "max-h-0"
                        }`}
                >
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl space-y-4">
                        <a
                            href="tel:+97699123456"
                            className="flex items-center gap-3 text-charcoal text-lg font-medium"
                        >
                            <Phone className="w-5 h-5 text-emerald" />
                            Холбоо барих
                        </a>
                        <a
                            href="/auth/login"
                            className="flex items-center gap-3 text-charcoal text-lg font-medium"
                        >
                            <UserCircle className="w-5 h-5 text-emerald" />
                            Нэвтрэх/Бүртгүүлэх
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
