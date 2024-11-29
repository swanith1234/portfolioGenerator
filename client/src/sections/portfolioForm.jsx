import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { uploadFile } from "../upload";
import Loader from './Loader'
 
function PortfolioForm() {
  const [loading, setLoading] = useState(false);
 
  const [formData, setFormData] = useState({
    name: "",
    emailId: "",
    phoneNo: "",
    projects: [],
    resume: "",
    experiences: [
      {
        companyName: "",
        role: "",
        description: "",
        technologies: [], // Initialize as an array
        duration: "",
      },
    ],
    contactDetails: [""],
    codingProfiles: [""],
    certifications: [""],
    achievements: [
      {
        title: "",
        description: "",
      },
    ],
    about: "",
    profilePhoto: "",
  });

  const handleAddItem = (field) => {
    const newItem =
      field === "projects"
        ? { title: "", description: "", technologies: [], repoLink: "" }
        : field === "experiences"
        ? {
            companyName: "",
            role: "",
            description: "",
            technologies: [],
            duration: "",
          }
        : field === "achievements"
        ? { title: "", description: "" }
        : "";

    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], newItem],
    }));
  };

  const handleChange = (
    e,
    field,
    index = null,
    subField = null,
    value = e?.target?.value
  ) => {
    const newFormData = { ...formData };
    const newErrors = { ...errors };

    // Debugging log
    console.log("Value:", value, "Type:", typeof value);

    if (index !== null && subField) {
      const updatedArray = newFormData[field].map((item, idx) =>
        idx === index
          ? {
              ...item,
              [subField]:
                subField === "technologies"
                  ? Array.isArray(value)
                    ? value
                        .map((item) =>
                          typeof item === "string" ? item.trim() : item
                        )
                        .filter(Boolean)
                    : []
                  : value,
            }
          : item
      );
      newFormData[field] = updatedArray;

      if (typeof value === "string" && !value.trim()) {
        if (!newErrors[field]) newErrors[field] = [];
        newErrors[field][index] = {
          ...newErrors[field][index],
          [subField]: `${subField} is required.`,
        };
      } else if (newErrors[field]?.[index]?.[subField]) {
        delete newErrors[field][index][subField];
      }
    } else {
      newFormData[field] = value;

      if (typeof value === "string" && !value.trim()) {
        newErrors[field] = `${field} is required.`;
      } else {
        delete newErrors[field];
      }
    }

    setFormData(newFormData);
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.emailId.trim()) newErrors.emailId = "Email is required.";
    if (!formData.phoneNo.trim())
      newErrors.phoneNo = "Phone Number is required.";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.emailId.trim()) {
      newErrors.emailId = "Email is required.";
    } else if (!emailRegex.test(formData.emailId)) {
      newErrors.emailId = "Invalid email format.";
    }
    // Phone Number validation
    const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number format
    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = "Phone Number is required.";
    } else if (!phoneRegex.test(formData.phoneNo)) {
      newErrors.phoneNo = "Invalid phone number format.";
    }

    // Validate array fields
    if (formData.projects.some((project) => !project.title.trim()))
      newErrors.projects = "Project Title is required.";
    if (formData.projects.some((project) => !project.description.trim()))
      newErrors.projects = "Project Description is required.";

    if (formData.contactDetails.some((contact) => !contact.trim()))
      newErrors.contactDetails = "Contact details are required.";

    if (formData.codingProfiles.some((profile) => !profile.trim()))
      newErrors.codingProfiles = "Coding profile URL is required.";

    if (formData.certifications.some((cert) => !cert.trim()))
      newErrors.certifications = "Certification URL is required.";

    return newErrors;
  };

  const handleRemoveItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleArrayChange = (e, field, index, subField = null) => {
    const newFormData = { ...formData };

    if (subField) {
      // Handle subfields for objects within arrays
      newFormData[field] = newFormData[field].map((item, i) =>
        i === index
          ? {
              ...item,
              [subField]: e.target.value,
            }
          : item
      );
    } else {
      // Handle simple arrays
      newFormData[field][index] = e.target.value;
    }

    setFormData(newFormData);
  };

  const handleImageChange = async (e) => {
    console.log("image uploading");
    const file = e.target.files[0];
    const uploadedPhoto = await uploadFile(file);
    console.log("url", uploadedPhoto.url);
    setFormData((prevData) => ({ ...prevData, images: uploadedPhoto.url }));
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {

      console.log("Form submitted successfully!");
      // Proceed with submission logic
    }
 setLoading(true);

      try {
        const res = await axios.post(
          "http://localhost:3000/api/v1//post/userInfo",
          formData
        );
        console.log("res", res);
        if (res.data) {
          setLoading(false);
          window.location.href = res.data.portfolioURL;
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } 

    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 to-pink-500 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white shadow-lg rounded-lg w-full max-w-3xl"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Portfolio Form</h1>
        {/* Name */}
        <label className="block font-semibold mb-2">Name</label>
        <input
          required
          type="text"
          value={formData.name}
          onChange={(e) => handleChange(e, "name")}
          // className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          className={`w-full px-4 py-2 border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:ring ${
            errors.name ? "focus:ring-red-500" : "focus:ring-blue-500"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}

        {/* Email */}
        <label className="block font-semibold mb-2">Email</label>
        <input
          required
          type="email"
          value={formData.emailId}
          onChange={(e) => handleChange(e, "emailId")}
          className={`w-full px-4 py-2 border ${
            errors.emailId ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:ring ${
            errors.emailId ? "focus:ring-red-500" : "focus:ring-blue-500"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.emailId}</p>
        )}

        {/* Phone Number */}
        <label className="block font-semibold mb-2">Phone Number</label>
        <input
          required
          type="text"
          value={formData.phoneNo}
          onChange={(e) => handleChange(e, "phoneNo")}
          className={`w-full px-4 py-2 border ${
            errors.phoneNo ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:ring ${
            errors.phoneNo ? "focus:ring-red-500" : "focus:ring-blue-500"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.phoneNo}</p>
        )}

        {/* Projects */}
        <label className="block font-semibold mb-2">Projects</label>
        {formData.projects.map((project, index) => (
          <div
            key={index}
            className="mb-4 p-2 bg-gray-100 rounded-lg flex flex-row-reverse "
          >
            <button
              type="button"
              onClick={() => handleRemoveItem("projects", index)}
              className="ml-2 text-red-500"
            >
              <AiOutlineDelete />
            </button>
            <div>
              <input
                required
                type="text"
                placeholder="Project Title"
                value={project.title}
                onChange={(e) => handleChange(e, "projects", index, "title")}
                className={` w-full mb-2 p-2 border border-gray-300 rounded-lg ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring ${
                  errors.name ? "focus:ring-red-500" : "focus:ring-blue-500"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
              <input
                required
                type="text"
                placeholder="Description"
                value={project.description}
                onChange={(e) =>
                  handleChange(e, "projects", index, "description")
                }
                className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
              />
              <input
                required
                type="text"
                placeholder="Technologies (comma-separated)"
                value={project.technologies.join(", ")} // Join array to display in the input
                onChange={(e) => {
                  const technologies = e.target.value
                    .split(",") // Split input by commas
                    .map((item) => item.trim()) // Trim each item to remove leading/trailing spaces
                    .filter(Boolean); // Remove any empty strings from the array
                  handleChange(
                    e,
                    "projects",
                    index,
                    "technologies",
                    technologies
                  ); // Pass cleaned array to handleChange
                }}
                className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
              />

              <input
                required
                type="text"
                placeholder="Repo Link"
                value={project.repoLink}
                onChange={(e) => handleChange(e, "projects", index, "repoLink")}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("projects")}
          className="flex items-center text-purple-700 font-semibold"
        >
          <AiOutlinePlus className="mr-2" /> Add Project
        </button>

        {/* Profile Photo */}
        <label className="block font-semibold mb-2 mt-4">Profile Photo</label>
        <input
          required
          type="file"
          onChange={handleImageChange}
          className="mb-4"
        />

        {/* Resume */}
        <label className="block font-semibold mb-2">Resume</label>
        <input
          required
          type="file"
          onChange={handleImageChange}
          className="mb-4"
        />

        {/* Experiences */}
        <label className="block font-semibold mb-2">Experiences</label>
        {formData.experiences.map((experience, index) => (
          <div
            key={index}
            className="flex flex-row-reverse mb-4 p-2 bg-gray-100 rounded-lg relative"
          >
            <button
              type="button"
              onClick={() => handleRemoveItem("experiences", index)}
              className=" text-red-500 flex items-center"
            >
              <AiOutlineDelete className="mr-1" />
            </button>
            <div>
              <input
                required
                type="text"
                placeholder="Company Name"
                value={experience.companyName}
                onChange={(e) =>
                  handleChange(e, "experiences", index, "companyName")
                }
                className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
              />
              <input
                required
                type="text"
                placeholder="Role"
                value={experience.role}
                onChange={(e) => handleChange(e, "experiences", index, "role")}
                className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
              />
              <textarea
                placeholder="Description"
                value={experience.description}
                onChange={(e) =>
                  handleChange(e, "experiences", index, "description")
                }
                className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
              ></textarea>
              <input
                required
                type="text"
                placeholder="Technologies (comma-separated)"
                value={
                  Array.isArray(experience.technologies)
                    ? experience.technologies.join(", ")
                    : ""
                }
                onChange={(e) =>
                  handleChange(
                    e,
                    "experiences",
                    index,
                    "technologies",
                    e.target.value
                      .split(",")
                      .map((item) => item.trim())
                      .filter(Boolean)
                  )
                }
                className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
              />
              <input
                required
                type="text"
                placeholder="Duration (e.g., Jan 2022 - Dec 2022)"
                value={experience.duration}
                onChange={(e) =>
                  handleChange(e, "experiences", index, "duration")
                }
                className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("experiences")}
          className="flex items-center text-purple-700 font-semibold"
        >
          <AiOutlinePlus className="mr-2" /> Add Experience
        </button>

        <label className="block font-semibold mb-2">
          Contact Details (GitHub, LinkedIn, etc.)
        </label>
        {formData.contactDetails.map((contact, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              required
              type="text"
              value={contact}
              placeholder="Contact URL"
              onChange={(e) => handleArrayChange(e, "contactDetails", index)}
              className="flex-1 p-2 border border-gray-300 rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem("contactDetails", index)}
              className="ml-2 text-red-500"
            >
              <AiOutlineDelete />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("contactDetails")}
          className="flex items-center text-indigo-700 font-semibold"
        >
          <AiOutlinePlus className="mr-2" /> Add Contact URL
        </button>

        {/* Coding Profiles */}
        <label className="block font-semibold mb-2 mt-4">
          Coding Profiles (LeetCode, etc.)
        </label>
        {formData.codingProfiles.map((profile, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              required
              type="text"
              value={profile}
              placeholder="Coding Profile URL"
              onChange={(e) => handleArrayChange(e, "codingProfiles", index)}
              className="flex-1 p-2 border border-gray-300 rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem("codingProfiles", index)}
              className="ml-2 text-red-500"
            >
              <AiOutlineDelete />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("codingProfiles")}
          className="flex items-center text-indigo-700 font-semibold"
        >
          <AiOutlinePlus className="mr-2" /> Add Coding Profile URL
        </button>

        {/* Certifications */}
        <label className="block font-semibold mb-2 mt-4">Certifications</label>
        {formData.certifications.map((cert, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              required
              type="text"
              value={cert}
              placeholder="Certification URL"
              onChange={(e) => handleArrayChange(e, "certifications", index)}
              className="flex-1 p-2 border border-gray-300 rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem("certifications", index)}
              className="ml-2 text-red-500"
            >
              <AiOutlineDelete />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("certifications")}
          className="flex items-center text-indigo-700 font-semibold"
        >
          <AiOutlinePlus className="mr-2" /> Add Certification URL
        </button>

        {/* Achievements */}
        <label className="block font-semibold mb-2 mt-4">Achievements</label>
        {formData.achievements.map((achievement, index) => (
          <div key={index} className="mb-4 p-2 bg-gray-100 rounded-lg">
            <input
              required
              type="text"
              placeholder="Achievement Title"
              value={achievement.title}
              onChange={(e) =>
                handleArrayChange(e, "achievements", index, "title")
              }
              className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Achievement Description"
              value={achievement.description}
              onChange={(e) =>
                handleArrayChange(e, "achievements", index, "description")
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
            ></textarea>
            <button
              type="button"
              onClick={() => handleRemoveItem("achievements", index)}
              className="mt-2 text-red-500 flex items-center"
            >
              <AiOutlineDelete className="mr-2" /> Remove Achievement
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("achievements")}
          className="flex items-center text-indigo-700 font-semibold"
        >
          <AiOutlinePlus className="mr-2" /> Add Achievement
        </button>

        {/* About Section */}
        <label className="block font-semibold mb-2">About</label>
        <textarea
          value={formData.about}
          onChange={(e) => handleChange(e, "about")}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
        ></textarea>

        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg"
        >
          Submit
        </button>
      </form>
      <Loader show={loading}/>

    </div>
  );
}

export default PortfolioForm;
