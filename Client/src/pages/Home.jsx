import { Uploader } from "../components/Uploader";
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
        <Uploader />
      </main>
      <WorkSection />
    </>
  );
};
