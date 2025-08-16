import "./Grid.css";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import { Cover } from "./ui/cover";
import WorldMap from "./ui/world-map";
import { useState } from "react";
import { BackgroundGradientAnimation } from "./ui/BgGradient";
import Game from "./Tic_Tac_toe game/Game";
import HandCricket from "./hand_cricket/HandCricket";
import { ConfettiButton } from "./magicui/confetti";
import FallingText from "./ui/FallingText";

const Grid = () => {
  const [copied, setCopied] = useState(false);

  // Email copy
  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText("rickghosh824@gmail.com");

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className=" pt-8  w-[100vw] hidden md:block" id="about">
      <div className=" h-[60%]  flex justify-evenly ">
        <div className="section-one rounded-xl w-[50%] flex items-end">
          {/* <h2>
            I prioritize client <br /> collaboration, fostering <br /> open
            communication
          </h2> */}
          <FallingText
            text={`I thrive in collaborative environments, where open communication fosters innovation and shared success.`}
            highlightWords={[
              "thrive",
              "collaborative",
              "communication",
              "innovation",
              "collaboration",
              "success",
            ]}
            highlightClass="highlighted"
            trigger="hover"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.56}
            fontSize="2rem"
            mouseConstraintStiffness={0.9}
          />
        </div>

        <div className="flex w-[40%] flex-col gap-4">
          <div className="map-grid relative overflow-hidden rounded-lg  h-[60%]">
            <h1>
              I&apos;m very flexible with time zone
              <span className="text-myPurple-100"> communications</span>
            </h1>
            {/* <Globe className={`w-[80%]`} /> */}
            <WorldMap
              dots={[
                {
                  start: {
                    lat: 64.2008,
                    lng: -149.4937,
                  }, // Alaska (Fairbanks)
                  end: {
                    lat: 34.0522,
                    lng: -118.2437,
                  }, // Los Angeles
                },
                {
                  start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                  end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                },
                {
                  start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                  end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
                },
                {
                  start: { lat: 51.5074, lng: -0.1278 }, // London
                  end: { lat: 28.6139, lng: 77.209 }, // New Delhi
                },
                {
                  start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                  end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
                },
                {
                  start: { lat: 22.5744, lng: 88.3629 }, // Kolkata
                  end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
                },
              ]}
            />
          </div>

          {/* Third Grid ---------------------------------------------------------------*/}
          <div className=" third-grid relative rounded-lg  h-[40%] ">
            <div className=" third-grid-1 flex  h-[100%] w-[100%] justify-center">
              <div className=" w-[40%]  flex flex-col justify-center items-center">
                <p className=" text-[#C1C2D3] text-[14px] font-[400]  ">
                  I constantly try to improve
                </p>
                <h1 className="text-[32px] font-[700] text-white">
                  My tech stack
                </h1>
              </div>
              <div className="skill-stack w-[40%]  flex gap-4">
                <div className=" w-[50%] h-full  flex flex-col justify-evenly">
                  <div className="skill-box">React Js</div>
                  <div className="skill-box">Javascript</div>
                  <div className="skill-box">Java</div>
                </div>
                <div className="  w-[50%] h-full  flex flex-col justify-evenly">
                  <div className="skill-box">Figma</div>
                  <div className="skill-box">Tailwindcss</div>
                  <div className="skill-box">Express Js</div>
                </div>
              </div>
            </div>

            <BackgroundBeamsWithCollision className={` third-grid-2`} />
          </div>
        </div>
      </div>

      {/* The second part */}
      <div className=" mt-6  flex justify-evenly ">
        <div className="flex w-[40%] flex-col gap-4">
          <div className="rocket-text-grid relative rounded-lg ">
            <h1 className="text-4xl md:text-2xl lg:text-4xl font-semibold  text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
              Build amazing websites <br /> at <Cover>warp speed</Cover>
            </h1>
          </div>

          {/* Third Grid ---------------------------------------------------------------*/}
          <div className=" rounded-xl email-grid  h-[30vh] overflow-hidden ">
            <BackgroundGradientAnimation>
              <div className="mt-10 relative z-50 w-full h-full flex flex-col items-center justify-center">
                <h1 className=" text-white text-3xl font-[700]">
                  Do you want to start a project together?
                </h1>
                {/* <MagicButton
                  title={copied ? "Email copied" : "Copy my email"}
                  icon={<IoCopyOutline />}
                  position="left"
                  otherClasses="!bg-[#161a31] cursor-ponter"
                  handleClick={handleCopy}
                /> */}
                <ConfettiButton copied={copied} setCopied={setCopied} />
              </div>
            </BackgroundGradientAnimation>
          </div>
        </div>

        {/* Game grid */}
        <div className="section-game rounded-xl w-[50%] flex ">
          <Game />
          <HandCricket />
        </div>
      </div>
    </section>
  );
};

export default Grid;
