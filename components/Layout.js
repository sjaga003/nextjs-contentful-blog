import Link from 'next/link';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <main>{children}</main>
      <footer>FOOTER</footer>
    </div>
  );
};

export default Layout;
