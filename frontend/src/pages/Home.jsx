import React, { useEffect, useState } from "react";
import useGetUniversities from "../hooks/useGetUniversities";
import University from "../components/user/University";
import Loader from "../components/Loader";
import AppLayout from "../components/user/AppLayout";

const Home = () => {
  const { loading, getUniversities } = useGetUniversities();
  const [universities, setUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (data, term) => {
    setUniversities(data);
    setSearchTerm(term);
  };

  useEffect(() => {
    if (searchTerm.length === 0 && universities.length === 0) {
      fetchUniversities();
    }
    async function fetchUniversities() {
      const universitiesData = await getUniversities();
      setUniversities(universitiesData);
    }
  }, [searchTerm]);

  return (
    <AppLayout onSearch={handleSearch}>
      {loading ? (
        <Loader title="Universities" />
      ) : universities?.length === 0 ? (
        <div className="min-h-[calc(100vh-100px)] flex items-center justify-center">
          <h1 className="text-2xl text-gray-400 font-medium">
            No universities found
          </h1>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-wrap gap-6 items-stretch">
          {universities.map((university) => (
            <div key={university._id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex">
              <University university={university} />
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default Home;
