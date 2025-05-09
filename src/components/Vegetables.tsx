"use client";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { FaAngleRight } from "react-icons/fa6";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import Spinner from "@/components/Spinner"; // Import Spinner component

interface Vegetables {
  VegetableId: number;
  VegetableCode: string;
  CatalogId: number;
  Name: string;
  Description: string;
  ThumbnailImage: string;
}

const Vegetables = () => {
  const [vegetables, setVegetables] = useState<Vegetables[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchVegetables = async () => {
    try {
      const response = await axios.get("api/vegetables/get_all_vegetables");
      if (response.data.length > 0) {
        setVegetables(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading to false after the data is fetched
    }
  };

  useEffect(() => {
    fetchVegetables();
  }, []);

  const filteredVegetables = vegetables.filter((vegetable) =>
    vegetable.Name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section className="container mx-auto my-4 p-4">
      <div className="flex justify-between md:items-center flex-col md:flex-row">
        <h1 className="text-green-700 font-bold text-2xl md:text-3xl">
          Vegetables
        </h1>
        <div className="md:w-1/3 my-4 relative">
          <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
          <Input
            className="outline-0 pl-10"
            placeholder="Search vegetables"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Show spinner if loading */}
      {isLoading ? (
        <div className="flex justify-center items-center my-8">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredVegetables.map((vegetable, index) => (
            <Link
              href={`/vegetables/${vegetable.VegetableId}`}
              key={index}
              className="flex items-center gap-4"
            >
              <Image
                src={vegetable.ThumbnailImage}
                alt={vegetable.Name}
                width={100}
                height={100}
                className="rounded-3xl"
              />
              <div className="flex-1">
                <h2 className="text-green-700 font-bold text-lg">
                  {vegetable.Name}
                </h2>
                <div className="flex items-center">
                  <p className="text-gray-600 hidden md:block">
                    {vegetable.Description.slice(0, 100)}...
                  </p>
                  <p className="text-gray-600 block md:hidden">
                    {vegetable.Description.slice(0, 50)}...
                  </p>
                  <FaAngleRight className="text-2xl text-green-700" />
                </div>
                <Separator className="my-4" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Vegetables;
