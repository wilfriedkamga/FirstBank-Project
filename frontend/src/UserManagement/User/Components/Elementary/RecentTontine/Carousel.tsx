import React from "react";

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
    url: "/tontine/app/tontine#461",
    name: "Femmes Solidaires",
    participants: 12,
    contribution_due_date: "Sun 28/04",
  },
  {
    title: "Slide 2",
    url: "/tontine/app/tontine#502",
    name: "Entre-Nous Jeunes de LBB",
    participants: 25,
    contribution_due_date: "Sat 04/05",
  },
  {
    title: "Slide 3",
    url: "/tontine/app/tontine#012",
    name: "Anciens du Tetra-BS",
    participants: 30,
    contribution_due_date: "Thu 02/05",
  },
  {
    title: "Slide 4",
    url: "/tontine/app/tontine#045",
    name: "La Petite Chorale",
    participants: 10,
    contribution_due_date: "Wed 08/05",
  },
];

const Carousel = () => {
  const [slideIndex, setSlideIndex] = React.useState(0);

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
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full flex flex-shrink-0 rounded-xl md:w-4/6 shadow-md bg-[#BB0A01]"
              style={{ width: "100%", height: "18rem" }}
            >
              <a href={slide.url} className="w-full rounded-xl">
                <div className="flex flex-col p-5 space-y-2.5">
                  <p className="font-account font-bold text-2xl text-white">
                    {slide.name}
                  </p>
                  <div className="flex flex-row items-center">
                    <div className="flex flex-col border-r mt-12 p-2.5 items-center">
                      <p className="font-title font-light text-white text-sm">
                        Participans
                      </p>
                      <p className="text-4xl text-white mt-5">
                        {slide.participants}
                      </p>
                    </div>
                    <div className="flex flex-col border-r mt-12 p-2.5 items-center">
                      <p className="font-title font-light text-white text-sm text-nowrap">
                        Due date for the next Contribution
                      </p>
                      <p className="text-3xl text-white mt-6">
                        {slide.contribution_due_date}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Previous button */}
      <button
        className="absolute top-1/3 left-0 z-10 p-4 text-white bg-black bg-opacity-50 rounded-r-lg hover:bg-opacity-75"
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
        className="absolute top-1/3 right-0 z-10 p-4 text-white bg-black bg-opacity-50 rounded-l-lg hover:bg-opacity-75"
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
      <div className="absolute bottom-0 left-0 z-10 w-full flex justify-center">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`mx-1 p-1 rounded-full ${
              slideIndex === index ? "bg-white" : "bg-gray-500"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
