'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Menu, X } from 'lucide-react';
// import Link from 'next/link'; // Replaced for Preview compatibility

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '解决方案', href: '#features' },
    { label: '价格', href: '#pricing' },
    { label: '帮助中心', href: '/docs' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 rounded-lg p-1.5 text-white transition-transform group-hover:scale-105">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">ClawdCom</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a href="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
              登录
            </a>
            <a href="/dashboard">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-0.5">
                免费试用 1 天
              </button>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 p-4 shadow-xl">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                className="text-base font-medium text-slate-700 p-2 hover:bg-slate-50 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
              <a href="/login" className="w-full text-center py-2 text-slate-600">登录</a>
              <a href="/dashboard" className="w-full bg-indigo-600 text-white py-3 rounded-lg text-center font-bold">
                进入控制台
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;