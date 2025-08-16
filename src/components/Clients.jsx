import { InfiniteMovingCards } from "./ui/InfiniteMovingCards";
import { companies, testimonials } from "../../data/index.js";

const Clients = () => {
  return (
    <div className="py-20 bg-black-100 h-lvh" id="testimonials">
      <h1 className="font-bold text-4xl md:text-5xl text-center mb-10 text-white">
        Kind words from <span className="text-myPurple-100">satisfied clients</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10 ">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />

        <div className="flex flex-wrap items-center justify-center gap-4 md:mt-5 md:gap-16 max-lg:mt-10">
            {companies.map(({ id, img, name, nameImg }) => (
                <div key={id} className=" flex md:max-w-60 max-w-32 gap-2 ">
                    <img src={img} alt={name} className="md:w-10 w-5" />
                    <img src={nameImg} alt={name} className="md:w-24 w-20" />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
