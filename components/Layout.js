import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div>
      <nav>
        <Link href="/">
          <span>Logo</span>
        </Link>
        <div>
          <Link href="/">
            <span>Home</span>
          </Link>
          <Link href="/about">
            <span>About</span>
          </Link>
        </div>
      </nav>
      <main>{children}</main>
      <footer>FOOTER</footer>
    </div>
  );
};

export default Layout;
