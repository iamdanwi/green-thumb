"use client";

import React, { useEffect, useState } from "react";
import { GiSeedling, GiPlantSeed } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/Spinner";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Image from "next/image";

interface GardenPlant {
  id: number;
  name: string;
  image: string;
  plantedDate: string;
  harvestDate: string;
  type: "seed" | "seedling";
}

const calculateProgress = (
  plantedDate: string,
  harvestDate: string,
): { percentage: number; daysLeft: number } => {
  const now = new Date();
  const planted = new Date(plantedDate);
  const harvest = new Date(harvestDate);
  const totalDays =
    (harvest.getTime() - planted.getTime()) / (1000 * 60 * 60 * 24);
  const remainingDays =
    (harvest.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

  const percentage = Math.max(0, 100 - (remainingDays / totalDays) * 100);
  return {
    percentage,
    daysLeft: Math.ceil(remainingDays),
  };
};

const MyGardenPage = () => {
  const [plants, setPlants] = useState<GardenPlant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = localStorage.getItem("myGarden");
      if (stored) {
        setPlants(JSON.parse(stored));
      }
      setLoading(false);
    }, 100); // simulate loading delay

    return () => clearTimeout(timer);
  }, []);

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = (id: number) => {
    const updatedPlants = plants.filter((plant) => plant.id !== id);
    setPlants(updatedPlants);
    localStorage.setItem("myGarden", JSON.stringify(updatedPlants)); // Update localStorage
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Garden</h1>
        <div className="relative w-64">
          <BsSearch className="absolute top-2.5 left-3 text-gray-400" />
          <Input
            placeholder="Search plants"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* No Plants */}
      {filteredPlants.length === 0 ? (
        <p className="text-center text-gray-500">
          {searchQuery
            ? "No matching plants found."
            : "Your garden is empty. Add plants from the catalog!"}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPlants.map((plant) => {
            const { percentage, daysLeft } = calculateProgress(
              plant.plantedDate,
              plant.harvestDate,
            );

            return (
              <div
                key={plant.id}
                className="flex items-center gap-4 border p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                {/* Plant Image */}
                <Image
                  src={plant.image}
                  alt={plant.name}
                  className="w-16 h-16 rounded-full object-cover"
                  height={64}
                  width={64}
                  layout="fixed"
                  priority
                  placeholder="blur"
                  blurDataURL={plant.image}
                />

                {/* Plant Info */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{plant.name}</h2>
                  <p className="text-gray-500 flex items-center gap-1">
                    {plant.type === "seed" ? (
                      <>
                        <GiPlantSeed className="text-green-700" /> From Seed
                      </>
                    ) : (
                      <>
                        <GiSeedling className="text-green-700" /> From Seedling
                      </>
                    )}
                  </p>
                </div>

                {/* Circular Progress */}
                <div className="w-14 h-14">
                  <CircularProgressbar
                    value={percentage}
                    text={
                      daysLeft <= 0
                        ? "Ready"
                        : daysLeft === 1
                          ? "1d"
                          : `${daysLeft}d`
                    }
                    styles={buildStyles({
                      textSize: "28px",
                      pathColor: "#15803d", // dark green (progress)
                      textColor: "#166534", // optional: text in dark green
                      trailColor: "#bbf7d0", // light green (background/trail)
                    })}
                  />
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(plant.id)}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyGardenPage;
