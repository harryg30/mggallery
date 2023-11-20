"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { api } from "~/trpc/react";

export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState("");

  function handleFile(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const files = (e.target as HTMLInputElement).files;

    if (files) {
      setImage(files[0]);
    }
  }

  useEffect(() => {
    if (image != undefined) {
      const objectUrl = URL.createObjectURL(image);

      setPreview(objectUrl);
    }
  }, [image]);

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ name });
      }}
      className="container m-auto grid grid-cols-3 gap-3"
    >
      <div className="col-span-1 flex flex-col justify-center">
        <div className="flex flex-row justify-end">
          <label>Upload an image</label>
        </div>
      </div>

      <input
        type="file"
        onChange={(e) => handleFile(e)}
        className="col-span-2"
      />

      {preview != "" ? (
        <>
          <div className="col-span-1"></div>
          <div className="col-span-1">
            <img src={preview} />
          </div>
          <div className="col-span-1"></div>
        </>
      ) : (
        <></>
      )}

      <div className="col-span-1 flex flex-col justify-center">
        <div className="flex flex-row justify-end">
          <label>Title</label>
        </div>
      </div>
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="col-span-1 w-full rounded-full px-4 py-2 text-black"
      />
      <div className="col-span-1"></div>

      <div className="col-span-1 flex flex-col justify-center">
        <div className="flex flex-row justify-end">
          <label>Description</label>
        </div>
      </div>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="col-span-1 w-full rounded-full px-4 py-2 text-black"
      />
      <div className="col-span-1"></div>

      <button
        type="submit"
        className="col-span-1 col-start-2 rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createPost.isLoading}
      >
        {createPost.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
