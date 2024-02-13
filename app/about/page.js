import { fetchAboutPage } from '@/app/lib/data';
import Image from 'next/image';

export default async function About() {
    const aboutParagraphs = await fetchAboutPage();
    return (
        <div className="flex flex-row">
            <div className='flex-grow w-1/2 p-5 md:p-10 text-sm'>
                {aboutParagraphs.map(paragraph => (
                    <p className='mb-8' key={paragraph.get('paragraph')}>{paragraph.get('content')}</p>
                ))}
            </div>
            <div class="ml-auto">
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