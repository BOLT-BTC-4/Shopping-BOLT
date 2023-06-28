import React, { createContext, useState } from "react";
// import { table } from "../../table";

export const ShareShopDataContext = createContext();

export const ShareShopDataProvider = ({ children }) => {
  const [shopData, setShopData] = useState("");
  console.log("context", shopData);
  return (
    <ShareShopDataContext.Provider value={{ shopData, setShopData }}>
      {children}
    </ShareShopDataContext.Provider>
  );
};
