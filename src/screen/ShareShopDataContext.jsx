import React, { createContext, useState, useEffect } from "react";
import { table } from "../../table";
import { createShopAPI, fetchShopAPI } from "../boltAPI";

export const ShareShopDataContext = createContext();

export const ShareShopDataProvider = ({ children }) => {
  console.log("===== comp_ShareShopDataContext =====");

  // お店の一覧を取得
  const initShop = async () => {
    const initShopData = await fetchShopAPI();
    setShopData(initShopData);
  };

  const [shopData, setShopData] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [newShopButton, setNewShopButton] = useState(true);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMenu, setSelectedMenu] = useState(table.defaultMenu);
  const [addFlag, setAddFlag] = useState(false);
  const [items, setItems] = useState([]);
  console.log("shopData:", shopData);

  useEffect(() => {
    initShop();
  }, []);
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
        addFlag,
        setAddFlag,
        items,
        setItems,
      }}
    >
      {children}
    </ShareShopDataContext.Provider>
  );
};
