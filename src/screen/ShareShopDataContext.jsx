import React, { createContext, useState, useEffect } from "react";
import { table } from "../../table";
// import { table } from "../../table";

export const ShareShopDataContext = createContext();

export const ShareShopDataProvider = ({ children }) => {
  const [shopData, setShopData] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [newShopButton, setNewShopButton] = useState(true);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMenu, setSelectedMenu] = useState(table.defaultMenu);

  useEffect(() => {}, [newShopButton]);
  return (
    <ShareShopDataContext.Provider
      value={{
        shopData,
        setShopData,
        selectedValue,
        setSelectedValue,
        newShopButton,
        setNewShopButton,
        selectedDay,
        setSelectedDay,
        selectedMenu,
        setSelectedMenu,
      }}
    >
      {children}
    </ShareShopDataContext.Provider>
  );
};
