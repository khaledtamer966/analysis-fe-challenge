import { useContext } from "react";
import Select from "@components/Select/Select";
import { removeObjDuplicateUsingFilterByCountryAndSchool } from "@variables/general";
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
    if (selectedOption) {
      setSchool(selectedOption.label);

      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(
        props.info?.filter(
          (filtereditem: IChartData) =>
            filtereditem.school === selectedOption.label
        )
      );
    } else {
      setSchool("");

      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(props.info);
    }
    if (camp !== "") {
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(
        temparrinfo?.filter(
          (filtereditem: IChartData) => filtereditem.camp === camp
        )
      );
    }
    if (country !== "") {
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(
        temparrinfo?.filter(
          (filtereditem: IChartData) => filtereditem.country === country
        )
      );
    }

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
