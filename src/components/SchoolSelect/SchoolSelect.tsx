import React, { useEffect, useState } from "react";
import Select from "../Select/Select";
import { useLocation } from "react-router-dom";
import {
  removeDuplicateOptionsUsingFilter,
  removeObjDuplicateUsingFilterbycountryandschool,
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

function SchoolSelect(props: any) {
  let location = useLocation();
  console.log("filteredscrollbar", props.filteredInfoscrollbar);
  console.log("filteredinfo", props.filteredInfo);

  const handleSchoolSelect = (selectedOption: {
    value: string;
    label: string;
  }) => {
    if (selectedOption) {
      props.setSchool(selectedOption.label);
      if (props.camp !== undefined && props.country !== undefined) {
        props.setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.school === selectedOption.label &&
                filtereditem.camp === props.camp &&
                filtereditem.country === props.country
            )
          )
        );
        props.setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.school === selectedOption.label &&
                filtereditem.camp === props.camp &&
                filtereditem.country === props.country
            )
          )
        );
      } else if (props.camp !== undefined) {
        props.setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.school === selectedOption.label &&
                filtereditem.camp === props.camp
            )
          )
        );
        props.setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.school === selectedOption.label &&
                filtereditem.camp === props.camp
            )
          )
        );
      } else if (props.country !== undefined) {
        props.setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.school === selectedOption.label &&
                filtereditem.country === props.country
            )
          )
        );
        props.setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.school === selectedOption.label &&
                filtereditem.country === props.country
            )
          )
        );
      } else {
        props.setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.school === selectedOption.label
            )
          )
        );
        props.setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.school === selectedOption.label
            )
          )
        );
      }
    } else {
      props.setSchool("");
      if (props.camp !== undefined && props.country !== undefined) {
        props.setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === props.camp &&
                filtereditem.country === props.country
            )
          )
        );
        props.setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === props.camp &&
                filtereditem.country === props.country
            )
          )
        );
      } else if (props.camp !== undefined) {
        props.setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) => filtereditem.camp === props.camp
            )
          )
        );
        props.setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) => filtereditem.camp === props.camp
            )
          )
        );
      } else if (props.country !== undefined) {
        props.setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === props.country
            )
          )
        );
        props.setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === props.country
            )
          )
        );
      } else {
        props.setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(props.info)
        );
        props.setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(props.info)
        );
      }
    }
  };
  return (
    <>
      <Select
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
            op.value ==
            location.search?.split("&")[2]?.split("=")[1]?.replaceAll("_", " ")
        )}
        options={props.schoolOptions}
        value={props.schoolOptions.filter(
          (op: { value: string; label: string }) => op.value === props.school
        )}
      />
    </>
  );
}
export default SchoolSelect;
