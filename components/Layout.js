import Link from 'next/link';
import Footer from './Footer';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
