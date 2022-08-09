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

function CountrySelect(props: any) {
  let location = useLocation();

  const handleCountrySelect = (selectedOption: {
    value: string;
    label: string;
  }) => {
    if (selectedOption) {
      props.setCountry(selectedOption.label);
      if (props.camp !== undefined && props.school !== undefined) {
        props.setCampOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(
              props.info?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.country === selectedOption.label &&
                  filtereditem.camp === props.camp &&
                  filtereditem.school === props.school
              )
            ).map((option: IChartData) => {
              return { value: option.camp, label: option.camp };
            })
          )
        );
        props.setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === selectedOption.label &&
                filtereditem.camp === props.camp &&
                filtereditem.school === props.school
            )
          )
        );
        props.setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === selectedOption.label &&
                filtereditem.camp === props.camp &&
                filtereditem.school === props.school
            )
          )
        );
      } else if (props.camp !== undefined) {
        props.setCampOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(
              props.info?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.country === selectedOption.label &&
                  filtereditem.camp === props.camp
              )
            ).map((option: IChartData) => {
              return { value: option.camp, label: option.camp };
            })
          )
        );
        props.setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === selectedOption.label &&
                filtereditem.camp === props.camp
            )
          )
        );
        props.setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === selectedOption.label &&
                filtereditem.camp === props.camp
            )
          )
        );
      } else if (props.school !== undefined) {
        props.setCampOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(
              props.info?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.country === selectedOption.label &&
                  filtereditem.camp === props.camp
              )
            ).map((option: IChartData) => {
              return { value: option.camp, label: option.camp };
            })
          )
        );
        props.setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === selectedOption.label &&
                filtereditem.school === props.school
            )
          )
        );
        props.setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === selectedOption.label &&
                filtereditem.school === props.school
            )
          )
        );
      } else {
        props.setCampOptions(
          removeDuplicateOptionsUsingFilter(
            props.info
              ?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.country === selectedOption.label
              )
              .map((option: IChartData) => {
                return { value: option.camp, label: option.camp };
              })
          )
        );
        props.setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === selectedOption.label
            )
          )
        );
        props.setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === selectedOption.label
            )
          )
        );
      }
    } else {
      props.setCountry(undefined);
      if (props.camp !== undefined && props.school !== undefined) {
        props.setCampOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(
              props.info?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.camp === props.camp &&
                  filtereditem.school === props.school
              )
            ).map((option: IChartData) => {
              return { value: option.camp, label: option.camp };
            })
          )
        );
        props.setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === props.camp &&
                filtereditem.school === props.school
            )
          )
        );
        props.setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === props.camp &&
                filtereditem.school === props.school
            )
          )
        );
      } else if (props.camp !== undefined) {
        props.setCampOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(props.info).map(
              (option: IChartData) => {
                return { value: option.camp, label: option.camp };
              }
            )
          )
        );
        props.setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info?.filter(
              (filtereditem: IChartData) => filtereditem.camp === props.camp
            )
          )
        );
        props.setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            props.info?.filter(
              (filtereditem: IChartData) => filtereditem.camp === props.camp
            )
          )
        );
      } else if (props.school !== undefined) {
        props.setCampOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(
              props.info?.filter(
                (filtereditem: IChartData) => filtereditem.camp === props.camp
              )
            ).map((option: IChartData) => {
              return { value: option.camp, label: option.camp };
            })
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
        console.log(
          "i am here",
          removeDuplicateOptionsUsingFilter(
            props.info?.map((option: IChartData) => {
              return { value: option.camp, label: option.camp };
            })
          )
        );
        props.setCampOptions(
          removeDuplicateOptionsUsingFilter(
            props.info?.map((option: IChartData) => {
              return { value: option.camp, label: option.camp };
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
            op.value ==
            location.search?.split("?")[1]?.split("=")[1]?.split("&")[0]
        )}
        options={props.countryOptions}
        value={props.countryOptions.filter(
          (op: { value: string; label: string }) =>
            op.value === props.country ||
            op.value ==
              location.search?.split("?")[1]?.split("=")[1]?.split("&")[0]
        )}
      />
    </>
  );
}
export default CountrySelect;
