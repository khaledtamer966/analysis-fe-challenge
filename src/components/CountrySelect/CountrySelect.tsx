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
  color: string;
}

function CountrySelect(props: any) {
  let params = new URLSearchParams(window.location.search);

  const handleCountrySelect = (selectedOption: {
    value: string;
    label: string;
  }) => {
    let temparrinfo: Array<IChartData> = [];
    let temparrOptions: Array<{ value: string; label: string }> = [];
    if (selectedOption) {
      window.history.pushState(
        {},
        "",
        `http://localhost:3000?countryvalue=${
          selectedOption.label
        }&campvalue=${params.get("campvalue")}&schoolvalue=${params.get(
          "schoolvalue"
        )}`
      );

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
      window.history.pushState(
        {},
        "",
        `http://localhost:3000?countryvalue=&campvalue=${params.get(
          "campvalue"
        )}&schoolvalue=${params.get("schoolvalue")}`
      );

      temparrOptions = removeDuplicateOptionsUsingFilter(
        removeObjDuplicateUsingFilterByCountryAndSchool(props.info).map(
          (option: IChartData) => {
            return { value: option.camp, label: option.camp };
          }
        )
      );
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(props.info);
    }
    if (params.get("campvalue")) {
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(
        props.info.filter(
          (filtereditem: IChartData) =>
            filtereditem.camp === params.get("campvalue")
        )
      );
    }
    if (params.get("schoolvalue")) {
      temparrinfo = removeObjDuplicateUsingFilterByCountryAndSchool(
        props.info.filter(
          (filtereditem: IChartData) =>
            filtereditem.school ===
            params.get("schoolvalue")?.replaceAll("_", " ")
        )
      );
    }

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
        defaultValue={props.countryOptions.filter(
          (op: { value: string; label: string }) =>
            op.value === params.get("countryvalue")
        )}
        options={props.countryOptions}
        value={props.countryOptions.filter(
          (op: { value: string; label: string }) =>
            op.value === params.get("countryvalue")
        )}
      />
    </>
  );
}
export default CountrySelect;
