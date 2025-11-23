import { Compass } from "lucide-react";

const links = [
  { name: "About", href: "#" },
  { name: "Features", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Contact", href: "#" },
  { name: "Login", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-500 rounded-xl flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl text-gray-900">PlanIt</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>


          <div className="text-sm text-gray-500">
            © 2025 PlanIt. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
