'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/app/firebase/config';
import { useAuth } from '@/app/context/AuthContext';

function Footer() {
  const router = useRouter();
  const { user } = useAuth();

  const onLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem('user');
      router.push('/sign-in');
    } catch (err) {
      console.error('Could not log out:', err);
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-9 pb-5">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
{/* Quick Linkes for all the pages */}
          <div>
            <h3 className="font-medium text-lg mb-3">Quick Links</h3>
            <ul className="space-y-[5px] text-md">
              {[
                ['/', 'Home'],
                ['/property-listings', 'Listings'],
                ['/about', 'About'],
                ['/contact', 'Contact'],
                ['/terms', 'Terms & Services'],
                ['/faqs', 'FAQs']
              ].map(([href, page]) => (
                <li key={page}>
                  <Link href={href} className="text-gray-300 hover:text-white">
                    {page}
                  </Link>
                </li>
              ))}
              {user && (
                <>
                  <li>
                    <button
                      onClick={onLogout}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

      {/* Socials links for the platform to explore more */}
          <div>
            <h3 className="font-medium text-lg mb-3">Follow Us</h3>
            <ul className="text-sm space-y-2">
             <li><a href="/" className="text-gray-300 hover:text-white">Facebook</a></li>
             <li><a href="/" className="text-gray-300 hover:text-white">Instagram</a></li>
            </ul>
          </div>

      {/* Address and contacts */}
          <div>
            <h3 className="font-medium text-lg mb-3">Contact Info</h3>
            <ul className="text-gray-300 text-sm space-y-[5px]">
            <li>Auctrix Tower, 123 MG Road</li>
            <li>Mumbai, Maharashtra 400001</li>
            <li>Email: info@auctrix.com</li>
            <li>Phone: +91 98765 43210</li>
            </ul>
          </div>
      </div>

        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Auctrix — All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer
