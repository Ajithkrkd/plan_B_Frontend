import { useState } from "react";

function FAQSection() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const [isOpen1, setIsOpen1] = useState(false);
  const toggleAccordion1 = () => {
    setIsOpen1(!isOpen1);
  };

  const [isOpen2, setIsOpen2] = useState(false);
  const toggleAccordion2 = () => {
    setIsOpen2(!isOpen2);
  };

  return (
    <section className="bg-white px-4 md:px-14 xl:px-28 ">
      <div className="container  py-10 mx-auto">
        <h1 className="text-xl lg:text-3xl font-semibold  text-gray-800 ">
          Frequently asked questions
        </h1>

        <div className="mt-12 space-y-4">
          <div className="border-2 border-gray-100 rounded-lg">
            <button
              className="flex items-center justify-between w-full px-8 py-4"
              onClick={toggleAccordion}
            >
              <h1 className="font-semibold text-gray-700 text-sm lg:text-lg ">
                What is an Work Item?
              </h1>

              <span className="text-gray-400  rounded-full">
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 transition-transform duration-300 transform rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 12H4"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 transition-transform duration-300 transform rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                )}
              </span>
            </button>

            <div
              className={`transition-max-height duration-300 overflow-hidden transition-delay-150 ${
                isOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <hr className="border-gray-200" />

              <p className="px-8 py-4  text-gray-500">
                Work items are the smallest operational units in our project. A
                project consists of multiple work items, each of which may
                contain child and parent work items, indicating related tasks.
                Essentially, a work item represents the smallest unit of work we
                aim to accomplish.
              </p>
            </div>
          </div>
          <div className="mt-12 space-y-8">
            <div className="border-2 border-gray-100 rounded-lg">
              <button
                className="flex items-center justify-between w-full px-8 py-4"
                onClick={toggleAccordion1}
              >
                <h1 className="font-semibold text-gray-700 text-sm lg:text-lg ">
                  How many types of Work Items are there ?
                </h1>

                <span className="text-gray-400  rounded-full">
                  {isOpen1 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 transition-transform duration-300 transform rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 12H4"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 transition-transform duration-300 transform rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </span>
              </button>

              <div
                className={`transition-max-height duration-300 overflow-hidden transition-delay-150 ${
                  isOpen1 ? "max-h-96" : "max-h-0"
                }`}
              >
                <hr className="border-gray-200" />

                <p className="px-8 py-4  text-gray-500">
                  There are primarily three types of work items utilized for
                  effective project management. The primary parent work item is
                  known as an EPIC. Within the framework of an EPIC, we have the
                  flexibility to create two distinct types of child work items:
                  ISSUES and TASKS.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 space-y-8">
            <div className="border-2 border-gray-100 rounded-lg">
              <button
                className="flex items-center justify-between w-full px-8 py-4"
                onClick={toggleAccordion2}
              >
                <h1 className="font-semibold text-gray-700 text-sm lg:text-lg ">
                  How can i use EPIC ,ISSUE and TASK work Items effectively?
                </h1>

                <span className="text-gray-400  rounded-full">
                  {isOpen2 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 transition-transform duration-300 transform rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 12H4"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 transition-transform duration-300 transform rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </span>
              </button>

              <div
                className={`transition-max-height duration-300 overflow-hidden transition-delay-150 ${
                  isOpen2 ? "max-h-96" : "max-h-0"
                }`}
              >
                <hr className="border-gray-200" />

                <p className="px-8 py-4  text-gray-500">
                  <p>
                    In our project, we use three main types of work items. The
                    big one is called an EPIC. It represents major tasks like
                    building the homepage.
                  </p>

                  <p>
                    Inside an EPIC, we have smaller tasks called ISSUES. These
                    deal with specific parts of the project, like fixing the
                    header or footer.
                  </p>

                  <p>
                    Then, there are TASKS, which are even smaller. They're like
                    steps to solve an ISSUE, such as making a responsive
                    navigation bar or adding a carousel banner.
                  </p>

                  <p>
                    So, EPICs are the big picture, ISSUES are smaller parts, and
                    TASKS are the steps to get things done.
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
