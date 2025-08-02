import { fetchWorks } from "@/app/lib/data";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faFilePdf,
  faClapperboard,
} from "@fortawesome/free-solid-svg-icons";

const categoryOrder = {
  upcoming: 0,
  orchestra: 1,
  "choral / vocal ensemble": 2,
  chamber: 3,
  dancer: 4,
  "voice + instruments": 5,
  solo: 6,
};

export const revalidate = 60;

export default async function Works() {
  const worksByCategory = await fetchWorks();

  return (
    <div className="flex">
      <div className="w-1/6 p-5 hidden md:block md:p-10 relative">
        <ul className="sticky top-20">
          {Object.keys(worksByCategory)
            .sort(
              (entryA, entryB) => categoryOrder[entryA] - categoryOrder[entryB]
            )
            .map((category) => (
              <li key={category} className="mb-6">
                <Link href={`#${category}`} className="underline font-light">
                  {category.toUpperCase()}
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="p-5 md:p-10 text-sm">
        <p className="mb-8">
          {" "}
          Please{" "}
          <Link href={`/contact`} className="underline font-light">
            contact me
          </Link>{" "}
          for any scores / recordings that are not on here.
        </p>
        {Object.entries(worksByCategory)
          .sort(
            (entryA, entryB) =>
              categoryOrder[entryA[0]] - categoryOrder[entryB[0]]
          )
          .map(([category, works]) => {
            return (
              <div key={category} id={category} className="mb-4 scroll-my-24">
                {category === "upcoming" && (
                  <hr className="border-black mb-8 border-[1px] rounded" />
                )}

                <h2 className="text-xl font-bold mb-6">
                  {category.toUpperCase()}
                </h2>
                {works.map((work) => {
                  return (
                    <div className="mb-8 text-l scroll-my-24" key={work.get("title")} id={work.get("title").toLowerCase().replace(/\s+/g, '-')}>
                      <div className="mb-4 text-base">
                        <p className="mb-2 font-medium">{work.get("title")}</p>
                        <div className="text-sm">
                          <span>{work.get("instrumentation")}</span>
                          <span> / </span>
                          <span>{work.get("duration")}`</span>
                          <span>/ </span>
                          <span>{work.get("year")}</span>
                        </div>
                      </div>
                      <div className="mb-4 font-light">
                        {work.get("text") && (
                          <p className="mb-2">text by {work.get("text")}</p>
                        )}
                        {work.get("collaborators") && (
                          <p className="mb-2">
                            in collaboration with {work.get("collaborators")}
                          </p>
                        )}
                        {work.get("commission") && (
                          <p className="mb-2">
                            commissioned by {work.get("commission")}
                          </p>
                        )}
                        {work.get("premiere") && (
                          <p className="mb-2">f.p. {work.get("premiere")}</p>
                        )}
                        {work.get("written_for") && (
                          <p className="mb-2">
                            written for {work.get("written_for")}
                          </p>
                        )}
                        {work.get("misc") && (
                          <p className="mb-2">{work.get("misc")}</p>
                        )}
                      </div>
                      <div className="mb-4 font-light">
                        {work.get("video") && (
                          <Link
                            key={work.get("video")}
                            href={work.get("video")}
                            className="underline decoration-solid mr-4"
                            target="_blank"
                          >
                            <FontAwesomeIcon
                              icon={faClapperboard}
                              className="mr-1"
                            />
                            WATCH
                          </Link>
                        )}
                        {work.get("audio") && (
                          <Link
                            key={work.get("audio")}
                            href={work.get("audio")}
                            className="underline decoration-solid mr-4"
                            target="_blank"
                          >
                            <FontAwesomeIcon
                              icon={faPlayCircle}
                              className="mr-1"
                            />
                            LISTEN
                          </Link>
                        )}
                        {work.get("score") && (
                          <Link
                            key={work.get("score")}
                            href={`/scores/${work.get("score")}.pdf`}
                            className="underline decoration-solid"
                            target="_blank"
                          >
                            <FontAwesomeIcon
                              icon={faFilePdf}
                              className="mr-1"
                            />
                            SCORE
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
                {category === "upcoming" && (
                  <hr className="border-black mb-8 border-[1px] rounded" />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
