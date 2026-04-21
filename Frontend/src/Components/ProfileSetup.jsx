import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Instance } from "../lib/Instance";
import { useAuthStore } from "../store/Auth.store";

const SKILLS_OPTIONS = [
    // Frontend
    "React",
    "Next.js",
    "Angular",
    "Vue.js",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Bootstrap",

    // Backend
    "Node.js",
    "Express",
    "Django",
    "Flask",
    "Spring Boot",

    // Languages
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "Go",

    // Databases
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Redis",

    // DevOps / Tools
    "Docker",
    "Kubernetes",
    "AWS",
    "Git",
    "Linux",

    // Specialized
    "Machine Learning",
    "Data Science",
    "Cyber Security",
    "Blockchain"
];

const DEGREE_OPTIONS = [
    "BTech",
    "BE",
    "BSc",
    "BCA",
    "BCom",
    "BA",
    "BBA",

    "MTech",
    "ME",
    "MSc",
    "MCA",
    "MBA",

    "Diploma",

    "PhD"
];
const BRANCH_OPTIONS = [
    "Computer Science",
    "Information Technology",
    "Electronics",
    "Electrical",
    "Mechanical",
    "Civil",
    "AI & Data Science",
    "Cyber Security",
    "Software Engineering",
    "Other"
];
const ProfileSetup = () => {
    const navigate = useNavigate();
    const { setUser } = useAuthStore();
    const [skills, setSkills] = useState([]);
    const [input, setInput] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const [formData, setFormData] = useState({
        experience: "",
        linkedin: "",
        resume: null,
        education: {
            degree: "",
            branch: "",
            college: "",
            graduationYear: ""
        }
    });

    const [loading, setLoading] = useState(false);

    // 🔥 Skill logic (same as before)
    const filteredSkills = SKILLS_OPTIONS.filter(
        (skill) =>
            skill.toLowerCase().includes(input.toLowerCase()) &&
            !skills.includes(skill)
    );

    const addSkill = (skill) => {
        setSkills([...skills, skill]);
        setInput("");
        setShowDropdown(false);
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter((s) => s !== skillToRemove));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && input.trim()) {
            e.preventDefault();
            if (!skills.includes(input)) {
                addSkill(input.trim());
            }
        }
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            resume: e.target.files[0]
        });
    };

    const handleEducationChange = (field, value) => {
        setFormData({
            ...formData,
            education: {
                ...formData.education,
                [field]: value
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = new FormData();

            data.append("experience", formData.experience);
            data.append("linkedin", formData.linkedin);

            data.append("degree", formData.education.degree);
            data.append("branch", formData.education.branch);
            data.append("college", formData.education.college);
            data.append("graduationYear", formData.education.graduationYear);

            skills.forEach((skill) => {
                data.append("skills", skill);
            });

            if (formData.resume) {
                data.append("resume", formData.resume);
            }

            console.log("FINAL DATA:", {
                ...formData,
                skills
            });

            const response = await Instance.post(
                "/onboarding/complete-profile",
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            if (response.data.success) {
                console.log("Profile Update Response:", response.data);
                if (response.data.userData) {
                    setUser(response.data.userData);
                    navigate("/auth-redirect");

                }
                else{
                    navigate("/dashboard");
                }

            }


        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 via-base-200 to-base-300 px-4">

            <div className="w-full max-w-xl bg-base-100/60 backdrop-blur-xl rounded-2xl shadow-xl p-8 space-y-6">

                <h1 className="text-3xl font-bold text-center">
                    Complete Your Profile
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* 🔥 SKILLS */}
                    <div>
                        <label className="block text-sm mb-2">Skills</label>

                        <div className="flex flex-wrap gap-2 mb-2">
                            {skills.map((skill, index) => (
                                <div key={index} className="badge badge-primary gap-2">
                                    {skill}
                                    <button onClick={() => removeSkill(skill)}>✕</button>
                                </div>
                            ))}
                        </div>

                        <input
                            type="text"
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                setShowDropdown(true);
                            }}
                            onKeyDown={handleKeyDown}
                            className="input input-bordered w-full"
                        />

                        {showDropdown && input && (
                            <div className="mt-2 border rounded-xl bg-base-100 shadow-lg">
                                {filteredSkills.map((skill, i) => (
                                    <div key={i} onClick={() => addSkill(skill)} className="p-2 cursor-pointer hover:bg-base-200">
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* EXPERIENCE */}
                    <input
                        type="number"
                        placeholder="Experience (years)"
                        className="input input-bordered w-full"
                        onChange={(e) =>
                            setFormData({ ...formData, experience: e.target.value })
                        }
                    />

                    {/* EDUCATION */}
                    <div className="grid grid-cols-2 gap-4">

                        <select
                            className="select select-bordered"
                            onChange={(e) => handleEducationChange("degree", e.target.value)}
                        >
                            <option disabled selected>Degree</option>
                            {DEGREE_OPTIONS.map((d, i) => <option key={i}>{d}</option>)}
                        </select>

                        <select
                            className="select select-bordered"
                            onChange={(e) => handleEducationChange("branch", e.target.value)}
                        >
                            <option disabled selected>Branch</option>
                            {BRANCH_OPTIONS.map((b, i) => <option key={i}>{b}</option>)}
                        </select>

                    </div>

                    <input
                        type="text"
                        placeholder="College Name"
                        className="input input-bordered w-full"
                        onChange={(e) => handleEducationChange("college", e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Graduation Year"
                        min="1950"
                        max={new Date().getFullYear() + 5}
                        step="1"
                        className="input input-bordered w-full"
                        onChange={(e) => {
                            const value = e.target.value;

                            // optional: prevent invalid typing
                            if (value < 1950 || value > new Date().getFullYear() + 5) return;

                            handleEducationChange("graduationYear", value);
                        }}
                    />
                    {/* LINKEDIN */}
                    <input
                        type="url"
                        placeholder="LinkedIn URL"
                        className="input input-bordered w-full"
                        onChange={(e) =>
                            setFormData({ ...formData, linkedin: e.target.value })
                        }
                    />

                    {/* RESUME */}
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="file-input file-input-bordered w-full"
                        onChange={handleFileChange}
                    />

                    <button className="btn btn-primary w-full">
                        {loading ? "Saving..." : "Complete Profile"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default ProfileSetup;