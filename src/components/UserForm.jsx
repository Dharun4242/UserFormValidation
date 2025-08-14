import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

const Schema = z.object({
  fullName: z.string().min(3, "FullName must be at least 3 Characters"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least 1 UpperCase letter")
    .regex(/[a-z]/, "Password must contain at least 1 lowerCase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?:{}|<>]/,
      "Password must conatin at least 1 special characters"
    ),
  age: z.coerce.number().min(18, "Must be at least 18"),
  role: z.string().min(1, "Please Select a Role"),
  skills: z.array(z.string()).min(1, "Select atleast one skill"),
  experience: z.string().min(1, "Select your experience level"),
  remote: z.boolean().optional(),
  startDate: z.string().min(1, "Start Date is required"),
  avaliableHours: z
    .number()
    .min(1, "Minimun 1 Hour required")
    .max(60, "Cannot exceed 60 Hours"),
  bio: z.string().min(10, "Bio must be atleast 10 chracters"),
  profileImage: z
    .any()
    .refine((file) => file && file.length > 0, "Profile image is required")
    .refine(
      (file) => file && file[0]?.size <= MAX_FILE_SIZE,
      "Maximum file size is 2MB"
    )
    .refine(
      (file) => file && ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Only JPEG or PNG images are allowed"
    ),
  newsletter: z.boolean().optional(),
});

const UserForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: { skills: [], remote: false, avaliableHours: 0 },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Form Data", data);
    alert("Submitted Successfully");
    reset();
  };

  const skillSelected = watch("skills");

  const toggleSkill = (skill) => {
    const updatedSkills = skillSelected.includes(skill)
      ? skillSelected.filter((s) => s !== skill)
      : [...skillSelected, skill];
    setValue("skills", updatedSkills);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-700">
          Registration Form
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block font-semibold text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              {...register("fullName")}
              placeholder="Enter Full Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block font-semibold text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Enter Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Enter Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="age"
              className="block font-semibold text-gray-700 mb-1"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              {...register("age")}
              placeholder="Enter Age"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="role"
              className="block font-semibold text-gray-700 mb-1"
            >
              Role
            </label>
            <select
              {...register("role")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Role</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Writer">Writer</option>
              <option value="Other">Other</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="skills"
              className="block font-semibold text-gray-700 mb-1"
            >
              Skills
            </label>
            <div className="flex flex-wrap gap-4">
              {["React", "Node.js", "UI-Design", "Python"].map((skill) => (
                <label key={skill} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={skillSelected.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"
                  />
                  <span>{skill}</span>
                </label>
              ))}
            </div>
            {errors.skills && (
              <p className="text-red-500 text-sm mt-1">
                {errors.skills.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="experience"
              className="block font-semibold text-gray-700 mb-1"
            >
              Experience Level
            </label>
            <div className="flex gap-6">
              {["Junior", "Mid", "Senior"].map((level) => (
                <label key={level} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={level}
                    {...register("experience")}
                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-300"
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>
            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">
                {errors.experience.message}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-center space-x-2 font-semibold text-gray-700">
              <input
                type="checkbox"
                {...register("remote")}
                className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"
              />
              <span>Available for Remote Work</span>
            </label>
          </div>
          <div>
            <label
              htmlFor="startDate"
              className="block font-semibold text-gray-700 mb-1"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              {...register("startDate")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            ></input>
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">
                {" "}
                {errors.startDate.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="avaliableHours"
              className="block font-semibold text-gray-700 mb-1"
            >
              Avaliable Hours Per Week: {watch("avaliableHours") ?? 1} hrs
            </label>
            <input
              type="range"
              min="1"
              max="60"
              {...register("avaliableHours", { valueAsNumber: true })}
              className="w-full"
            ></input>
            {errors.avaliableHours && (
              <p className="text-red-500 text-sm mt-1">
                {errors.avaliableHours.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block font-semibold text-gray-700 mb-1"
            >
              Bio
            </label>
            <textarea
              id="bio"
              {...register("bio")}
              placeholder="Write Something about Yourself..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="profileImage"
              className="block font-semibold text-gray-700 mb-1"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              {...register("profileImage")}
              accept="image/jpeg, image/png"
              className="block w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {errors.profileImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.profileImage.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Subscribe to Newsletter
            </label>

            <button
              type="button"
              onClick={() => setValue("newsletter", !watch("newsletter"))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                watch("newsletter") ? "bg-indigo-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  watch("newsletter") ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
