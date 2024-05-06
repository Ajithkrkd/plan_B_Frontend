import React, { useEffect, useState } from "react";
import {} from "@mui/material";
import "./home.css";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Check } from "@mui/icons-material";
import FAQSection from "./FaqSection";
import Footer from "./Footer";

function Home() {
  const [role, setRole] = useState("");
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      console.log(accessToken);
      const decode = jwtDecode(accessToken);
      console.log(decode);
      const userRole = decode.role;
      setRole(userRole);
    }
  }, []);

  const handleNavigation = () => {
    if (role === "ROLE_ADMIN") {
      navigate("/admin");
    } else {
      navigate("/projects");
    }
  };

  const navigate = useNavigate();
  return (
    <div className="flex  flex-wrap justify-center items-center" id="home">
      <div
        className="w-full  sm:w-5/5 px-4 py-8 mb-8 sm:mb-0 bg-gradient-to-b from-customBlue to-white-800"
        style={{ height: "350px" }}
      >
        <div className="my-3">
          <span className="text-4xl font-thin text-gray-900 dark:text-black px-4">
            Plan your project with
          </span>
          <span className="main-header italic">PLAN-B</span>
          <h3 className="my-3 pl-5">
            <span className="text-lg italic">Plan smarter,</span>
            <span className="text-lg italic"> collaborate better,</span>
            <span className="text-lg italic">
              build your project with your plan
            </span>
          </h3>
        </div>
        <div className="my-6 pl-5">
          <button className="button --shine" onClick={handleNavigation}>
            Start Now
          </button>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="py-3 shadow-md text-center border">
          <p className="text-2xl font-semibold  text-gray-800 lg:text-2xl">
            Boards
          </p>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/3 pt-4 pl-4">
            <p className="text-xl font-semibold italic py-2 border pl-2 mb-3">
              How do boards make your life easier?
            </p>
            <ul className="flex flex-wrap gap-3">
              <li>
                <Check />
                <span className="text-lg font-semibold">Easily track work</span>
                <span>
                  {" "}
                  Work items are represented visually on your kanban board, so
                  teams can quickly check the most up-to-date status of projects
                </span>
              </li>
              <li>
                <Check />
                <span className="text-lg font-semibold">
                  Filter by Creator{" "}
                </span>
                <span>
                  {" "}
                  You can filter out the work items by filtering them by their
                  creator, and you can know about how many work items each
                  creator has created.
                </span>
              </li>
              <li>
                <Check />
                <span className="text-lg font-semibold">
                  Enhancing User Engagement
                </span>
                <span>
                  {" "}
                  Viewing work items in the most effective manner while
                  utilizing a Kanban board enhances user engagement with the
                  project and improves user-friendliness.
                </span>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-2/3 px-4">
            <img
              className="sm:p-5 object-cover"
              src={'/src/assets/board.png' || "https://images.pexels.com/photos/19686909/pexels-photo-19686909/free-photo-of-colorful-umbrellas-hanging-over-a-street.jpeg"}
              alt="Boards"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col ">
        <div className="py-3 shadow-md text-center">
          <p className="text-2xl font-semibold  text-gray-800 lg:text-2xl">
            Work Items
          </p>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-2/3 px-4">
            <img
              className="sm:p-5 object-cover"
              src="/src/assets/workItem.png"
              alt="Boards"
            />
          </div>
          <div className="w-full sm:w-1/3 pt-4 px-4">
            <p className="text-xl font-semibold italic py-2 border px-1 mb-3">
              Unveiling the Purpose of Work Items
            </p>
            <ul className="flex flex-wrap gap-3">
              <li>
                <Check />
                <span className="text-lg font-semibold">Work Item</span>
                <span>
                  {" "}
                  A work item represents the smallest unit of work we aim to
                  accomplish.
                </span>
              </li>
              <li>
                <Check />
                <span className="text-lg font-semibold">
                  Working Lifecycle of a Work Item{" "}
                </span>
                <span>
                  {" "}
                  The working lifecycle of a work item denotes the time period
                  allocated for its completion.
                </span>
              </li>
              <li>
                <Check />
                <span className="text-lg font-semibold">Comments</span>
                <span>
                  {" "}
                  In a work item, comments serve as a platform for discussing
                  the work item, where any member can contribute suggestions.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="py-3 shadow-md text-center">
          <p className="text-2xl font-semibold  text-gray-800 lg:text-2xl">
            Community Chat
          </p>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/3 pt-4 px-4">
            <p className="text-xl font-semibold italic py-2 border px-1 mb-3">
              Purpose of Community Chat
            </p>
            <ul className="flex flex-wrap gap-3">
              <li>
                <Check />
                <span className="text-lg font-semibold">
                  {" "}
                  Real-time Communication
                </span>
                <span>
                  {" "}
                  Engage in real-time conversations with Everyone s and foster
                  collaboration.
                </span>
              </li>
              <li>
                <Check />
                <span className="text-lg font-semibold">
                  Discussions and Announcements{" "}
                </span>
                <span>
                  {" "}
                  Conduct discussions, share announcements, and keep everyone in
                  the loop.
                </span>
              </li>
              <li>
                <Check />
                <span className="text-lg font-semibold">
                  Exploring Ideas Across Domains
                </span>
                <span>
                  {" "}
                  Utilize the platform to collaborate with developers and
                  project managers from diverse domains, fostering innovation
                  and sharing of insights.
                </span>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-2/3 px-4">
            <img
              className="sm:p-5 object-cover"
              src="/src/assets/chat.png"
              alt="Boards"
            />
          </div>
        </div>
        <FAQSection />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
