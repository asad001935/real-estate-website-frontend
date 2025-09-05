import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const neighbourhoods = [
  {
    id: 1,
    name: "Model Town",
    image:
      "https://c8.alamy.com/comp/2KFK10X/call-the-mall-area-in-central-park-provides-a-peaceful-path-on-an-autumn-afternoon-2022-nyc-usa-2KFK10X.jpg",
    description: "Peaceful area with schools, parks, and malls nearby.",
    properties: 25,
  },
  {
    id: 2,
    name: "DHA Phase 5",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.993pK2L-xNZi6Msssf3xFAAAAA?pid=Api&P=0&h=220",
    description: "Modern area with luxury houses and secure environment.",
    properties: 40,
  },
  {
    id: 3,
    name: "Johar Town",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.AmQ4W47GiCklgjsD55eBcgHaE8?pid=Api&P=0&h=220",
    description: "Busy area with universities, hospitals, and markets.",
    properties: 18,
  },
];

export default function Neighbourhoods() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 mt-10">
      <h1 className="text-3xl font-bold text-center mb-8 ">Neighbourhoods</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {neighbourhoods.map((area) => (
          <div
            key={area.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <img
              src={area.image}
              alt={area.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">{area.name}</h2>
              <p className="text-gray-600 mb-4">{area.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                {area.properties} Properties Available
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex  justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 
             text-white font-semibold rounded-2xl shadow-lg 
             hover:from-indigo-600 hover:via-purple-500 hover:to-pink-500 
             hover:scale-110 hover:shadow-xl 
             transition-all duration-300 ease-in-out"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <Link
          to="/contact"
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          Contact with us to check this property
        </Link>
      </div>
    </div>
  );
}
