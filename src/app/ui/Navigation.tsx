'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Navigation() {
  const pathname = usePathname();

  const navLinkClasses = (href: string) => 
    clsx('hover:underline', {
      'font-bold': pathname === href
    });

  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">My Blog</span>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link 
              href="/blog" 
              className={navLinkClasses('/blog')}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link 
              href="/blog/new" 
              className={navLinkClasses('/blog/new')}
            >
              New Post
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}