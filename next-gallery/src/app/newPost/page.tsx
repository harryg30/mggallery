import Header from "../_components/Header";

export default function NewPost() {
  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <div className="flex flex-row gap-5">
        <label>Upload an image</label>
        <input type="file" id="image" />
      </div>
    </div>
  );
}
