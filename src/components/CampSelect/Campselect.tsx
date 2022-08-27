import { useContext } from "react";
import Select from "@components/Select/Select";
import {
  removeDuplicateOptionsUsingFilter,
  removeObjDuplicateUsingFilterByCountryAndSchool,
} from "@variables/general";
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

function CampSelect(props: any) {
  const { camp, setCamp } = useContext(CampContext);
  const { country } = useContext(CountryContext);
  const { school } = useContext(SchoolContext);
  const handleCampSelect = (selectedOption: {
    value: string;
    label: string;
  }) => {
    let temparrinfo: Array<IChartData> = [];
    let temparrOptions: Array<{ value: string; label: string }> = [];
    if (selectedOption) {
      setCamp(selectedOption.label);

      temparrOptions = removeDuplicateOptionsUsingFilter(
        removeObjDuplicateUsingFilterByCountryAndSchool(
          props.info?.filter(
            (filtereditem: IChartData) =>
              filtereditem.camp === selectedOption.label
          )
        ).map((option: IChartData) => {
          return { value: option.school, label: option.school };
        })
      );
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(
        props.info?.filter(
          (filtereditem: IChartData) =>
            filtereditem.camp === selectedOption.label
        )
      );
    } else {
      setCamp("");

      temparrOptions = removeDuplicateOptionsUsingFilter(
        removeObjDuplicateUsingFilterByCountryAndSchool(props.info).map(
          (option: IChartData) => {
            return { value: option.school, label: option.school };
          }
        )
      );
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(props.info);
    }
    if (country !== "") {
      temparrOptions = removeDuplicateOptionsUsingFilter(
        removeObjDuplicateUsingFilterByCountryAndSchool(
          temparrinfo?.filter(
            (filtereditem: IChartData) => filtereditem.country === country
          )
        ).map((option: IChartData) => {
          return { value: option.school, label: option.school };
        })
      );
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(
        temparrinfo?.filter(
          (filtereditem: IChartData) => filtereditem.country === country
        )
      );
    }
    if (school !== "") {
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(
        temparrinfo?.filter(
          (filtereditem: IChartData) => filtereditem.school === school
        )
      );
    }

    props.setFilteredInfo(temparrinfo);
    props.setSchoolOptions(temparrOptions);
    props.setFilteredInfoScrollbar(temparrinfo);
  };
  return (
    <>
      <Select
        id={props.id}
        onChange={handleCampSelect}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base: Array<string>) => ({
            ...base,
            zIndex: 9999,
            color: "black",
          }),
        }}
        defaultValue={props.campOptions.filter(
          (op: { value: string; label: string }) => op.value === camp
        )}
        options={props.campOptions}
        value={props.campOptions.filter(
          (op: { value: string; label: string }) => op.value === camp
        )}
      />
    </>
  );
}
export default CampSelect;
