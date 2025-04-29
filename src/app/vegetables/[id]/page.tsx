import { Separator } from "@/components/ui/separator";
import Image from "next/image";

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

const VegetablePage = async (_props: { params: Promise<{ id: string }> }) => {
  const { id } = await _props.params;

  const res = await fetch("https://azamsharp.com/vegetables.json");
  const data: Vegetables[] = await res.json();

  const vegetable = data.find((veg) => veg.VegetableId === parseInt(id));

  if (!vegetable) {
    return <div>Vegetable not found</div>;
  }

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

      {/* Title & Description */}
      <div>
        <h1 className="text-3xl font-extrabold text-green-800">
          {vegetable.Name}
        </h1>
        <p className="mt-2 text-gray-700">{vegetable.Description}</p>
      </div>

      {/* Grid Info */}
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

      {/* Growing Instructions */}
      <Separator className="my-4" />
      <div>
        <h2 className="text-xl font-semibold text-green-700">
          Growing Instructions
        </h2>
        <p>{vegetable.GrowingDescription}</p>
      </div>

      {/* Harvest */}
      <Separator className="my-4" />
      <div>
        <h2 className="text-xl font-semibold text-green-700">Harvest</h2>
        <p>{vegetable.HarvestDescription}</p>
      </div>

      {/* Health Benefits */}
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
                {/* Pest Image */}
                <div className="relative w-full md:w-60 h-40 rounded overflow-hidden ">
                  <Image
                    src={pest.photo}
                    alt={pest.name}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Pest Details */}
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
