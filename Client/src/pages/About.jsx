import about from "../assets/about.jpeg";

export const About = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-start">
      <div className="flex items-center justify-center order-1 md:order-0 my-6">
        <img src={about} alt="About Image" className="w-full cursor-grab" />
      </div>
      <div>
        <h1 className="text-4xl font-extrabold my-4 text-center text-indigo-600">
          About InsightCV
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6 text-center">
          InsightCV is your intelligent assistant to help you craft a better
          resume and stand out in the competitive job market.
        </p>

        <h2 className="text-2xl font-bold mb-2 text-purple-700">What We Do</h2>
        <p className="text-gray-600 mb-4">
          At InsightCV, we believe your CV should work for you. That's why we've
          built a platform where you can simply upload your resume, enter the
          job description you&apos;re targeting, and let our AI generate smart
          suggestions, summaries, and tailored insights — all in seconds.
        </p>

        <h2 className="text-2xl font-bold mb-2 text-purple-700">
          Why InsightCV?
        </h2>
        <ul className="md:list-disc md:pl-6 text-gray-600 mb-4">
          <li>
            Instantly get concise summaries of your CV tailored to specific
            roles.
          </li>
          <li>Discover skill gaps and improve your CV with AI suggestions.</li>
          <li> Save hours of manual editing and guesswork.</li>
          <li> Present your best professional self with confidence.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-2 text-purple-700">Our Mission</h2>
        <p className="text-gray-600 mb-6">
          We aim to simplify and personalize the resume optimization process, so
          you can focus on preparing for interviews and growing your career.
          Whether you&apos;re a fresher, switching fields, or chasing your dream
          job, InsightCV is here to support you.
        </p>
      </div>
    </section>
  );
};
