import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0a0086] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-[#ffd700]">About Us</Link></li>
              <li><Link href="/executive-board" className="hover:text-[#ffd700]">Executive Board</Link></li>
              <li><Link href="/events" className="hover:text-[#ffd700]">Events</Link></li>
              <li><Link href="/contact" className="hover:text-[#ffd700]">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>50 Harrison Street</li>
              <li>Hoboken, NJ 07030</li>
              <li>Phone: (201) 555-0123</li>
              <li>Email: info@twulocal229.org</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#ffd700]">Facebook</a>
              <a href="#" className="hover:text-[#ffd700]">Twitter</a>
              <a href="#" className="hover:text-[#ffd700]">Instagram</a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-gray-800 rounded"
              />
              <button
                type="submit"
                className="w-full bg-[#ffd700] text-[#0a0086] px-4 py-2 rounded font-bold hover:bg-yellow-400 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-blue-800 text-center">
          <p>&copy; {currentYear} TWU Local 229. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 