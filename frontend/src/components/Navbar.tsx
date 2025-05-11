import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { PiChefHatBold } from 'react-icons/pi';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/services/authService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth(); // Get current user

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      alert(error.message);
    }
  };

  return (
    <nav className='fixed top-0 w-full bg-white shadow-md z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div
            className='flex flex-row items-center gap-4'
            data-testid='logo-container'
          >
            <PiChefHatBold className='w-8 h-8' />
            <Link to='/' className='text-2xl font-bold text-orange-400'>
              ChefIt
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsOpen(!isOpen)}
              aria-label='Toggle menu'
            >
              <Menu className='h-6 w-6' />
            </Button>
          </div>

          <div className='hidden md:flex items-center space-x-6'>
            <Link
              to='/'
              className='text-gray-700 hover:text-orange-400 transition-colors'
            >
              Home
            </Link>
            <Link
              to='/recipes'
              className='text-gray-700 hover:text-orange-400 transition-colors'
            >
              Recipes
            </Link>
            <Link
              to='/gemini'
              className='text-gray-700 hover:text-orange-400 transition-colors'
            >
              Upload Image
            </Link>
            {user ? (
              <Button onClick={handleSignOut} className='w-20'>
                Sign Out
              </Button>
            ) : (
              <>
                <Link to='/signup'>
                  <Button className='w-20'>Sign Up</Button>
                </Link>
                <Link to='/login'>
                  <Button className='w-20'>Log In</Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className='md:hidden' role='navigation' aria-label='mobile menu'>
            <div className='px-2 pt-2 pb-3 space-y-1 bg-white border-t'>
              <Link
                to='/'
                role='hidden-menu-home'
                className='block px-3 py-2 text-gray-700 hover:text-orange-400 transition-colors'
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to='/recipes'
                className='block px-3 py-2 text-gray-700 hover:text-orange-400 transition-colors'
                onClick={() => setIsOpen(false)}
              >
                Recipes
              </Link>
              <Link
                to='/gemini'
                className='block px-3 py-2 text-gray-700 hover:text-orange-400 transition-colors'
                onClick={() => setIsOpen(false)}
              >
                Upload Image
              </Link>
              {user ? (
                <div className='px-3 py-2'>
                  <Button onClick={handleSignOut}>Sign Out</Button>
                </div>
              ) : (
                <>
                  <Link to='/signup'>
                    <div className='px-3 py-2'>
                      <Button>Sign up</Button>
                    </div>
                  </Link>
                  <Link to='/login'>
                    <div className='px-3 py-2'>
                      <Button>Log In</Button>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
