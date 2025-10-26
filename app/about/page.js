import { fetchAboutPage } from '@/app/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 60;

export default async function About() {
    const aboutParagraphs = await fetchAboutPage();
    return (
        <div className="flex flex-row">
            <div className='flex-grow w-1/2 p-6 pb-0 text-sm'>
                {aboutParagraphs.map(paragraph => (
                    <p className='mb-7' key={paragraph.get('paragraph')} dangerouslySetInnerHTML={{__html: paragraph.get('content')}}></p>
                ))}
                <div className="flex align-center justify-center mb-4 md:mb-4">
                    <Link href="/bios/Omri Kochavi - bio (October 25).pdf" className="underline font-light">PDF version</Link>
                </div>
            </div>
            <div className="ml-auto flex items-center md:mr-6">
                <Image
                    src="/playground.jpeg"
                    width={490}
                    height={1175}
                    className="hidden md:block"
                    alt="Omri Kochavi Playground Picture"
                />
            </div>
        </div>
    )
}