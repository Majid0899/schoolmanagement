import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/school");
        if (response.data.success) {
          setServerError("");
          setSchools(response.data.data);
        }
      } catch (error) {
        if (error.response.data.error) {
          setServerError(error.response.data.error);
        } else {
          setServerError("An unexpected server error occured");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center   text-gray-500 text-lg">
        Loading schools...
      </div>
    );
  }
  return (
    <div className="max-w-6xl shadow-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Schools</h1>
      {serverError && (
        <div className="flex justify-center items-center  text-red-500 text-lg">
          {serverError}
        </div>
      )}
      {schools.length === 0 ? (
        <div className="flex justify-center items-center  text-gray-500 text-lg">
          No schools found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {schools.map((school) => (
            <div
              key={school.id}
              className="border rounded-lg  overflow-hidden bg-white hover:shadow-2xl hover:shadow-orange-200 transition-shadow duration-300"
            >
              <div className="relative w-full h-48">
                <Image
                  src={school.image}
                  alt={school.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{school.name}</h2>
                <p className="text-gray-600">{school.address}</p>
                <p className="text-gray-600">{school.city}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="w-full flex my-2 justify-center items-center">
        <Link href="/" className="px-6 py-3 hover:border hover:border-blue-600 text-blue-600 rounded-lg font-semibold shadow-md hover:shadow-blue-700 transition">Go Back</Link>
      </div>
    </div>
  );
}
