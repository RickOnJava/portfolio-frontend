import GradientText from "./ui/GradientText";
import PixelCard from "./ui/PixelCard";

const Approach = () => {
  return (
    <div
      className="px-4 sm:px-6 md:px-10 lg:px-20 py-16 min-h-screen w-lvw bg-black-100"
      id="testimonials"
    >
      <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-8 md:mb-10 text-white">
        My <span className="text-myPurple-100">Approach</span>
      </h1>
      
      <div className="h-full py-4 md:py-8 flex flex-col lg:flex-row items-center justify-center lg:justify-evenly gap-6 lg:gap-4">
        {/* Card 1 - Planning & Strategy */}
        <div className="w-full max-w-sm lg:max-w-none lg:w-[30%] h-[400px] sm:h-[450px] lg:h-full">
          <PixelCard variant="pink" className="text-white h-full">
            <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-6 gap-3 sm:gap-4">
              <h1 className="text-xl sm:text-2xl lg:text-[30px] font-[700] text-center">
                <GradientText
                  colors={[
                    "#40ffaa",
                    "#4079ff",
                    "#40ffaa",
                    "#4079ff",
                    "#40ffaa"
                  ]}
                  animationSpeed={3}
                  showBorder={false}
                  className="text-lg sm:text-xl lg:text-2xl"
                >
                  Planning & Strategy
                </GradientText>
              </h1>
              <p className="text-sm sm:text-base lg:text-[16px] font-[400] text-center leading-relaxed lg:leading-[2rem]">
                We&apos;ll collaborate to map out your website&apos;s goals,
                target audience, and key functionalities. We&apos;ll discuss
                things like site structure, navigation, and content
                requirements.
              </p>
            </div>
          </PixelCard>
        </div>

        {/* Card 2 - Development & Progress Update */}
        <div className="w-full max-w-sm lg:max-w-none lg:w-[30%] h-[400px] sm:h-[450px] lg:h-full">
          <PixelCard variant="default" className="text-white h-full">
            <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-6 gap-3 sm:gap-4">
              <h1 className="text-xl sm:text-2xl lg:text-[30px] font-[700] text-center">
                <GradientText
                  colors={[
                    "#40ffaa",
                    "#4079ff",
                    "#40ffaa",
                    "#4079ff",
                    "#40ffaa"
                  ]}
                  animationSpeed={3}
                  showBorder={false}
                  className="text-lg sm:text-xl lg:text-2xl"
                >
                  Development & Progress Update
                </GradientText>
              </h1>
              <p className="text-sm sm:text-base lg:text-[16px] font-[400] text-center leading-relaxed lg:leading-[2rem]">
                Once we agree on the plan, I cue my lofi playlist and dive into
                coding. From initial sketches to polished code, I keep you
                updated every step of the way.
              </p>
            </div>
          </PixelCard>
        </div>

        {/* Card 3 - Development & Launch */}
        <div className="w-full max-w-sm lg:max-w-none lg:w-[30%] h-[400px] sm:h-[450px] lg:h-full">
          <PixelCard variant="blue" className="text-white h-full">
            <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-6 gap-3 sm:gap-4">
              <h1 className="text-xl sm:text-2xl lg:text-[30px] font-[700] text-center">
                <GradientText
                  colors={[
                    "#40ffaa",
                    "#4079ff",
                    "#40ffaa",
                    "#4079ff",
                    "#40ffaa"
                  ]}
                  animationSpeed={3}
                  showBorder={false}
                  className="text-lg sm:text-xl lg:text-2xl"
                >
                  Development & Launch
                </GradientText>
              </h1>
              <p className="text-sm sm:text-base lg:text-[16px] font-[400] text-center leading-relaxed lg:leading-[2rem]">
                This is where the magic happens! Based on the approved design,
                I&apos;ll translate everything into functional code, building
                your website from the ground up.
              </p>
            </div>
          </PixelCard>
        </div>
      </div>
    </div>
  );
};

export default Approach;