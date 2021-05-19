import Link from 'next/link';

const NavButton = ({ Icon, link, name }) => {
  return (
    <Link href={link}>
      <div className="flex flex-col items-center cursor-pointer h-12 w-12 m-3 group hover:text-blue-500 ">
        <Icon className="group-hover:animate-bounce" />
        <span className="opacity-100 font-medium">{name}</span>
      </div>
    </Link>
  );
};

export default NavButton;
