import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Schema = z.object({
  fullName: z.string().min(3, "FullName must be at least 3 Characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  age: z.coerce.number().min(18, "Must be at least 18"),
  role: z.string().min(1, "Please Select a Role"),
  skills: z.array(z.string()).min(1, "Select atleast one skill"),
  experience: z.string().min(1, "Select your experience level"),
  remote: z.boolean().optional(),
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
    defaultValues: { skills: [], remote: false },
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
