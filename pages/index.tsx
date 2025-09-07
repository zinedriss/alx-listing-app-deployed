import { PROPERTYLISTINGSAMPLE } from "@/constants";
import { HERO_BACKGROUND_IMAGE } from "@/constants";
import Card from "@/components/common/Card";
import Pill from "@/components/layout/Pill";
import { PropertyProps } from "@/interfaces";
import { FILTERS } from "@/constants";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Update this API call to use the environment variable
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/properties`);
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const filteredProperties = (properties ? properties : PROPERTYLISTINGSAMPLE).filter((property: PropertyProps) => {
    return (
      activeFilter === 'All' ||
      property.category?.some((cat) =>
        cat.toLowerCase().includes(activeFilter.toLowerCase())
      ) ||
      property.name.toLowerCase().includes(activeFilter.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <section className="bg-cover bg-center bg-no-repeat flex justify-center items-center flex-col h-[50vh] relative"
        style={{ backgroundImage: `url(${HERO_BACKGROUND_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
            Find your favorite place here!
          </h1>
          <h2 className="text-white font-semibold text-lg md:text-xl lg:text-2xl max-w-3xl">
            The best prices for over 2 million properties worldwide
          </h2>
        </div>
      </section>

      {/* Filter section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Explore by Category
            </h3>
            <span className="text-sm text-gray-600">
              {filteredProperties.length} properties found
            </span>
          </div>
