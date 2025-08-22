"use client";

import { Formik } from "formik";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import { api } from "~/trpc/react";

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
    },
  });

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values) => {
          createPost.mutate({ name: values.name });
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Title"
              value={values.name}
              onChange={handleChange}
            />
            <Button
              type="submit"
              disabled={createPost.isPending}
            >
              {createPost.isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
