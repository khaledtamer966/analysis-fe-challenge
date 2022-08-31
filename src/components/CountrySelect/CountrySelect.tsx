import { useContext } from "react";
import Select from "@components/Select/Select";
import {
  removeDuplicateOptionsUsingFilter,
  removeObjDuplicateUsingFilterByCountryAndSchool,
} from "@variables/general";
import { CampContext } from "@context/CampContext";
import { CountryContext } from "@context/CountryContext";
import { SchoolContext } from "@context/SchoolContext";
interface IChartData {
  camp: string;
  country: string;
  id: string;
  lessons: number;
  month: string;
  school: string;
  checked: string;
  color: string;
}

function CountrySelect(props: any) {
  const { country, setCountry } = useContext(CountryContext);
  const { camp } = useContext(CampContext);
  const { school } = useContext(SchoolContext);

  const handleCountrySelect = (selectedOption: {
    value: string;
    label: string;
  }) => {
    let temparrinfo: Array<IChartData> = [];
    let temparrOptions: Array<{ value: string; label: string }> = [];
    if (selectedOption) {
      setCountry(selectedOption.label);
      console.log("country", country);

      temparrOptions = removeDuplicateOptionsUsingFilter(
        removeObjDuplicateUsingFilterByCountryAndSchool(
          props.info?.filter(
            (filtereditem: IChartData) =>
              filtereditem.country === selectedOption.label
          )
        ).map((option: IChartData) => {
          return { value: option.camp, label: option.camp };
        })
      );
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(
        props.info.filter(
          (filtereditem: IChartData) =>
            filtereditem.country === selectedOption.label
        )
      );
    } else {
      setCountry("");
      console.log("country", "");

      temparrOptions = removeDuplicateOptionsUsingFilter(
        removeObjDuplicateUsingFilterByCountryAndSchool(props.info).map(
          (option: IChartData) => {
            return { value: option.camp, label: option.camp };
          }
        )
      );
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(props.info);
    }
    if (camp !== "") {
      console.log("camp", typeof camp);
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(
        props.info.filter(
          (filtereditem: IChartData) => filtereditem.camp === camp
        )
      );
    }
    if (school !== "") {
      console.log("school", school);
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(
        props.info.filter(
          (filtereditem: IChartData) => filtereditem.school === school
        )
      );
    }
    console.log("array", temparrinfo);
    props.setFilteredInfo(temparrinfo);
    props.setCampOptions(temparrOptions);
    props.setFilteredInfoScrollbar(temparrinfo);
  };

  return (
    <>
      <Select
        id={props.id}
        onChange={handleCountrySelect}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base: Array<string>) => ({
            ...base,
            zIndex: 9999,
            color: "black",
          }),
        }}
        defaultValue={props.countryOptions?.filter(
          (op: { value: string; label: string }) => op.value === country
        )}
        options={props.countryOptions}
        value={props.countryOptions?.filter(
          (op: { value: string; label: string }) => op.value === country
        )}
      />
    </>
  );
}
export default CountrySelect;
