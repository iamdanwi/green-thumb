/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { GiSeedling, GiPlantSeed } from "react-icons/gi";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import { useParams } from "next/navigation";

interface Pest {
  name: string;
  description: string;
  symptoms: string;
  treatment: string;
  photo: string;
}

interface Vegetables {
  VegetableId: number;
  VegetableCode: string;
  CatalogId: number;
  Name: string;
  Description: string;
  ThumbnailImage: string;
  SeedDepth: string;
  GerminationSoilTemp: string;
  DaysToGermination: number;
  SowIndoors: string;
  SowOutdoors: string;
  PhRange: string;
  GrowingSoilTemp: string;
  SpacingBeds: string;
  Watering: string;
  Light: string;
  GoodCompanions: string;
  BadCompanions: string;
  SowingDescription: string;
  GrowingDescription: string;
  HarvestDescription: string;
  Active: boolean | null;
  Season: string;
  DaysToHarvestSeeds: number;
  DaysToHarvestSeedlings: number;
  HealthBenefits: string;
  Pests: Pest[];
}

const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-green-50 p-3 rounded text-sm shadow">
    <span className="font-semibold">{label}:</span> {value}
  </div>
);

const VegetablePage = () => {
  const { id } = useParams<{ id: string }>();
  const [vegetable, setVegetable] = useState<Vegetables | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVegetable = async () => {
      try {
        const res = await fetch(`/api/vegetables/getVegetabelById?id=${id}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const veg: Vegetables = await res.json();
        setVegetable(veg);
      } catch (err) {
        setVegetable(null);
        toast.error("Vegetable not found");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchVegetable();
  }, [id]);

  const handleAddPlant = (type: "seed" | "seedling") => {
    if (!vegetable) return;

    const garden = JSON.parse(localStorage.getItem("myGarden") || "[]");

    const plantedDate = new Date();
    const harvestDays =
      type === "seed"
        ? vegetable.DaysToHarvestSeeds
        : vegetable.DaysToHarvestSeedlings;

    const harvestDate = new Date(
      plantedDate.getTime() + harvestDays * 24 * 60 * 60 * 1000,
    );

    const newPlant = {
      id: Date.now(),
      name: vegetable.Name,
      image: vegetable.ThumbnailImage,
      plantedDate,
      harvestDate,
      type,
    };

    garden.push(newPlant);
    localStorage.setItem("myGarden", JSON.stringify(garden));
    toast.success(`${vegetable.Name} added to your garden as a ${type}`);
  };

  if (loading)
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  if (!vegetable)
    return <div className="p-6 text-red-600">Vegetable not found</div>;

  return (
    <section className="my-6 px-4 space-y-6 max-w-4xl mx-auto text-green-900">
      {/* Image */}
      <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
        <Image
          src={vegetable.ThumbnailImage}
          alt={vegetable.Name}
          height={400}
          width={400}
          className="object-cover md:object-contain"
        />
      </div>

      {/* Title & Add Buttons */}
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-green-800">
            {vegetable.Name}
          </h1>

          {/* Mobile Drawer */}
          <div className="block md:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">
                  <IoMdAdd />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Choose an Option</DrawerTitle>
                </DrawerHeader>
                <DrawerClose>
                  <div className="p-4 flex justify-evenly text-green-700">
                    <Button
                      onClick={() => handleAddPlant("seed")}
                      variant="outline"
                      className="flex flex-col gap-2 h-24 w-32 py-3 items-center justify-center"
                    >
                      <GiPlantSeed className="text-2xl" />
                      <span>Seed</span>
                    </Button>
                    <Button
                      onClick={() => handleAddPlant("seedling")}
                      variant="outline"
                      className="flex flex-col gap-2 h-24 w-32 py-3 items-center justify-center"
                    >
                      <GiSeedling className="text-2xl" />
                      <span>Seedling</span>
                    </Button>
                  </div>
                </DrawerClose>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Desktop Dialog */}
          <div className="hidden md:block">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <IoMdAdd />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Choose an Option</DialogTitle>
                </DialogHeader>
                <DialogClose>
                  <div className="p-4 flex justify-evenly text-green-700">
                    <Button
                      onClick={() => handleAddPlant("seed")}
                      variant="outline"
                      className="flex flex-col gap-2 h-24 w-32 py-3 items-center justify-center"
                    >
                      <GiPlantSeed className="text-2xl" />
                      <span>Seed</span>
                    </Button>
                    <Button
                      onClick={() => handleAddPlant("seedling")}
                      variant="outline"
                      className="flex flex-col gap-2 h-24 w-32 py-3 items-center justify-center"
                    >
                      <GiSeedling className="text-2xl" />
                      <span>Seedling</span>
                    </Button>
                  </div>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <p className="mt-2 text-gray-700">{vegetable.Description}</p>
      </div>

      {/* Info Grid */}
      <Separator className="my-4" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Info label="🌱 Seed Depth" value={vegetable.SeedDepth} />
        <Info
          label="🌡️ Germination Temp"
          value={vegetable.GerminationSoilTemp}
        />
        <Info
          label="⏱️ Days to Germinate"
          value={`${vegetable.DaysToGermination} days`}
        />
        <Info label="🏠 Sow Indoors" value={vegetable.SowIndoors} />
        <Info label="🌤️ Sow Outdoors" value={vegetable.SowOutdoors} />
        <Info label="🧪 pH Range" value={vegetable.PhRange} />
        <Info label="🌡️ Growing Soil Temp" value={vegetable.GrowingSoilTemp} />
        <Info label="📏 Bed Spacing" value={vegetable.SpacingBeds} />
        <Info label="💧 Watering" value={vegetable.Watering} />
        <Info label="☀️ Light" value={vegetable.Light} />
        <Info label="🤝 Good Companions" value={vegetable.GoodCompanions} />
        <Info label="🚫 Bad Companions" value={vegetable.BadCompanions} />
        <Info
          label="🌾 Harvest (Seeds)"
          value={`${vegetable.DaysToHarvestSeeds} days`}
        />
        <Info
          label="🌿 Harvest (Seedlings)"
          value={`${vegetable.DaysToHarvestSeedlings} days`}
        />
        <Info label="🗓️ Season" value={vegetable.Season} />
      </div>

      {/* Descriptions */}
      <Separator className="my-4" />
      <div>
        <h2 className="text-xl font-semibold text-green-700">
          Growing Instructions
        </h2>
        <p>{vegetable.GrowingDescription}</p>
      </div>

      <Separator className="my-4" />
      <div>
        <h2 className="text-xl font-semibold text-green-700">Harvest</h2>
        <p>{vegetable.HarvestDescription}</p>
      </div>

      <Separator className="my-4" />
      <div>
        <h2 className="text-xl font-semibold text-green-700">
          Health Benefits
        </h2>
        <p>{vegetable.HealthBenefits}</p>
      </div>

      {/* Pests */}
      <Separator className="my-4" />
      <div>
        <h2 className="text-xl font-semibold text-red-700 mb-4">
          Common Pests
        </h2>
        <div className="space-y-6">
          {vegetable.Pests.map((pest, idx) => (
            <div key={idx}>
              <div className="flex flex-col md:flex-row items-start gap-6 p-4">
                <div className="relative w-full md:w-60 h-40 rounded overflow-hidden">
                  <Image
                    src={pest.photo}
                    alt={pest.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-bold text-red-600">
                    {idx + 1}. {pest.name}
                  </h3>
                  <p>
                    <span className="font-semibold">Description:</span>{" "}
                    {pest.description}
                  </p>
                  <Separator className="my-4" />
                  <p>
                    <span className="font-semibold">Symptoms:</span>{" "}
                    {pest.symptoms}
                  </p>
                  <Separator className="my-4" />
                  <p>
                    <span className="font-semibold">Treatment:</span>{" "}
                    {pest.treatment}
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VegetablePage;
