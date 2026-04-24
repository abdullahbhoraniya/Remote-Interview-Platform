import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Instance } from "../../../../lib/Instance";
import { ArrowLeft, Briefcase, User, FileText, Code, MapPin, DollarSign, Clock } from "lucide-react";

const JobSchema = Yup.object().shape({
  title: Yup.string().required("Title required"),
  role: Yup.string().required("Role required"),
  description: Yup.string()
    .min(10, "Too short")
    .required("Description required"),
  skills: Yup.string()
    .required("Skills required")
    .test("skills-check", "Enter valid skills", (value) => {
      return value && value.split(",").filter(s => s.trim()).length > 0;
    }),
  experience: Yup.number()
    .typeError("Must be a number")
    .required("Experience required")
    .min(0, "Invalid experience"),
  location: Yup.string().required("Location required"),
  salaryMin: Yup.number()
    .typeError("Must be a number")
    .required("Min salary required")
    .min(0),
  salaryMax: Yup.number()
    .typeError("Must be a number")
    .required("Max salary required")
    .min(0)
    .test("max-check", "Max must be >= Min", function (value) {
      const { salaryMin } = this.parent;
      return value >= salaryMin;
    }),
});

const JobEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch job
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await Instance.get(`/recruiter/get-job-by-id/${id}`);
        const job = res.data.data;
        console.log("Job data from the backend", job);
        if (job) {
          // Handle both string and object salaryRange formats
          let salaryMin = "";
          let salaryMax = "";
          
          if (typeof job.salaryRange === "object" && job.salaryRange !== null) {
            salaryMin = job.salaryRange.min || "";
            salaryMax = job.salaryRange.max || "";
          } else if (typeof job.salaryRange === "string") {
            // Try to parse "X-Y LPA" format
            const match = job.salaryRange.match(/(\d+)\s*-\s*(\d+)/);
            if (match) {
              salaryMin = match[1];
              salaryMax = match[2];
            }
          }

          setInitialValues({
            title: job.title || "",
            role: job.role || "",
            description: job.description || "",
            skills: job.skills?.join(", ") || "",
            experience: job.experience || "",
            location: job.location || "",
            salaryMin: salaryMin,
            salaryMax: salaryMax,
          });
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load job data");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!initialValues) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-base-content/70">Job not found</p>
          <button 
            onClick={() => navigate("/jobs")}
            className="btn btn-primary mt-4"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-base-100 p-8 rounded-2xl shadow-xl border border-base-300">
        
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate("/jobs")}
            className="btn btn-circle btn-ghost"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-semibold text-base-content">
            Update Job
          </h2>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={JobSchema}
          enableReinitialize
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const exp = Number(values.experience);

              const payload = {
                title: values.title,
                role: values.role,
                description: values.description,
                location: values.location,
                experience: exp,
                skills: values.skills
                  .split(",")
                  .map(s => s.trim())
                  .filter(Boolean),
                salaryRange: {
                  min: Number(values.salaryMin),
                  max: Number(values.salaryMax),
                },
              };

              await Instance.put(`/recruiter/update-jobs/${id}`, payload);
              toast.success("Job updated successfully");
              navigate("/recruiter/dashboard");

            } catch (err) {
              console.error(err);
              toast.error("Failed to update job");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  <Briefcase className="w-4 h-4 text-base-content/50" />
                </div>
                <Field 
                  name="title" 
                  placeholder="Job Title" 
                  className="input input-bordered w-full pl-10" 
                />
              </div>
              <ErrorMessage name="title" component="div" className="text-error text-sm" />

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  <User className="w-4 h-4 text-base-content/50" />
                </div>
                <Field 
                  name="role" 
                  placeholder="Role" 
                  className="input input-bordered w-full pl-10" 
                />
              </div>
              <ErrorMessage name="role" component="div" className="text-error text-sm" />

              <div className="relative">
                <div className="absolute left-3 top-3 z-10">
                  <FileText className="w-4 h-4 text-base-content/50" />
                </div>
                <Field 
                  as="textarea" 
                  name="description" 
                  placeholder="Description" 
                  className="textarea textarea-bordered w-full pl-10 min-h-[100px]" 
                />
              </div>
              <ErrorMessage name="description" component="div" className="text-error text-sm" />

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  <Code className="w-4 h-4 text-base-content/50" />
                </div>
                <Field 
                  name="skills" 
                  placeholder="Skills (comma separated)" 
                  className="input input-bordered w-full pl-10" 
                />
              </div>
              <ErrorMessage name="skills" component="div" className="text-error text-sm" />

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  <Clock className="w-4 h-4 text-base-content/50" />
                </div>
                <Field 
                  name="experience" 
                  placeholder="Experience (years)" 
                  className="input input-bordered w-full pl-10" 
                />
              </div>
              <ErrorMessage name="experience" component="div" className="text-error text-sm" />

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  <MapPin className="w-4 h-4 text-base-content/50" />
                </div>
                <Field 
                  name="location" 
                  placeholder="Location" 
                  className="input input-bordered w-full pl-10" 
                />
              </div>
              <ErrorMessage name="location" component="div" className="text-error text-sm" />

              {/* Salary split */}
              <div className="flex gap-4">
                <div className="w-1/2 relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                    <DollarSign className="w-4 h-4 text-base-content/50" />
                  </div>
                  <Field 
                    name="salaryMin" 
                    placeholder="Min Salary (LPA)" 
                    className="input input-bordered w-full pl-10" 
                  />
                  <ErrorMessage name="salaryMin" component="div" className="text-error text-sm" />
                </div>

                <div className="w-1/2 relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                    <DollarSign className="w-4 h-4 text-base-content/50" />
                  </div>
                  <Field 
                    name="salaryMax" 
                    placeholder="Max Salary (LPA)" 
                    className="input input-bordered w-full pl-10" 
                  />
                  <ErrorMessage name="salaryMax" component="div" className="text-error text-sm" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Updating...
                  </>
                ) : (
                  "Update Job"
                )}
              </button>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default JobEdit;