import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function HeroSection() {
  const { user, loading, error, login, signUp, logout } = useAuth();

  return (
    <section className="relative overflow-hidden bg-gray-900 text-gray-300 px-3 min-h-[40rem] flex items-center justify-center">
      <div className="w-full max-w-7xl text-center py-14">
        <h1 className="text-white text-6xl lg:text-7xl font-extrabold mb-4">
          Rent or sell house at best price.
        </h1>
        <p className="leading-loose mb-10 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quia tenetur consectetur
          voluptas deleniti iure quas aliquam laboriosam fuga quos.
        </p>
        {!user && (
          <div className="flex items-center justify-center flex-wrap gap-4">
            <Link
              to="/login"
              className="btn bg-white text-gray-900 hover:bg-gray-200 flex-shrink-0 w-[160px]">
              Login
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default HeroSection;
