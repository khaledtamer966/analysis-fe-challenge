import Select from "../Select/Select";
import { removeObjDuplicateUsingFilterByCountryAndSchool } from "../../variables/general";
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
  let params = new URLSearchParams(window.location.search);
  const handleSchoolSelect = (selectedOption: {
    value: string;
    label: string;
  }) => {
    let temparrinfo: Array<IChartData> = [];
    if (selectedOption) {
      window.history.pushState(
        {},
        "",
        `http://localhost:3000?countryvalue=${params.get(
          "countryvalue"
        )}&campvalue=${params.get(
          "campvalue"
        )}&schoolvalue=${selectedOption.label?.replaceAll(" ", "_")}`
      );

      console.log(params.get("schoolvalue"));
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(
        props.info?.filter(
          (filtereditem: IChartData) =>
            filtereditem.school === selectedOption.label
        )
      );
    } else {
      window.history.pushState(
        {},
        "",
        `http://localhost:3000?countryvalue=${params.get(
          "countryvalue"
        )}&campvalue=${params.get("campvalue")}&schoolvalue=`
      );

      console.log(params.get("schoolvalue"));
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(props.info);
    }
    if (params.get("campvalue")) {
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(
        temparrinfo?.filter(
          (filtereditem: IChartData) =>
            filtereditem.camp === params.get("campvalue")
        )
      );
    }
    if (params.get("countryvalue")) {
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(
        temparrinfo?.filter(
          (filtereditem: IChartData) =>
            filtereditem.country === params.get("countryvalue")
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
          (op: { value: string; label: string }) =>
            op.value === params.get("schoolvalue")?.replaceAll("_", " ")
        )}
        options={props.schoolOptions}
        value={props.schoolOptions.filter(
          (op: { value: string; label: string }) =>
            op.value === params.get("schoolvalue")?.replaceAll("_", " ")
        )}
      />
    </>
  );
}
export default SchoolSelect;
