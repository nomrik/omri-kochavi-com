'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSoundcloud, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const navItems = {
  '/': {
    name: 'home',
  },
  '/about': {
    name: 'about',
  },
  '/works': {
    name: 'works',
  },
  '/events': {
    name: 'events',
  },
  '/contact': {
    name: 'contact',
  },
  'https://soundcloud.com/omri-kochavi-984880996': {
    icon: faSoundcloud,
  },
  'https://www.youtube.com/user/nomrik': {
    icon: faYoutube,
  },
};

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <aside className={`${isOpen ? 'fixed inset-0 flex justify-center items-center bg-white  z-50' : '-ml-[8px] tracking-tight sticky top-0 z-10 h-16 text-center bg-amber-400'} pb-6 pt-4 `}>
      {isOpen && (
        <div className="absolute top-2 left-0 w-full flex justify-between items-center px-4 py-2">
          {/* Close Icon */}
          <button onClick={toggleMenu} className="focus:outline-none">
            <FontAwesomeIcon icon={faTimes} className="text-gray-800 w-6 h-6" />
          </button>

          {/* Placeholder for layout */}
          <div></div>
        </div>
      )}

      <div className="lg:sticky lg:top-20 flex flex-row items-center">
        <Link href="/">
          <h1 className={`font-bold flex align-middle relative py-1 px-2 ${isOpen ? 'hidden' : 'block'}`}>OMRI KOCHAVI</h1>
        </Link>

        <nav className={`flex ml-auto flex-${isOpen ? 'col' : 'row'} items-${isOpen ? 'start' : 'center'} justify-${isOpen ? 'start' : 'center'} ${isOpen ? 'md:w-full md:items-start' : ''}`}>
          {/* Hamburger Menu */}
          {!isOpen && (
            <div className="md:hidden">
              <button onClick={toggleMenu} className="block text-gray-800 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <div className={`md:flex flex-col md:flex-row ${isOpen ? 'flex' : 'hidden'} items-center`}>
            {Object.entries(navItems).map(([path, { name, icon }]) => {
              const isSelected = path === pathname;
              return (
                <Link
                  key={path}
                  href={path}
                  onClick={closeMenu}
                  className={`transition-all hover:text-neutral-800 flex relative py-1 px-2 ${isSelected ? 'font-medium' : ''}`}
                >
                  {icon && <FontAwesomeIcon icon={icon} className="md:mr-2" />}
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
