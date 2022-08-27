import React, { createContext } from "react";

export const CountryContext = createContext({
  country: "",
  setCountry: function withEvent(func: any): any {
    return (event: React.ChangeEvent<any>) => {
      const { target } = event;
      func(target.value);
    };
  },
});
