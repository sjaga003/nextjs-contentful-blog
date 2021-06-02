import Link from 'next/link';
import Footer from './Footer';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <div className="">
      <Nav />
      <main className="mx-4 sm:mx-8 md:mx-28 lg:mx-48 xl:mx-96 flex flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
