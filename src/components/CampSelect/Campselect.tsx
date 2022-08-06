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

function CampSelect(props: any) {
  let location = useLocation();
  console.log("filteredscrollbar", props.filteredInfoscrollbar);
  console.log("filteredinfo", props.filteredInfo);

  const handleCampSelect = (
    selectedOption: {
      value: string;
      label: string;
    },
    selectedcountry: string
  ) => {
    if (selectedOption) {
      props.setCamp(selectedOption.label);
      if (props.country !== undefined && props.school !== undefined) {
        props.setSchoolOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(
              props.info?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.camp === selectedOption.label &&
                  filtereditem.country === props.country &&
                  filtereditem.school === props.school
              )
            ).map((option: IChartData) => {
              return { value: option.school, label: option.school };
            })
          )
        );
        props.setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === selectedOption.label &&
                filtereditem.country === props.country &&
                filtereditem.school === props.school
            )
          )
        );
        props.setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === selectedOption.label &&
                filtereditem.country === props.country &&
                filtereditem.school === props.school
            )
          )
        );
      } else if (props.country !== undefined) {
        props.setSchoolOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(
              props.info?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.camp === selectedOption.label &&
                  filtereditem.country === props.country
              )
            ).map((option: IChartData) => {
              return { value: option.school, label: option.school };
            })
          )
        );
        props.setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === selectedOption.label &&
                filtereditem.country === props.country
            )
          )
        );
        props.setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === selectedOption.label &&
                filtereditem.country === props.country
            )
          )
        );
      } else if (props.school !== undefined) {
        props.setSchoolOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(
              props.info?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.camp === selectedOption.label &&
                  filtereditem.school === props.school
              )
            ).map((option: IChartData) => {
              return { value: option.school, label: option.school };
            })
          )
        );
        props.setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === selectedOption.label &&
                filtereditem.school === props.school
            )
          )
        );
        props.setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === selectedOption.label &&
                filtereditem.school === props.school
            )
          )
        );
      } else {
        props.setSchoolOptions(
          removeDuplicateOptionsUsingFilter(
            props.info
              ?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.camp === selectedOption.label
              )
              .map((option: IChartData) => {
                return { value: option.school, label: option.school };
              })
          )
        );
        props.setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === selectedOption.label
            )
          )
        );
        props.setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === selectedOption.label
            )
          )
        );
      }
    } else {
      props.setCamp("");
      if (props.country !== undefined && props.school !== undefined) {
        props.setSchoolOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(
              props.info?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.country === props.country &&
                  filtereditem.school === props.school
              )
            ).map((option: IChartData) => {
              return { value: option.school, label: option.school };
            })
          )
        );
        props.setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === props.country &&
                filtereditem.school === props.school
            )
          )
        );
        props.setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === props.country &&
                filtereditem.school === props.school
            )
          )
        );
      } else if (props.country !== undefined) {
        props.setSchoolOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(
              props.info?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.country === props.country
              )
            ).map((option: IChartData) => {
              return { value: option.school, label: option.school };
            })
          )
        );
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
      } else if (props.school !== undefined) {
        props.setSchoolOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(props.info).map(
              (option: IChartData) => {
                return { value: option.school, label: option.school };
              }
            )
          )
        );
        props.setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) => filtereditem.school === props.school
            )
          )
        );
        props.setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) => filtereditem.school === props.school
            )
          )
        );
      } else {
        console.log("i am here");
        props.setSchoolOptions(
          removeDuplicateOptionsUsingFilter(
            props.info?.map((option: IChartData) => {
              return { value: option.school, label: option.school };
            })
          )
        );
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
        onChange={(e: { value: string; label: string }) =>
          handleCampSelect(e, props.country)
        }
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
            op.value == location.search?.split("&")[1]?.split("=")[1]
        )}
        options={props.campOptions}
        value={props.campOptions.filter(
          (op: { value: string; label: string }) => op.value === props.camp
        )}
      />
    </>
  );
}
export default CampSelect;
