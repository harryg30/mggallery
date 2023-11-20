"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UploadButton } from "~/utils/uploadthing";

import { api } from "~/trpc/react";

export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [month, setMonth] = useState<number>(1);
  const [year, setYear] = useState<number>(1);
  const [imageUrl, setImageUrl] = useState("");

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Generate an array of the last 15 years
  const last25Years = Array.from(
    { length: 25 },
    (_, index) => currentYear - index,
  );

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
        createPost.mutate({ imageUrl, name, description, month, year });
      }}
      className="container m-auto grid grid-cols-3 gap-3"
    >
      <div className="col-span-1 flex flex-col justify-center">
        <div className="flex flex-row justify-end">
          <label>Upload an image</label>
        </div>
      </div>

      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);

          if (res != undefined) {
            if (res[0] != undefined) {
              if (res[0].url != undefined) {
                setImageUrl(res[0].url);
              }
            }
          }
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
        className="col-span-1"
      />
      <div className="col-span-1"></div>
      {imageUrl != "" ? (
        <>
          <div className="col-span-1"></div>
          <div className="col-span-1">
            <img src={imageUrl} />
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

      <div className="col-span-1 flex flex-col justify-center">
        <div className="flex flex-row justify-end">
          <label>Finished Date</label>
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-row gap-6">
          <label htmlFor="month">Month</label>
          <select
            id="month"
            name="month"
            className="text-black"
            defaultValue={1}
            onChange={(e) => setMonth(parseInt(e.target.value))}
          >
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>

          <label htmlFor="year">Year</label>
          <select
            id="year"
            name="year"
            className="text-black"
            onChange={(e) => setYear(parseInt(e.target.value))}
          >
            {last25Years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
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
