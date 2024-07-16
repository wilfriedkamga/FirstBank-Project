import React, { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { format } from "date-fns";
import Variable from "../../../../Variable";
import PlanCard, {
  PlanCardProps,
} from "../../../../Components/SavingPlan/Card/Plan/PlanCard";
import Header from "../../../../Components/SavingPlan/header/Header";
import BottomNavigation from "../../../../Components/SavingPlan/bottom navigation/BottomNavigation";

export interface Plan {
  reason: string; // Assuming 'reason' is what you want as the label
  startDate: Date;
  dueDate: Date;
  savingBalance: string; // Make sure to parse this if it's a string
  amountTarget: string; // Make sure to parse this if it's a string
  id: string;
}

const Plans = () => {
  const [accountBalance, setAccountBalance] = useState(0);
  const [plans, setPlans] = useState<PlanCardProps[]>([]);
  const [planDisplay, setPlanDisplay] = useState<PlanCardProps[]>(plans);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const user = Variable.getLocalStorageItem("user");
  const phone = user.user.phone;
  const previousPage = () => {
    window.history.back();
  };

  const handleFilterClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchPlans();
  }, []);
  useEffect(() => {
    setPlanDisplay(plans);
  }, [plans]);
  useEffect(() => {
    fetchPlans();
  }, [selectedStatus]);

  const fetchPlans = async () => {
    try {
      let response;
      if (selectedStatus === "all") {
        response = await axios.get(
          `${Variable.saving_base_url}/savingsplanManagement/get-all-savings/${phone}`
        );
      } else {
        response = await axios.get(
          `${Variable.saving_base_url}/savingsplanManagement/get-all-plans/${phone}/${selectedStatus}`
        );
      }
      const transformedDate = response.data.map((plan: Plan) => ({
        id: plan.id, // Assuming 'id' is what you want as the id
        label: plan.reason, // Assuming 'reason' is what you want as the label
        startDate: format(new Date(plan.startDate), "yyyy-MM-dd"), // Format the startDate
        endDate: format(new Date(plan.dueDate), "yyyy-MM-dd"), // Format the dueDate
        target: plan.amountTarget,
        progress:
          parseFloat(plan.savingBalance) / parseFloat(plan.amountTarget), // Calculate progress
      }));
      setPlans(transformedDate);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const searchResult = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value !== "") {
      let tempPlans = [...plans];
      tempPlans = plans.filter((plan) => {
        return plan.label
          .toLowerCase()
          .trim()
          .includes(value.toLowerCase().trim());
      });
      if (tempPlans.length > 0) {
        setPlanDisplay(tempPlans);
      }
    } else {
      setPlanDisplay(plans);
    }
  };

  const handleCheckboxChange = (status: string) => {
    setSelectedStatus(status);
    fetchPlans();
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      !target.closest("#filterbottomsheet") &&
      !target.closest("#filterbottomsheetbutton")
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-full  bg-white flex flex-col">
      <Header />

      <div className="flex flex-col mt-[10vh]  bg-gray-200 mb-[10vh] pt-5 h-full w-full space-y-8 overflow-auto">
        <div className="pt-5 ml-3 border-b flex justify-start border-gray-200">
          <div className="flex cursor-pointer mb-5" onClick={previousPage}>
            <ChevronLeftIcon className="h-6 w-6 my-auto md:h-8 md:w-8 md:hidden" />
            <h2 className="font-title font-semibold py-1 text-[#0C1013] text-lg md:text-xl">
              List of Plans
            </h2>
          </div>
        </div>
        <div className="rounded-lg shadow-md w-full p-5 bg-[#BB0A01] flex justify-between">
          <div className="items-center">
            <h1 className="font-title text-base font-medium text-white text-gray-700">
              Account Balance
            </h1>
            <span className="text-2xl font-title">{accountBalance} XAF</span>
          </div>
          <div className=""></div>
        </div>
        <div className="w-full h-full py-5 px-3 flex flex-row">
          <div className=" md:w-1/5 h-full md:border-gray-200 md:border-r px-5 hidden md:block">
            <h2 className="font-title font-medium text-base ml-5 mb-5">
              Search
            </h2>
            <form className="max-w-xs mx-auto mb-5">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <MagnifyingGlassIcon className="h-6 w-6" />
                </div>
                <input
                  type="search"
                  name=""
                  id=""
                  className="block w-full p-4 ps-10 text-sm text-gray-900 bg-transparent border-b font-title font-extralight border-gray-300 rounded-t-lg focus:bg-gray-50 focus:outline-none focus:border-red-500"
                  onChange={searchResult}
                  placeholder="Search your plan"
                />
                <button
                  type="submit"
                  className="text-white absolute font-title end-2.5 bottom-2.5 bg-[#BB0A01] hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-500 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Search
                </button>
              </div>
            </form>
            <h2 className="font-title font-medium text-base ml-5 mb-5">
              Filter by
            </h2>
            <div className="flex flex-col w-full ml-8 space-y-3">
              <div className="w-full block">
                <input
                  type="checkbox"
                  name=""
                  id="all"
                  checked={selectedStatus === "all"}
                  onChange={() => handleCheckboxChange("all")}
                />
                <label htmlFor="all" className="font-title text-base ml-3">
                  All
                </label>
              </div>
              <div className="w-full block">
                <input
                  type="checkbox"
                  name=""
                  id="ongoing"
                  checked={selectedStatus === "Ongoing"}
                  onChange={() => handleCheckboxChange("Ongoing")}
                />
                <label htmlFor="ongoing" className="font-title text-base ml-3">
                  Ongoing
                </label>
              </div>
              <div className="w-full block">
                <input
                  type="checkbox"
                  name=""
                  id="incoming"
                  checked={selectedStatus === "Incoming"}
                  onChange={() => handleCheckboxChange("Incoming")}
                />
                <label htmlFor="incoming" className="font-title text-base ml-3">
                  Incoming
                </label>
              </div>
              <div className="w-full block">
                <input
                  type="checkbox"
                  name=""
                  id="completed"
                  checked={selectedStatus === "Completed"}
                  onChange={() => handleCheckboxChange("Completed")}
                />
                <label
                  htmlFor="completed"
                  className="font-title text-base ml-3"
                >
                  Completed
                </label>
              </div>
            </div>
          </div>
          <div className="h-full w-full">
            <div className="md:ml-5 w-full flex md:hidden justify-between">
              <button
                className="flex py-2 md:mb-5 px-3 bg-[#BB0A01] rounded-md font-title text-white h-10"
                id="filterbottomsheetbutton"
                onClick={handleFilterClick}
              >
                <FunnelIcon className="h-6 w-6" />
                <span className="ml-3">Filter</span>
              </button>
              <form className="max-w-xs mb-5">
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <MagnifyingGlassIcon className="h-6 w-6" />
                  </div>
                  <input
                    type="search"
                    name=""
                    id=""
                    className="block w-full py-2 px-4 ps-10 text-sm text-gray-900 bg-transparent border-b font-title font-extralight border-gray-300 rounded-t-lg focus:bg-gray-50 focus:outline-none focus:border-red-500"
                    placeholder="Search your plan"
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute font-title hidden end-2.5 bottom-2.5 bg-[#BB0A01] hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-500 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className="h-full w-full md:pl-5 grid md:grid-cols-4 md:gap-x-4 md:gap-y-2 grid-rows-none gap-y-1  overflow-y-auto">
              {planDisplay.map((plan, index) => (
                <a
                  key={index}
                  href={`/savings/plan/${plan.id}`}
                  className="h-fit"
                >
                  <PlanCard
                    id={plan.id}
                    label={plan.label}
                    startDate={plan.startDate}
                    endDate={plan.endDate}
                    target={plan.target}
                    progress={plan.progress}
                  />
                </a>
              ))}
            </div>
            <div
              id="filterbottomsheet"
              className={`fixed bottom-0 z-30 left-0 right-0 p-4 md:hidden border-4 rounded-t-lg border-red-500 bg-white shadow-md ${
                isOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
              style={{ transition: "transform 0.3s ease-in-out" }}
            >
              <div className="flex flex-col w-full ml-8 space-y-3 bottom-20">
                <div className="w-full block">
                  <input
                    type="checkbox"
                    name=""
                    id="all"
                    checked={selectedStatus === "all"}
                    onChange={() => handleCheckboxChange("all")}
                  />
                  <label htmlFor="all" className="font-title text-base ml-3">
                    All
                  </label>
                </div>
                <div className="w-full block">
                  <input
                    type="checkbox"
                    name=""
                    id="ongoing"
                    checked={selectedStatus === "ongoing"}
                    onChange={() => handleCheckboxChange("ongoing")}
                  />
                  <label
                    htmlFor="ongoing"
                    className="font-title text-base ml-3"
                  >
                    Ongoing
                  </label>
                </div>
                <div className="w-full block">
                  <input
                    type="checkbox"
                    name=""
                    id="incoming"
                    checked={selectedStatus === "incoming"}
                    onChange={() => handleCheckboxChange("incoming")}
                  />
                  <label
                    htmlFor="incoming"
                    className="font-title text-base ml-3"
                  >
                    Incoming
                  </label>
                </div>
                <div className="w-full block">
                  <input
                    type="checkbox"
                    name=""
                    id="completed"
                    checked={selectedStatus === "completed"}
                    onChange={() => handleCheckboxChange("completed")}
                  />
                  <label
                    htmlFor="completed"
                    className="font-title text-base ml-3"
                  >
                    Completed
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-fit z-20">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Plans;
