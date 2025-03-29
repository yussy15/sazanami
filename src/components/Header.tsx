import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-blue-500 p-4 text-white">
      <nav>
        <ul className="flex space-x-4">
          <li><Link href="/">ホーム</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;