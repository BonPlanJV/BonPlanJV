import { Link } from "react-router-dom";

const PageTitle = ({ title }) => {
  return (
    <div className="w-full bg-neutral-800 flex justify-between items-center">
      <h1 className="text-4xl text-white text-start">
        {title ? title : "Bienvenue sur BonPlanJV"}
      </h1>
      <Link
        className="bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors duration-200 p-2"
        to="/create-deal"
      >
        <i className="fa-solid fa-plus w-6 h-6 rounded-full flex justify-center items-center"></i>
      </Link>
    </div>
  );
};

export default PageTitle;
