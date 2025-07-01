import { Link } from "react-router-dom";
import contact from "../assets/contact.jpg";

export const Contact = () => {
  return (
    <>
      <h2 className="text-2xl font-bold md:hidden text-center mt-8 text-blue-600">
        Contact Information
      </h2>

      <section className="flex flex-col md:flex-row items-center justify-center gap-8 my-12">
        <img src={contact} alt="contact" className="w-84 h-auto" />
        <div className="text-gray-800 space-y-6">
          <h2 className="text-2xl font-bold hidden md:flex text-blue-600">
            Contact Information
          </h2>

          <div>
            <strong>Address:</strong>
            <p>Unit 45 Greenfield Plaza, Block D Lane 12</p>
            <p>Newtown Heights, Sector 21, Techno City,</p>
            <p>Telangana, India</p>
          </div>

          <div>
            <strong>Phone/Whatsapp:</strong>
            <p>+91 91234 56789</p>
            <p>+91 99887 77665</p>
          </div>

          <div>
            <strong>Email:</strong>
            <p>contactdesk321@mailservice.com</p>
          </div>
          <Link
            to={"/about"}
            className="bg-indigo-600 text-white px-4 py-3 rounded-[4px]"
          >
            Explore more
          </Link>
        </div>
      </section>
    </>
  );
};
