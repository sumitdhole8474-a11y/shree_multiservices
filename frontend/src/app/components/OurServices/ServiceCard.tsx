import Link from "next/link";

type ServiceCardProps = {
  title: string;
  image: string;
  slug: string;
};

export default function ServiceCard({ title, image, slug }: ServiceCardProps) {
  const isTitleLong = title.length > 20;

  // 🔥 BASE64 SAFE HANDLING
  const formattedImage =
    image?.startsWith("data:image/")
      ? image
      : `data:image/jpeg;base64,${image}`;

  return (
    <Link href={`/services-pages/${slug}`} className="block group w-full">
      <div className="relative isolate  w-full  aspect-[4/5] sm:h-[265px]  cursor-pointer   rounded-2xl  border  border-gray-200 bg-white  shadow-lg  overflow-hidden transition-all  duration-300 
        group-hover:-translate-y-2
        group-hover:border-blue-100
        before:absolute 
        before:inset-0 
        before:bg-gradient-to-br 
        before:from-transparent 
        before:via-transparent 
        before:to-blue-50/30 
        before:opacity-0 
        before:transition-opacity 
        before:duration-500 
        group-hover:before:opacity-100
        flex flex-col
      ">
        {/* Image Container */}
        <div className="relative flex-1 w-full overflow-hidden">
          <img
            src={formattedImage}  
            alt={title}
            className="
              h-full 
              w-full 
              object-cover 
              transition-transform 
              duration-700 
              group-hover:scale-110
              group-hover:brightness-110
            "
          />

          <div className="
            absolute 
            inset-0 
            bg-blue-500/10 
            opacity-0 
            group-hover:opacity-100 
            transition-opacity 
            duration-300
          " />

          <div className="
            absolute 
            -inset-full 
            top-0 
            z-10 
            block 
            h-full 
            w-1/3 
            -skew-x-12 
            bg-gradient-to-r 
            from-transparent 
            via-white/20 
            to-transparent 
            transition-all 
            duration-1000 
            group-hover:left-full
          " />
        </div>

        {/* Content Area */}
        <div className="relative h-[34px] sm:h-[42px] flex items-center justify-center bg-white">
          <div className="w-full text-center">
            <h4 className="
              text-[11px] 
              xs:text-[13px]
              sm:text-base 
              font-bold 
              text-gray-800 
              transition-colors 
              duration-300 
              group-hover:text-blue-600
              px-2
              truncate
              leading-none
            ">
              {isTitleLong ? `${title.substring(0, 18)}...` : title}
            </h4>
          </div>
        </div>

        <div className="
          absolute 
          top-0 
          left-0 
          w-6 
          h-6 
          border-t-2 
          border-l-2 
          border-blue-500/30 
          rounded-tl-2xl 
          opacity-0 
          group-hover:opacity-100 
          transition-opacity 
          duration-500
        " />

        <div className="
          absolute 
          bottom-0 
          right-0 
          w-6 
          h-6 
          border-b-2 
          border-r-2 
          border-blue-500/30 
          rounded-br-2xl 
          opacity-0 
          group-hover:opacity-100 
          transition-opacity 
          duration-500
        " />
      </div>
    </Link>
  );
}
