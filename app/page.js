import Image from 'next/image';

export default function Home() {
    return (
        <div className="flex flex-row">
            <div class="flex-grow p-10 flex flex-col justify-center items-center">
              <p className="text-4xl mb-4">OMRI KOCHAVI</p>
              <p className="text-xl mb-4">composer, guitarist</p>
              <p className="text-xl mb-8">London | Tel Aviv</p>
              <Image
                  src="/profile.jpeg"
                  width={245}
                  height={587.5}
                  className="block md:hidden mb-8"
                  alt="Omri Kochavi Profile Picture"
              />
              <p className="text-sm mb-2"><i>BBC Singers dir. Owain Park</i></p>
              <iframe className="w-full md:max-w-[600px] md:min-w-96 md:w-3/4 aspect-video" src="https://www.youtube.com/embed/uqwlIsPtlgg?si=NRl_iXO3Jl_E5bef&amp;controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              <p className="text-base mt-2"><b>Kishtatos</b> (2022)</p>
            </div>
            <div class="ml-auto">
              <Image
                  src="/profile.jpeg"
                  width={490}
                  height={1175}
                  className="hidden md:block"
                  alt="Omri Kochavi Profile Picture"
              />
            </div>
        </div>
    )
}