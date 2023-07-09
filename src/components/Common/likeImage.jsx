import { AntDesign } from "@expo/vector-icons";

// Like★★★イメージを作成
export const likeImage = (like) => {
  if (like === 1) {
    return (
      <>
        <AntDesign name="star" size={10} color="#B45817" />
        <AntDesign name="staro" size={10} color="#B45817" />
        <AntDesign name="staro" size={10} color="#B45817" />
      </>
    );
  } else if (like === 2) {
    return (
      <>
        <AntDesign name="star" size={10} color="#B45817" />
        <AntDesign name="star" size={10} color="#B45817" />
        <AntDesign name="staro" size={10} color="#B45817" />
      </>
    );
  } else if (like === 3) {
    return (
      <>
        <AntDesign name="star" size={10} color="#B45817" />
        <AntDesign name="star" size={10} color="#B45817" />
        <AntDesign name="star" size={10} color="#B45817" />
      </>
    );
  } else {
    return (
      <>
        <AntDesign name="staro" size={10} color="#B45817" />
        <AntDesign name="staro" size={10} color="#B45817" />
        <AntDesign name="staro" size={10} color="#B45817" />
      </>
    );
  }
};
