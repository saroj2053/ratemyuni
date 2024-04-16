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
    } else {
      return;
    }
    async function fetchUniversities() {
      const universitiesData = await getUniversities();
      setUniversities(universitiesData);
    }
  }, [searchTerm]);
  console.log(searchTerm);
  console.log(universities);

  return (
    <div>
      <AppLayout onSearch={handleSearch}>
        <div>
          {loading ? (
            <Loader title="Universities" />
          ) : (
            <div className="flex flex-wrap justify-between items-center max-w-[90%] mx-auto my-6">
              {universities?.length === 0 ? (
                <h1 className=" h-[calc(100vh-100px)] flex justify-center items-center text-3xl text-slate-500  font-medium">
                  No universities found
                </h1>
              ) : (
                universities.map((university, universityIdx) => (
                  <University key={universityIdx} university={university} />
                ))
              )}
            </div>
          )}
        </div>
      </AppLayout>
    </div>
  );
};

export default Home;
