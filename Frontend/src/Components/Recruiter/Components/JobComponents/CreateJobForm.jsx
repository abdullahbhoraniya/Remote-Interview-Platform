import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { createJob } from "../../../../api/recruiter";

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

export default function CreateJobForm() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-base-100 p-8 rounded-2xl shadow-xl border border-base-300">

        <h2 className="text-2xl font-semibold mb-6">
          Create Job
        </h2>

        <Formik
          initialValues={{
            title: "",
            role: "",
            description: "",
            skills: "",
            experience: "",
            location: "",
            salaryMin: "",
            salaryMax: "",
          }}

          validationSchema={JobSchema}

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
              
              console.log("res",payload
              );
              const res = await createJob(payload);

              toast.success(res?.message || "Job created successfully");

            } catch (error) {
              console.error(error);
              toast.error("Failed to create job");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">

              <Field name="title" placeholder="Job Title" className="input input-bordered w-full" />
              <ErrorMessage name="title" component="div" className="text-error text-sm" />

              <Field name="role" placeholder="Role" className="input input-bordered w-full" />
              <ErrorMessage name="role" component="div" className="text-error text-sm" />

              <Field as="textarea" name="description" placeholder="Description" className="textarea textarea-bordered w-full" />
              <ErrorMessage name="description" component="div" className="text-error text-sm" />

              <Field name="skills" placeholder="Skills (comma separated)" className="input input-bordered w-full" />
              <ErrorMessage name="skills" component="div" className="text-error text-sm" />

              <Field name="experience" placeholder="Experience (years)" className="input input-bordered w-full" />
              <ErrorMessage name="experience" component="div" className="text-error text-sm" />

              <Field name="location" placeholder="Location" className="input input-bordered w-full" />
              <ErrorMessage name="location" component="div" className="text-error text-sm" />

              {/* ✅ Salary split */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <Field name="salaryMin" placeholder="Min Salary (LPA)" className="input input-bordered w-full" />
                  <ErrorMessage name="salaryMin" component="div" className="text-error text-sm" />
                </div>

                <div className="w-1/2">
                  <Field name="salaryMax" placeholder="Max Salary (LPA)" className="input input-bordered w-full" />
                  <ErrorMessage name="salaryMax" component="div" className="text-error text-sm" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full"
              >
                {isSubmitting ? "Creating..." : "Create Job"}
              </button>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}