import Link from 'next/link';
import NavButton from './NavButton';
import { HomeIcon, LightBulbIcon } from '@heroicons/react/outline';

const Nav = () => {
  return (
    <nav className="flex flex-col items-center m-10">
      <Link href="/">
        <span className="font-sans text-7xl font-bold mb-16 hover:text-blue-500 cursor-pointer">
          Blog.
        </span>
      </Link>
      <div className="flex flex-row justify-center">
        <NavButton link="/" Icon={HomeIcon} name="Home" />
        <NavButton link="/about" Icon={LightBulbIcon} name="About" />
      </div>
    </nav>
  );
};

export default Nav;
