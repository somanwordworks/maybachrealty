import Image from "next/image";

export default function HorizontalIcons({ speed = 20 }) {
    const icons = [
        { src: "/icons/pic1.png" },
        { src: "/icons/pic2.png" },
        { src: "/icons/pic3.png" },
        { src: "/icons/pic4.png" },
        { src: "/icons/pic5.png" },
        { src: "/icons/pic6.png" },
        { src: "/icons/pic7.png" },
    ];

    // repeat icons more to fill width
    const repeatedIcons = [...icons, ...icons, ...icons, ...icons];

    return (
        <div className="w-full overflow-hidden relative bg-white">
            <div
                className="flex animate-scroll-x space-x-17"   // ⬅ more spacing
                style={{ animationDuration: `${speed}s` }}
            >
                {repeatedIcons.map((i, idx) => (
                    <div key={idx} className="flex-shrink-0 p-4">
                        <Image
                            src={i.src}
                            alt="icon"
                            width={70}
                            height={70}
                            className="w-16 h-16 object-contain"
                        />
                    </div>
                ))}
            </div>

            <style jsx>{`
        @keyframes scroll-x {
          0% {
            transform: translateX(100%);   /* start off-screen right */
          }
          100% {
            transform: translateX(-100%);  /* exit off-screen left */
          }
        }
        .animate-scroll-x {
          width: max-content; /* auto expand for icons */
          animation-name: scroll-x;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
        </div>
    );
}
