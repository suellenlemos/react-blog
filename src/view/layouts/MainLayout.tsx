import { LiaBlogger } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import { UserMenu } from '../components/UserMenu';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="w-full h-full flex items-center justify-start flex-col">
      <div className="w-full">
        <header className="h-16 flex items-center justify-between pl-6 pr-8 mb-10 border-b border-gray-500">
          <Link className="flex items-center gap-2" to="/">
            <LiaBlogger color="#134e4a" size="42px" />
            <div className="text-black text-lg font-bold">REACT BLOG</div>
          </Link>
          <UserMenu />
        </header>
        <Outlet />
      </div>
    </div>
  );
};
