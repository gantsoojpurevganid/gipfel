import Link from "next/link";

export function Breadcrumb({ links }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex text-xs md:text-sm flex-col font-medium mb-4"
    >
      <ol className="flex items-center overflow-y-auto space-x-2" role="list">
        <li>
          <Link className="hover:underline" href="/">
            Нүүр
          </Link>
        </li>
        {links.map((link, idx) => (
          <li key={`${link.name}${idx}`}>
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="h-5 w-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              {link.link ? (
                <Link
                  className="text-sm pl-2 font-medium text-gray-900"
                  href={link.link}
                >
                  {link.name}
                </Link>
              ) : (
                <p className="text-sm pl-2 font-medium text-gray-900">
                  {link.name}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
