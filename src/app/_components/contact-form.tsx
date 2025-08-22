"use client";

import { Formik } from "formik";
import type { FormikErrors } from "formik";

import { Label } from "~/components/ui/label"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"

interface FormValues {
  email: string;
  password: string;
}

export default function ContactForm() {
  return (
    <div className="w-full max-w-xs">
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values: FormValues) => {
          const errors: FormikErrors<FormValues> = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                />
                {<p className="text-red-500">{errors.email && touched.email && errors.email}</p>}
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                />
                {<p className="text-red-500">{errors.password && touched.password && errors.password}</p>}
            </div>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
