import Header from "../_components/Header";

export default function Art() {
  return (
    <div className="from-lightBlue to-darkBlue flex min-h-screen flex-row items-start justify-center bg-gradient-to-b text-white">
      <Header />
      <div className="list-item">art</div>
      <div className="list-item">more art</div>
    </div>
  );
}
