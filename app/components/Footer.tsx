import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 md:py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6 mb-4">
          <Link href="/about" className="hover:text-[#4a9960] transition-colors text-sm sm:text-base">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-[#4a9960] transition-colors text-sm sm:text-base">
            Contact
          </Link>
          <Link href="/products" className="hover:text-[#4a9960] transition-colors text-sm sm:text-base">
            Products
          </Link>
        </div>
        <p className="text-gray-500 text-xs sm:text-sm">&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
