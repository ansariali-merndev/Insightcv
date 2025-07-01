import { SummaryWork } from "../lib/utils";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiWechatPayFill } from "react-icons/ri";
import { GrDocumentVerified } from "react-icons/gr";
import banner from "../assets/banner.webp";

const iconMap = {
  IoDocumentTextOutline: IoDocumentTextOutline,
  RiWechatPayFill: RiWechatPayFill,
  GrDocumentVerified: GrDocumentVerified,
};

export const WorkSection = () => {
  return (
    <section>
      <img src={banner} alt="banner" className="w-full my-12" />

      <h2 className="text-gray-400 font-bold text-xl md:text-2xl text-center">
        How it works
      </h2>
      <p className="text-center font-bold text-xl md:text-2xl">
        Transform your CV into smart, easy-to-read insights in just three simple
        steps.
      </p>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        {SummaryWork.map((item, index) => {
          const IconComponent = iconMap[item.icon];
          return (
            <li
              key={index}
              className="text-center border py-4 px-3 border-gray-300 hover:border-gray-800"
            >
              <IconComponent className="text-8xl mx-auto mb-6" />
              <h2 className="text-2xl text-gray-600 font-semibold">
                {item.title}
              </h2>
              <p className="text-sm">{item.para}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
