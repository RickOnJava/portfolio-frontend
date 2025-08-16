import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "../../data/index.js";
import { AnimatedTooltip } from "./ui/AnimatedToolTip";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer
      className="w-lvw bg-black-100 px-4 sm:px-6 md:px-10 lg:px-20 py-12 md:py-16"
      id="contact"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Main heading and description */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center max-w-4xl mx-auto text-white leading-tight">
            Ready to take <span className="text-myPurple-100">your</span> digital
            presence to the next level
          </h1>
          <p className="text-white-200 mt-4 md:mt-6 lg:mt-10 text-sm sm:text-base text-center max-w-2xl mx-auto px-4">
            Reach out to me today and let&apos;s discuss how I can help you
            achieve your goals.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-12 md:mb-16 w-full max-w-2xl">
          <div className="w-full sm:w-auto">
            <a href="mailto:rickghosh824@gmail.com" className="block">
              <MagicButton
                title="Let's get in touch"
                icon={<FaLocationArrow />}
                position="right"
                otherClasses="w-full sm:w-auto"
              />
            </a>
          </div>
          <div className="w-full sm:w-auto">
            <MagicButton
              title="Go To Dynamic Review"
              handleClick={() => navigate("/portfolio/review")}
              otherClasses="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>

      {/* Footer bottom section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 pt-8 md:pt-12 border-t border-black-300/20">
        <p className="text-xs sm:text-sm md:text-base font-light md:font-normal text-white text-center md:text-left">
          Copyright © 2025 Rick
        </p>

        <div className="flex items-center gap-4 md:gap-6">
          <AnimatedTooltip items={socialMedia} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;