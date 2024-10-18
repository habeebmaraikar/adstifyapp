"use client" ; // Add this to use hooks

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current path

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggles menu open/close
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" href="/">
            <Image
            className='logo'
            src="/images/logo.png"
            alt="Adstify logo"
            width={180}
            height={61}
            priority
          />
          </Link>
          <button className="navbar-toggler" onClick={toggleMenu}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'active' : ''}`}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={`nav-link ${pathname === '/' ? 'active' : ''}`} href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${pathname === '/news' ? 'active' : ''}`} href="/news">
                  News
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${pathname === '/topstories' ? 'active' : ''}`} href="/topstories">
                  Top Stories
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${pathname === '/randomuser' ? 'active' : ''}`} href="/randomuser">
                  Random User
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${pathname === '/weather' ? 'active' : ''}`} href="/weather">
                  Weather
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
