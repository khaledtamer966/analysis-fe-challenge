import { useContext } from "react";
import Select from "../Select/Select copy";
import {
  removeObjDuplicateUsingFilterByCountryAndSchool,
  removeDuplicateOptionsUsingFilter,
} from "../../variables/general";
import { CampContext } from "../../contexts/CampContext";
import { CountryContext } from "../../contexts/CountryContext";
import { SchoolContext } from "../../contexts/SchoolContext";
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

function SchoolSelect(props: any) {
  const { school, setSchool } = useContext(SchoolContext);
  const { country } = useContext(CountryContext);
  const { camp } = useContext(CampContext);
  const handleSchoolSelect = (selectedOption: {
    value: string;
    label: string;
  }) => {
    let temparrinfo: Array<IChartData> = [];
    let temparrOptions: Array<{ value: string; label: string }> = [];
    if (selectedOption) {
      setSchool(selectedOption.value);
      if (selectedOption.value === "") {
        console.log(selectedOption.value, "value");
        temparrOptions = removeDuplicateOptionsUsingFilter(
          removeObjDuplicateUsingFilterByCountryAndSchool(props.info).map(
            (option: IChartData) => {
              return { value: option.school, label: option.school };
            }
          )
        );
        temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(
          props.info
        );
      } else {
        temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(
          props.info?.filter(
            (filtereditem: IChartData) =>
              filtereditem.school === selectedOption.value
          )
        );
        temparrOptions = removeDuplicateOptionsUsingFilter(
          removeObjDuplicateUsingFilterByCountryAndSchool(
            props.info?.filter(
              (filtereditem: IChartData) =>
                filtereditem.school === selectedOption.value
            )
          ).map((option: IChartData) => {
            return { value: option.school, label: option.school };
          })
        );
      }
    } else {
      console.log("showAll");
      setSchool("");
      temparrOptions = removeDuplicateOptionsUsingFilter(
        removeObjDuplicateUsingFilterByCountryAndSchool(props.info).map(
          (option: IChartData) => {
            return { value: option.school, label: option.school };
          }
        )
      );
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(props.info);
    }
    if (camp !== "") {
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(
        temparrinfo?.filter(
          (filtereditem: IChartData) => filtereditem.camp === camp
        )
      );
      temparrOptions = removeDuplicateOptionsUsingFilter(
        removeObjDuplicateUsingFilterByCountryAndSchool(
          temparrinfo?.filter(
            (filtereditem: IChartData) => filtereditem.camp === camp
          )
        ).map((option: IChartData) => {
          return { value: option.school, label: option.school };
        })
      );
    }
    if (country !== "") {
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(
        temparrinfo?.filter(
          (filtereditem: IChartData) => filtereditem.country === country
        )
      );
      temparrOptions = removeDuplicateOptionsUsingFilter(
        removeObjDuplicateUsingFilterByCountryAndSchool(
          temparrinfo?.filter(
            (filtereditem: IChartData) => filtereditem.country === country
          )
        ).map((option: IChartData) => {
          return { value: option.school, label: option.school };
        })
      );
    }
    temparrOptions.unshift({ value: "", label: "Show All" });
    props.setSchoolOptions(temparrOptions);
    props.setFilteredInfo(temparrinfo);
    props.setFilteredInfoScrollbar(temparrinfo);
  };
  return (
    <>
      <Select
        id={props.id}
        onChange={handleSchoolSelect}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base: Array<string>) => ({
            ...base,
            zIndex: 9999,
            color: "black",
          }),
        }}
        defaultValue={props.schoolOptions.filter(
          (op: { value: string; label: string }) => op.value === school
        )}
        options={props.schoolOptions}
        value={props.schoolOptions.filter(
          (op: { value: string; label: string }) => op.value === school
        )}
      />
    </>
  );
}
export default SchoolSelect;
