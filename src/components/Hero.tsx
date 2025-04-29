import Image from "next/image";

const Hero = () => {
  return (
    <section className="container mx-auto my-4 p-4">
      <div className="relative h-[250px] md:h-[500px] w-full">
        <Image
          src="/hero-image.jpg"
          alt="Hero Image"
          fill
          className="object-cover rounded-lg"
        />

        <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Grow with Confidence
          </h1>
          <p className="text-sm md:text-lg mb-8 text-white">
            Expert care guides, growing tips, and pest solutions for every plant
            in your garden.
          </p>
          {/* <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Shop Now
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
