import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddSchool() {
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formdata = new FormData();
      for (const key in data) {
        if (key === "image") {
          formdata.append("image", data.image[0]);
        } else {
          formdata.append(key, data[key]);
        }
      }
      // send data
      const response = await axios.post("/api/school", formdata);

      if (response.data.success) {
        setSuccess(`${response.data.message} Redirecting to schools....`);
        reset();
        setTimeout(() => {
          router.push("/showSchools");
        }, 2000);
      }
    } catch (error) {
      if (error.response.data.error) {
        setServerError(error.response.data.error);
      } else {
        setServerError("An unexpected error has been occured");
      }
    }
  };

  return (
    <div className="flex justify-center items-start lg:items-center  min-h-screen bg-gray-100 py-2">
      <div className="w-full max-w-4xl mx-2  shadow-lg shadow-blue-500 px-8 py-1">
        <h2 className="text-3xl font-bold text-center  text-blue-600">
          Add a School
        </h2>

        {success && (
          <div className="mb-4 p-3 text-green-800 bg-green-100 rounded">
            {success}
          </div>
        )}
        {serverError && (
          <div className="mb-4 p-3 text-red-800 bg-red-100 rounded">
            {serverError}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          encType="multipart/form-data"
        >
          {/* Name */}
          <div>
            <label className="block mb-1 font-semibold" htmlFor="name">
              School Name
            </label>

            <input
              {...register("name", { required: true })}
              placeholder="School Name"
              id="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.name && (
              <span className="text-red-600 text-sm">Name is required</span>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-semibold" htmlFor="address">
              School Address
            </label>
            <input
              {...register("address", { required: true })}
              placeholder="Address"
              id="address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.address && (
              <span className="text-red-600 text-sm">Address is required</span>
            )}
          </div>

          {/* City & State */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-semibold" htmlFor="city">
                City
              </label>
              <input
                {...register("city", { required: true })}
                placeholder="City"
                id="city"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.city && (
                <span className="text-red-600 text-sm">City is required</span>
              )}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold" htmlFor="state">
                State
              </label>
              <input
                {...register("state", { required: true })}
                placeholder="State"
                id="state"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.state && (
                <span className="text-red-600 text-sm">State is required</span>
              )}
            </div>
          </div>

          {/* Contact & Email */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-semibold" htmlFor="contact">
                Contact
              </label>
              <input
                {...register("contact", {
                  required: true,
                })}
                placeholder="Contact Number"
                id="contact"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.contact && (
                <span className="text-red-600 text-sm">
                  Contact is required
                </span>
              )}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold" htmlFor="email">
                School Email
              </label>
              <input
                {...register("email_id", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                placeholder="Email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.email_id && (
                <span className="text-red-600 text-sm">
                  {errors.email_id.message}
                </span>
              )}
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 font-semibold" htmlFor="image">
              School Image
            </label>
            <input
              type="file"
              {...register("image", { required: true })}
              id="image"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            {errors.image && (
              <span className="text-red-600 text-sm">Image is required</span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Add School
          </button>
        </form>
      </div>
    </div>
  );
}
