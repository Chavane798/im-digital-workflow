import Link from "next/link";

const Navbar = ({ links }) => {
  return (
    <nav className="bg-gray-900 p-4">
      <div className="max-w-screen-xl mx-auto px-4">
        <ul className="flex space-x-4 justify-center sm:justify-start items-center">
          {/* Link para a Home */}
          <li>
            <Link href="/" className="text-white hover:underline">
              Home
            </Link>
          </li>
          {links.map((link) => (
            <li key={link.id}>
              <Link
                href={link.attributes?.url || "/servicos"} // Valor padrão caso 'url' não exista
                className="text-white hover:underline"
              >
                {link.attributes?.title || "Serviços"} {/* Valor padrão para o título */}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
