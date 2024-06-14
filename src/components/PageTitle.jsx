import { Link } from "react-router-dom";

const PageTitle = ({title}) => {
  return (
    <div className="w-full bg-neutral-800 flex justify-between items-center">
      <h1 className="text-4xl text-white text-start">
        {title ? title : "Bienvenue sur BonPlanJV"}
      </h1>
      <Link
        className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 transition-colors duration-200"
        to="/create-deal"
      >
        <i className="fa-solid fa-plus"></i>
      </Link>
    </div>
  );
}

export default PageTitle;
