import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-[80vh]">
      {/* Left scrollable section */}
      <div className="flex-1 overflow-y-auto pl-8 pr-8 pb-8 max-h-[100vh]">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-stretch">
          {/* Mobile profile image */}
          <Image
            src="/profile.jpeg"
            width={245}
            height={587.5}
            className="block md:hidden mx-auto pt-8"
            alt="Omri Kochavi Profile Picture"
          />
          <div className="flex flex-col items-center sticky top-0 z-10 bg-amber-500 pt-8 border-b border-black">
            <h1 className="text-3xl mb-3">OMRI KOCHAVI</h1>
            <p className="text-lg mb-6">composer | guitarist</p>
          </div>
            {/* Divider */}
            {/* <div className="border-t border-black mb-8"></div> */}
          
          {/* Ladies in Bloomers Section */}
          <div className="mb-8 pt-8">
            <h2 className="text-xl font-bold mb-4">LADIES IN BLOOMERS - PREMIERE</h2>
            <p className="text-sm mb-3 font-semibold text-left">
              London Sinfonietta and EXAUDI Vocal Ensemble give the premiere of &ldquo;Ladies in Bloomers&rdquo; at Story Garden (British Library, London) on Sunday, September 14th 2025.
            </p>
            <p className="text-sm mb-4 text-left">
              Commissioned by London Sinfonietta, &ldquo;Ladies in Bloomers&rdquo; is a 45-minute outdoors &ldquo;Hortimusical Drama&rdquo; for mixed chamber ensemble, 4 singers, and on-stage community gardeners after Fiona Davison&rsquo;s book &ldquo;An Almost Impossible Thing&rdquo;, following the radical lives of pioneering women gardeners in early 20th century Britain.
            </p>
            <a 
              href="https://londonsinfonietta.org.uk/whats-on/ladies-bloomers" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm underline hover:no-underline"
            >
              Tickets!
            </a>
          </div>
          
          {/* Divider */}
          <div className="border-t border-black mb-8"></div>
          
          {/* Videos */}
          <div className="space-y-6">
            {/* KISHTATOS - RECORDING */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">KISHTATOS - RECORDING</h2>
              <p className="text-sm mb-1 italic">
                BBC Singers dir. Owain Park
              </p>
              <iframe
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/uqwlIsPtlgg?si=NRl_iXO3Jl_E5bef&amp;controls=0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <p className="text-sm mt-1">
                <strong>Kishtatos</strong> (2022)
              </p>
            </div>
            
            {/* Divider */}
            <div className="border-t border-black"></div>
            
            {/* ANAFIM - RECORDING */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">ANAFIM - RECORDING</h2>
              <p className="text-sm mb-1 italic">
                Aestus Quartet
              </p>
              <iframe
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/iTpkxkqp_zc?si=Xs_JjEcITAuP_Djc&amp;controls=0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <p className="text-sm mt-1">
                <strong>Anafim</strong> (2024)
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right fixed section */}
      <div className="hidden md:block w-1/3">
        <Image
          src="/profile.jpeg"
          width={490}
          height={1175}
          className="h-full w-full object-cover"
          alt="Omri Kochavi Profile Picture"
        />
      </div>
    </div>
  );
}
