import { cn } from "@/lib/utils";
import { Spotlight } from "./ui/Spotlight";
// import { Particles } from "./ui/particles";
// import Spline from "@splinetool/react-spline";
import { GridPattern } from "./ui/grid-pattern";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./ui/MagicButton";
import { useSelector } from "react-redux";
import { GradualSpacing } from "./ui/gradual-spacing";
import SkillsSection from "./skill-section/skill_section";

const Hero = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className=" hero-section bg-black-100">
      <div className="particle">
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="pink"
        />
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vw] "
          fill="purple"
        />
        <Spotlight className=" top-28 left-80 h-[80vh] w-[50vw] " fill="blue" />
      </div>

      <div className="particle">
        {/* <Particles quantity={200}  size={1} color="black" vx={0.5} vy={0.5} /> */}
        <GridPattern
          width={50}
          height={50}
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
          )}
        />
      </div>
      <div className=" main-container flex items-center justify-between w-screen h-screen">
        {/* <div className=" max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center"> */}
        <div className=" w-[70%] mx-auto flex flex-col items-center justify-center">
          <h2 className="uppercase tracking-widest text-sm text-center text-purple-500 max-w-80 ">
            Dynamic Web Magic with React Js .
          </h2>

          <TextGenerateEffect
            className=" text-center text-[40px] md:text-5xl lg:text-6xl"
            words="Transforming Concepts into Seamless User Experiences"
          />

          <p className="text-center text-white-200 md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Hi👋,{" "}
            <span className="name font-medium text-purple-600 ">
              {user?.fullname}
            </span>{" "}
            I&apos;m Rick, a{" "}
            <GradualSpacing
              className="font-display text-center text-3xl font-bold -tracking-widest  text-white-100 md:text-4xl md:leading-[5rem]"
              text="Fullstack Developer"
            />{" "}
            based in West-Bengal
          </p>

          <a href="#about">
            <MagicButton
              title="Show my work"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>

        <div className=" w-[40%] hidden lg:block">
          <SkillsSection />
        </div>
      </div>
    </div>
  );
};

export default Hero;
