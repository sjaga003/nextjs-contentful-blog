import Link from 'next/link';
import Footer from './Footer';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <main className="sm:mx-8 md:mx-28 lg:mx-48 xl:mx-96 xl:px-56">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
