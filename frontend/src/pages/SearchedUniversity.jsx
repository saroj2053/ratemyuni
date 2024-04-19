import React, { useEffect, useState } from "react";
import AppLayout from "../components/user/AppLayout";
import { useLocation } from "react-router-dom";
import University from "../components/user/University";
import Loader from "../components/Loader";

const SearchedUniversity = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUniversity = async () => {
    setLoading(true);
    const response = await fetch(`/api/university/search${query.search}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
    });

    const dataResponse = await response.json();
    setLoading(false);

    setData(dataResponse.university);
  };

  useEffect(() => {
    fetchUniversity();
  }, [query]);

  const queryTerm = query.search.split("=")[1];

  return (
    <AppLayout>
      <div className="w-[90%] mx-auto my-4">
        <div className="container mx-auto p-4">
          {loading && (
            <div className="text-lg text-center">
              <Loader title="Searched Results" />
            </div>
          )}

          <p className="text-lg font-semibold my-3 text-center">
            Search Results : {data.length}
          </p>

          {data.length === 0 && !loading && (
            <p className="bg-white text-lg text-center p-4">
              No Data Found....
            </p>
          )}
          <div className="flex flex-wrap justify-between items-center max-w-[90%] mx-auto my-6">
            {data.length !== 0 &&
              !loading &&
              data.map((uni, uniIdx) => (
                <University key={uniIdx} university={uni} />
              ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SearchedUniversity;
