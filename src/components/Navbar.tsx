import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-slate-200 p-4">
      <div className=" container mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-green-600 font-bold text-2xl md:text-3xl">
            GreenThumb
          </h1>
          <div className="flex gap-5 text-lg">
            <Link href="/vegetables">Vegetables</Link>
            <Link href="/my-garden">My Garden</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
