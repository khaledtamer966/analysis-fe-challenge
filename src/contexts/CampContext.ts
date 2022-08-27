import React, { createContext } from "react";

export const CampContext = createContext({
  camp: "",
  setCamp: function withEvent(func: any): any {
    return (event: React.ChangeEvent<any>) => {
      const { target } = event;
      func(target.value);
    };
  },
});
