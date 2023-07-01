import React, { createContext, useState, useEffect } from "react";
import { table } from "../../table";
import { createShopAPI, fetchShopAPI } from "../boltAPI";

export const ShareShopDataContext = createContext();

export const ShareShopDataProvider = ({ children }) => {
  console.log("===== comp_ShareShopDataContext =====");

  // お店の一覧を取得
  const getAllShop = async () => {
    const initShopData = await fetchShopAPI();
    //ドロップダウンで利用できるようにオブジェクトキー変更
    const arrayDropDown = initShopData.map((item) => {
      return { key: item.id, value: item.shop, corner: item.corner };
    });
    setShopData(initShopData);
    setShopDataDrop(arrayDropDown);
  };

  const [shopData, setShopData] = useState([]);
  const [shopDataDrop, setShopDataDrop] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [newShopButton, setNewShopButton] = useState(true);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMenu, setSelectedMenu] = useState(table.defaultMenu);
  const [addFlag, setAddFlag] = useState(false);
  const [items, setItems] = useState([]);
  console.log("shopData:", shopData);

  useEffect(() => {
    getAllShop();
  }, []);
  return (
    <ShareShopDataContext.Provider
      value={{
        shopData,
        setShopData,
        shopDataDrop,
        setShopDataDrop,
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
