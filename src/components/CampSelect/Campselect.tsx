import Select from "../Select/Select";
import {
  removeDuplicateOptionsUsingFilter,
  removeObjDuplicateUsingFilterByCountryAndSchool,
} from "../../variables/general";
interface IChartData {
  camp: string;
  country: string;
  id: string;
  lessons: number;
  month: string;
  school: string;
  checked: string;
}

function CampSelect(props: any) {
  let params = new URLSearchParams(window.location.search);
  const handleCampSelect = (selectedOption: {
    value: string;
    label: string;
  }) => {
    let temparrinfo: Array<IChartData> = [];
    let temparrOptions: Array<{ value: string; label: string }> = [];
    console.log("selectedOption", selectedOption);
    if (selectedOption) {
      window.history.pushState(
        {},
        "",
        `http://localhost:3000?countryvalue=${params.get(
          "countryvalue"
        )}&campvalue=${selectedOption.label}&schoolvalue=${params.get(
          "schoolvalue"
        )}`
      );

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
      console.log("data camp", temparrinfo);
    } else {
      window.history.pushState(
        {},
        "",
        `http://localhost:3000?countryvalue=${params.get(
          "countryvalue"
        )}&campvalue=&schoolvalue=${params.get("schoolvalue")}`
      );

      temparrOptions = removeDuplicateOptionsUsingFilter(
        removeObjDuplicateUsingFilterByCountryAndSchool(props.info).map(
          (option: IChartData) => {
            return { value: option.school, label: option.school };
          }
        )
      );
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(props.info);
    }
    if (params.get("countryvalue")) {
      console.log("camp country", params.get("countryvalue"));
      temparrOptions = removeDuplicateOptionsUsingFilter(
        removeObjDuplicateUsingFilterByCountryAndSchool(
          temparrinfo?.filter(
            (filtereditem: IChartData) =>
              filtereditem.country === params.get("countryvalue")
          )
        ).map((option: IChartData) => {
          return { value: option.school, label: option.school };
        })
      );
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(
        temparrinfo?.filter(
          (filtereditem: IChartData) =>
            filtereditem.country === params.get("countryvalue")
        )
      );
    }
    if (params.get("schoolvalue")) {
      console.log("camp school", params.get("schoolvalue"));

      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(
        temparrinfo?.filter(
          (filtereditem: IChartData) =>
            filtereditem.school ===
            params.get("schoolvalue")?.replaceAll("_", " ")
        )
      );
    }
    console.log("data", temparrinfo);
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
          (op: { value: string; label: string }) =>
            op.value === params.get("campvalue")
        )}
        options={props.campOptions}
        value={props.campOptions.filter(
          (op: { value: string; label: string }) =>
            op.value === params.get("campvalue")
        )}
      />
    </>
  );
}
export default CampSelect;
