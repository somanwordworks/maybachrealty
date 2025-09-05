// components/VerticalIcons.js
import Image from "next/image";

export default function VerticalIcons({ speed = 12 }) {
  const icons = [
    { src: "/icons/pic1.png" },
    { src: "/icons/pic2.png" },
    { src: "/icons/pic3.png" },
  ];

  return (
    <div className="h-full overflow-hidden relative w-16">
      <div
        className="animate-scroll-y flex flex-col items-center space-y-6"
        style={{ animationDuration: `${speed}s` }}
      >
        {icons.map((i, idx) => (
          <div key={idx}>
            <Image
              src={i.src}
              alt="icon"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </div>
        ))}

        {/* duplicate for seamless loop */}
        {icons.map((i, idx) => (
          <div key={`dup-${idx}`}>
            <Image
              src={i.src}
              alt="icon"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll-y {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-scroll-y {
          animation-name: scroll-y;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}
