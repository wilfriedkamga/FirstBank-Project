import  {useState } from "react";
import { Link } from "react-router-dom";

interface Slide {
  title: string;
  url: string;
  name: string;
  participants: number;
  contribution_due_date: string;
}

const slides: Slide[] = [
  {
    title: "Slide 1",
    url: "#",
    name: "title",
    participants: 0,
    contribution_due_date: " ",
  },
];

const Carousel = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [tontine, setTontine] = useState<Slide[]>(slides);
  const owner = "+237695964361";

  const goToSlide = (n: number) => {
    setSlideIndex(n);
  };
  const prevSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };
  const nextSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="relative">
      {/* Carousel wrapper */}
      <div className="overflow-hidden">
        {/* Inner wrapper */}
        <div
          className={`flex transition-transform duration-500 ease-in-out ${
            slideIndex === 0 ? "transform translate-x-0" : ""
          }`}
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        >
          {tontine.map((slide, index) => (
            <div className="w-full grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-4  gap-2 2xl:gap-10">
              <div
                key={index}
                className="w-full gap-4 flex flex-shrink-0 rounded-xl md:w-4/6 shadow-md bg-[#BB0A01]"
                style={{ width: "100%", height: "17rem" }}
              >
              </div>
              <div
                key={index}
                className="w-full flex flex-shrink-0 rounded-xl md:w-4/6 shadow-md bg-[#BB0A01]"
                style={{ width: "100%", height: "17rem" }}
              >
                <Link to={slide.url} className="w-full rounded-xl">le number 2</Link>
              </div>
              <div
                key={index}
                className="w-full flex flex-shrink-0 rounded-xl md:w-4/6 shadow-md bg-[#BB0A01]"
                style={{ width: "100%", height: "17rem" }}
              >
                <Link to={slide.url} className="w-full rounded-xl">le number 2</Link>
              </div>
              <div
                key={index}
                className="w-full flex flex-shrink-0 rounded-xl md:w-4/6 shadow-md bg-[#BB0A01]"
                style={{ width: "100%", height: "17rem" }}
              >
                <Link to={slide.url} className="w-full rounded-xl">le number 2</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Previous button */}
      <button
        className="absolute top-1/3 left-0 z-10 p-4 text-white ml-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
        onClick={prevSlide}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Next button */}
      <button
        className="absolute top-1/3 right-0 z-10 p-4 text-white mr-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
        onClick={nextSlide}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Slide indicators */}
      <div className="absolute -bottom-5 left-0 z-10 w-full flex justify-center">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`mx-1 p-1 rounded-full ${
              slideIndex === index ? "bg-black" : "bg-gray-500"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
