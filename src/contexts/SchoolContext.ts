import { createContext } from "react";

export const SchoolContext = createContext({
  school: "",
  setSchool: function withEvent(func: any): any {
    return (event: React.ChangeEvent<any>) => {
      const { target } = event;
      func(target.value);
    };
  },
});
