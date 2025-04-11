import Link from 'next/link';

interface UtilityCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

export default function UtilityCard({ title, description, href, icon }: UtilityCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {icon || (
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="ml-5">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <Link
          href={href}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          使ってみる &rarr;
        </Link>
      </div>
    </div>
  );
}