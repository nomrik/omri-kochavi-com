import { fetchWorks } from '@/app/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faFilePdf } from '@fortawesome/free-solid-svg-icons';

const categoryOrder = {
    'upcoming': 0,
    'orchestra': 1,
    'choral': 2
}

export const revalidate = 60;

export default async function Works() {
    const worksByCategory = await fetchWorks();

    return (
        <div className="flex">
            <div className="w-1/6 p-5 hidden md:block md:p-10 relative">
                <ul className="sticky top-20">
                    {Object.keys(worksByCategory).sort((entryA, entryB) => categoryOrder[entryA] - categoryOrder[entryB]).map((category) => (
                        <li key={category} className="mb-6">
                            <Link href={`#${category}`} className="underline font-light">{category.toUpperCase()}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="p-5 md:p-10 text-sm">
                {Object.entries(worksByCategory).sort((entryA, entryB) => categoryOrder[entryA[0]] - categoryOrder[entryB[0]]).map(([category, works]) => {
                    return (
                        <div key={category} id={category} className='mb-4 scroll-my-24'>
                            <h2 className="text-xl font-bold mb-6">{category.toUpperCase()}</h2>
                            {works.map(work => {
                                return (
                                    <div className="mb-8 text-l" key={work.get('title')}>
                                        <div className="mb-4 text-base">
                                            <p className="mb-2 font-medium">{work.get('title')}</p>
                                            <div className="text-sm">
                                                <span>{work.get('instrumentation')}</span>
                                                <span> / </span>
                                                <span>{work.get('duration')}`</span>
                                                <span>/ </span>
                                                <span>{work.get('year')}</span>
                                            </div>
                                        </div>
                                        <div className="mb-4 font-light">
                                            {work.get('commission') && <p className="mb-2">commissioned by {work.get('commission')}</p>}
                                            <p className="mb-2">f.p. {work.get('premiere')}</p>
                                        </div>
                                        <div className="mb-4 font-light">
                                            {work.get('video') &&
                                                <Link
                                                    key={work.get('video')}
                                                    href={work.get('video')}
                                                    className="underline decoration-solid mr-4"
                                                >
                                                    <FontAwesomeIcon icon={faPlayCircle} className="mr-1" />WATCH
                                                </Link>}
                                            {work.get('score') &&
                                                <Link
                                                    key={work.get('score')}
                                                    href={`/${work.get('score')}.pdf`}
                                                    className="underline decoration-solid"
                                                >
                                                    <FontAwesomeIcon icon={faFilePdf} className="mr-1" />SCORE
                                                </Link>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
