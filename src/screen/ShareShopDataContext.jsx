import React, { createContext, useState } from "react";
// import { table } from "../../table";

export const ShareShopDataContext = createContext();

export const ShareShopDataProvider = ({ children }) => {
  const [shopData, setShopData] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [newShopButton, setNewShopButton] = useState(true);
  return (
    <ShareShopDataContext.Provider
      value={{
        shopData,
        setShopData,
        selectedValue,
        setSelectedValue,
        newShopButton,
        setNewShopButton,
      }}
    >
      {children}
    </ShareShopDataContext.Provider>
  );
};
