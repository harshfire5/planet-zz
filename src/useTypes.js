import {useCallback} from "react";

const types = {
  aerial: "Aerial Adventures",
  aqua: "Aqua Escapades",
  land: "Land Lifestyles"
}
const useTypes = (type) => {
  const isRightType = useCallback(() => {
    return type && types.hasOwnProperty(type);
  }, [type]);
  return {types, isRightType}
}

export default useTypes;