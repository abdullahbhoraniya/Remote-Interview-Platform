import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast'
const JobSchema = Yup.object().shape({
  title: Yup.string().required("Title required"),
  role: Yup.string().required("Role required"),
  description: Yup.string().min(10, "Too short").required("Description required"),
  skills: Yup.string()
    .required("Skills required")
    .test("skills-check", "Enter valid skills", (value) => {
      return value && value.split(",").filter(s => s.trim()).length > 0;
    }),
  experience: Yup.string().required("Experience required"),
  location: Yup.string().required("Location required"),
  salaryRange: Yup.string().required("Salary required"),
});

export default function CreateJobForm() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      
      <div className="max-w-3xl w-full bg-base-100 p-8 rounded-2xl shadow-xl border border-base-300">
        
        <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
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
            salaryRange: "",
          }}
          validationSchema={JobSchema}
          onSubmit={(values) => {
            const payload = {
              ...values,
              skills: values.skills.split(",").map(s => s.trim()),
            };

            console.log("SEND THIS TO BACKEND:", payload);
            toast.success("Job listed successfully")

            
          }}
        >
          {() => (
            <Form className="space-y-5">

              {/* INPUT STYLE (Improved visibility) */}

              <div>
                <Field
                  name="title"
                  placeholder="Job Title"
                  className="input input-bordered w-full bg-base-100 text-base-content placeholder-base-content/60 focus:input-primary"
                />
                <ErrorMessage name="title" component="div" className="text-error text-sm mt-1" />
              </div>

              <div>
                <Field
                  name="role"
                  placeholder="Role (e.g. Frontend Developer)"
                  className="input input-bordered w-full bg-base-100 text-base-content placeholder-base-content/60 focus:input-primary"
                />
                <ErrorMessage name="role" component="div" className="text-error text-sm mt-1" />
              </div>

              <div>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Job Description"
                  className="textarea textarea-bordered w-full bg-base-100 text-base-content placeholder-base-content/60 focus:textarea-primary"
                />
                <ErrorMessage name="description" component="div" className="text-error text-sm mt-1" />
              </div>

              <div>
                <Field
                  name="skills"
                  placeholder="Skills (comma separated)"
                  className="input input-bordered w-full bg-base-100 text-base-content placeholder-base-content/60 focus:input-primary"
                />
                <ErrorMessage name="skills" component="div" className="text-error text-sm mt-1" />
              </div>

              <div>
                <Field
                  name="experience"
                  placeholder="Experience (e.g. 1-3 years)"
                  className="input input-bordered w-full bg-base-100 text-base-content placeholder-base-content/60 focus:input-primary"
                />
                <ErrorMessage name="experience" component="div" className="text-error text-sm mt-1" />
              </div>

              <div>
                <Field
                  name="location"
                  placeholder="Location"
                  className="input input-bordered w-full bg-base-100 text-base-content placeholder-base-content/60 focus:input-primary"
                />
                <ErrorMessage name="location" component="div" className="text-error text-sm mt-1" />
              </div>

              <div>
                <Field
                  name="salaryRange"
                  placeholder="Salary Range (e.g. 5-10 LPA)"
                  className="input input-bordered w-full bg-base-100 text-base-content placeholder-base-content/60 focus:input-primary"
                />
                <ErrorMessage name="salaryRange" component="div" className="text-error text-sm mt-1" />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                Create Job
              </button>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}