import React from "react";
import FavouriteYour from "./FavouriteYour";
import MostPopular from "./MostPopular";

const Sidebar = () => {
  return (
    <div className="md:col-span-2 h-full w-full space-y-5">
      <MostPopular />
      <FavouriteYour />
    </div>
  );
};

export default Sidebar;
