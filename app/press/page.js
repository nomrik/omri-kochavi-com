import { fetchPress } from "@/app/lib/data";
import Link from "next/link";

export const revalidate = 60;

export default async function Press() {
  const pressItems = await fetchPress();

  return (
    <div className="flex">
      <div className="p-5 md:p-10 text-sm flex-1">
        <h2 className="text-xl font-bold mb-6">PRESS</h2>
        {pressItems.length === 0 ? (
          <p>No press items available at the moment.</p>
        ) : (
          <ul className="list-disc list-inside">
            {pressItems.map((item, index) => {
              const title = item.get('title');
              const url = item.get('url');
              
              if (!title || !url) {
                return null;
              }

              return (
                <li key={index} className="mb-4 text-l">
                  <Link
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium underline hover:no-underline"
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
