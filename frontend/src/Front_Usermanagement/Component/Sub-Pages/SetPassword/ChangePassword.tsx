import "./SetPassword.css";
import { useTranslation } from "react-i18next";

export default function ChangePassword() {
const { t } = useTranslation();
  return (
    <section className="bg-white w-full h-full lg:w-[28vw] lg:h-[90vh] dark:bg-gray-900 lg:rounded-xl p-4">
      <div className="">
        <div className=" max-w-2xl mx-auto lg:w-4/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 text-center mt-3 capitalize dark:text-white">
            {t("usermanagement.passwordManagement.title2")}
            </h1>

            <p className="mt-4 text-gray-500 dark:text-gray-400 text-center"></p>

            <form className="gap-6 mt-8 ">
              <div>
                <label className="block mb-2 text-sm mt-3 ">
                  {" "}
                  {t("usermanagement.password.labelConfirmPassword")}
                </label>
                <input
                  type="password"
                  placeholder={t("usermanagement.signin.placeHolderPassword")}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm mt-3 ">{t("usermanagement.signin.labelPassword")}</label>
                <input
                  type="password"
                  placeholder={t("usermanagement.signin.placeHolderPassword")}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm mt-3 ">
                {t("usermanagement.signin.labelConfirmPassword")}
                </label>
                <input
                  type="password"
                  placeholder={t("usermanagement.signin.placeHolderConfirmPassword")}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <button className="flex items-center justify-center w-full mt-10 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50">
                <span className="text-center">{t("usermanagement.passwordManagement.saveButton")} </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
