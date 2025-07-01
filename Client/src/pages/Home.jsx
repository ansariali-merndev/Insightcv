import { WorkSection } from "../components/WorkSection";

export const Home = () => {
  return (
    <>
      <main>
        <div className="my-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-center">
            Turn your CV into smart insights
          </h2>
          <p className="text-center text-sm md:text-2xl font-medium my-2">
            Upload your resume and get tailored AI suggestions & summaries in
            seconds.{" "}
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 my-12">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-[5px] cursor-pointer hover:bg-purple-800">
            Try InsightCV
          </button>
        </div>
      </main>
      <WorkSection />
    </>
  );
};
