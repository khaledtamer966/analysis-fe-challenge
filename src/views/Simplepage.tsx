import React, { useEffect, useState, SyntheticEvent } from "react";
import LineChart from "../components/LineChart/LineChart";
import Select from "../components/Select/Select";
import axios from "axios";
import swal from "sweetalert2";
import { months } from "../variables/general";
import { colors } from "../variables/general";

interface IChartData {
  camp: string;
  country: string;
  id: string;
  lessons: number;
  month: string;
  school: string;
  checked: string;
}

const Dashboard = () => {
  const [country, setCountry] = useState("");
  const [camp, setCamp] = useState("");
  const [school, setSchool] = useState("");
  const [countryOptions, setCountryOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [campOptions, setCampOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [schoolOptions, setSchoolOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [info, setInfo] = useState<IChartData[]>([]);
  const [ChosenIndex, setChosenIndex] = useState(-1);
  const [filteredInfoscrollbar, setFilteredInfoScrollbar] = useState<
    IChartData[]
  >([]);

  const [filteredInfo, setFilteredInfo] = useState<IChartData[]>([]);

  const removeStringDuplicateUsingFilter = (arr: Array<string>) => {
    let unique_array = arr.filter(
      (elem: string, index: number, self: Array<string>) => {
        return index == self.indexOf(elem);
      }
    );
    return unique_array;
  };
  const removeDuplicateOptionsUsingFilter = (
    obj: Array<{ value: string; label: string }>
  ) => {
    let uniquearray = obj.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t: { value: string; label: string }) => t.label === value.label
        )
    );
    return uniquearray;
  };
  const removeObjDuplicateUsingFilter = (obj: Array<IChartData>) => {
    let uniquearray = obj.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.country === value.country &&
            t.camp === value.camp &&
            t.month === value.month &&
            t.school === value.school
        )
    );
    return uniquearray;
  };
  const calculateSum = (arr: Array<number>) => {
    return arr.reduce((total: number, current: number) => {
      return total + current;
    }, 0);
  };
  const removeObjDuplicateUsingFilterbycountryandschool = (
    obj: Array<IChartData>
  ) => {
    let uniquearray = obj.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) => t.country === value.country && t.school === value.school
        )
    );
    return uniquearray;
  };

  useEffect(() => {
    swal.showLoading();
    axios
      .get(
        `https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json`
      )
      .then((res) => {
        //save full array
        setInfo(removeObjDuplicateUsingFilter(res.data));
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(res.data)
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(res.data)
        );
        //remove Duplicates in countries,camps,and schools
        let filteredCountryArr = removeStringDuplicateUsingFilter(
          res.data.map((record: IChartData) => record.country)
        );
        let filteredCampArr = removeStringDuplicateUsingFilter(
          res.data.map((record: IChartData) => record.camp)
        );
        let filteredSchoolArr = removeStringDuplicateUsingFilter(
          res.data.map((record: IChartData) => record.school)
        );
        let newCountryOptions: { value: string; label: string }[] =
          filteredCountryArr?.map((country: string) => {
            return {
              value: country,
              label: `${country}`,
            };
          });
        let newCampOptions: { value: string; label: string }[] =
          filteredCampArr?.map((camp: string) => {
            return {
              value: camp,
              label: `${camp}`,
            };
          });
        let newSchoolOptions: { value: string; label: string }[] =
          filteredSchoolArr?.map((school: string) => {
            return {
              value: school,
              label: `${school}`,
            };
          });
        setCountryOptions(newCountryOptions);
        setCampOptions(newCampOptions);
        setSchoolOptions(newSchoolOptions);
        swal.close();
      })
      .catch((e) => {
        swal.fire("Seasion Ends Please Resign In Again", "", "error");
      });
  }, []);
  const handleCountrySelect = (selectedOption: {
    value: string;
    label: string;
  }) => {
    if (selectedOption) {
      setCountry(selectedOption.label);
      if (camp !== "" && school !== "") {
        setCampOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(
              info?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.country === selectedOption.label &&
                  filtereditem.camp === camp &&
                  filtereditem.school === school
              )
            ).map((option: IChartData) => {
              return { value: option.camp, label: option.camp };
            })
          )
        );
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === selectedOption.label &&
                filtereditem.camp === camp &&
                filtereditem.school === school
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === selectedOption.label &&
                filtereditem.camp === camp &&
                filtereditem.school === school
            )
          )
        );
      } else if (camp !== "") {
        setCampOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(
              info?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.country === selectedOption.label &&
                  filtereditem.camp === camp
              )
            ).map((option: IChartData) => {
              return { value: option.camp, label: option.camp };
            })
          )
        );
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === selectedOption.label &&
                filtereditem.camp === camp
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === selectedOption.label &&
                filtereditem.camp === camp
            )
          )
        );
      } else if (school !== "") {
        setCampOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(
              info?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.country === selectedOption.label &&
                  filtereditem.camp === camp
              )
            ).map((option: IChartData) => {
              return { value: option.camp, label: option.camp };
            })
          )
        );
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === selectedOption.label &&
                filtereditem.school === school
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === selectedOption.label &&
                filtereditem.school === school
            )
          )
        );
      } else {
        setCampOptions(
          removeDuplicateOptionsUsingFilter(
            info
              ?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.country === selectedOption.label
              )
              .map((option: IChartData) => {
                return { value: option.camp, label: option.camp };
              })
          )
        );
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === selectedOption.label
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === selectedOption.label
            )
          )
        );
      }
    } else {
      setCountry("");
      if (camp !== "" && school !== "") {
        setCampOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(
              info?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.camp === camp && filtereditem.school === school
              )
            ).map((option: IChartData) => {
              return { value: option.camp, label: option.camp };
            })
          )
        );
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === camp && filtereditem.school === school
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === camp && filtereditem.school === school
            )
          )
        );
      } else if (camp !== "") {
        setCampOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(info).map(
              (option: IChartData) => {
                return { value: option.camp, label: option.camp };
              }
            )
          )
        );
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info?.filter(
              (filtereditem: IChartData) => filtereditem.camp === camp
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info?.filter(
              (filtereditem: IChartData) => filtereditem.camp === camp
            )
          )
        );
      } else if (school !== "") {
        setCampOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(
              info?.filter(
                (filtereditem: IChartData) => filtereditem.camp === camp
              )
            ).map((option: IChartData) => {
              return { value: option.camp, label: option.camp };
            })
          )
        );
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) => filtereditem.school === school
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) => filtereditem.school === school
            )
          )
        );
      } else {
        setCampOptions(
          removeDuplicateOptionsUsingFilter(
            info?.map((option: IChartData) => {
              return { value: option.camp, label: option.camp };
            })
          )
        );
        setFilteredInfo(removeObjDuplicateUsingFilterbycountryandschool(info));
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(info)
        );
      }
    }
  };
  console.log(filteredInfo, "filteredinfo");

  const handleSchoolSelect = (selectedOption: {
    value: string;
    label: string;
  }) => {
    if (selectedOption) {
      setSchool(selectedOption.label);
      if (camp !== "" && country !== "") {
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.school === selectedOption.label &&
                filtereditem.camp === camp &&
                filtereditem.country === country
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.school === selectedOption.label &&
                filtereditem.camp === camp &&
                filtereditem.country === country
            )
          )
        );
      } else if (camp !== "") {
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.school === selectedOption.label &&
                filtereditem.camp === camp
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.school === selectedOption.label &&
                filtereditem.camp === camp
            )
          )
        );
      } else if (country !== "") {
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.school === selectedOption.label &&
                filtereditem.country === country
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.school === selectedOption.label &&
                filtereditem.country === country
            )
          )
        );
      } else {
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.school === selectedOption.label
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.school === selectedOption.label
            )
          )
        );
      }
    } else {
      setSchool("");
      if (camp !== "" && country !== "") {
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === camp && filtereditem.country === country
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === camp && filtereditem.country === country
            )
          )
        );
      } else if (camp !== "") {
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) => filtereditem.camp === camp
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) => filtereditem.camp === camp
            )
          )
        );
      } else if (country !== "") {
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) => filtereditem.country === country
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) => filtereditem.country === country
            )
          )
        );
      } else {
        setFilteredInfo(removeObjDuplicateUsingFilterbycountryandschool(info));
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(info)
        );
      }
    }
  };
  const handleCampSelect = (
    selectedOption: {
      value: string;
      label: string;
    },
    selectedcountry: string
  ) => {
    if (selectedOption) {
      setCamp(selectedOption.label);
      if (country !== "" && school !== "") {
        setSchoolOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(
              info?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.camp === selectedOption.label &&
                  filtereditem.country === country &&
                  filtereditem.school === school
              )
            ).map((option: IChartData) => {
              return { value: option.school, label: option.school };
            })
          )
        );
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === selectedOption.label &&
                filtereditem.country === country &&
                filtereditem.school === school
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === selectedOption.label &&
                filtereditem.country === country &&
                filtereditem.school === school
            )
          )
        );
      } else if (country !== "") {
        setSchoolOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(
              info?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.camp === selectedOption.label &&
                  filtereditem.country === country
              )
            ).map((option: IChartData) => {
              return { value: option.school, label: option.school };
            })
          )
        );
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === selectedOption.label &&
                filtereditem.country === country
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === selectedOption.label &&
                filtereditem.country === country
            )
          )
        );
      } else if (school !== "") {
        setSchoolOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(
              info?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.camp === selectedOption.label &&
                  filtereditem.school === school
              )
            ).map((option: IChartData) => {
              return { value: option.school, label: option.school };
            })
          )
        );
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === selectedOption.label &&
                filtereditem.school === school
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === selectedOption.label &&
                filtereditem.school === school
            )
          )
        );
      } else {
        setSchoolOptions(
          removeDuplicateOptionsUsingFilter(
            info
              ?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.camp === selectedOption.label
              )
              .map((option: IChartData) => {
                return { value: option.school, label: option.school };
              })
          )
        );
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === selectedOption.label
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.camp === selectedOption.label
            )
          )
        );
      }
    } else {
      setCamp("");
      if (country !== "" && school !== "") {
        setSchoolOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(
              info?.filter(
                (filtereditem: IChartData) =>
                  filtereditem.country === country &&
                  filtereditem.school === school
              )
            ).map((option: IChartData) => {
              return { value: option.school, label: option.school };
            })
          )
        );
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === country &&
                filtereditem.school === school
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) =>
                filtereditem.country === country &&
                filtereditem.school === school
            )
          )
        );
      } else if (country !== "") {
        setSchoolOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(
              info?.filter(
                (filtereditem: IChartData) => filtereditem.country === country
              )
            ).map((option: IChartData) => {
              return { value: option.school, label: option.school };
            })
          )
        );
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) => filtereditem.country === country
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) => filtereditem.country === country
            )
          )
        );
      } else if (school !== "") {
        setSchoolOptions(
          removeDuplicateOptionsUsingFilter(
            removeObjDuplicateUsingFilterbycountryandschool(info).map(
              (option: IChartData) => {
                return { value: option.school, label: option.school };
              }
            )
          )
        );
        setFilteredInfo(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) => filtereditem.school === school
            )
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(
            info.filter(
              (filtereditem: IChartData) => filtereditem.school === school
            )
          )
        );
      } else {
        setSchoolOptions(
          removeDuplicateOptionsUsingFilter(
            info?.map((option: IChartData) => {
              return { value: option.school, label: option.school };
            })
          )
        );
        setFilteredInfo(removeObjDuplicateUsingFilterbycountryandschool(info));
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterbycountryandschool(info)
        );
      }
    }
  };
  const handleChange = (id: string) => {
    let index = filteredInfo?.findIndex((elem: IChartData) => elem.id === id);

    if (filteredInfo[index].checked) {
      console.log(index, "test");

      filteredInfo.splice(index, 1);
      setFilteredInfo(filteredInfo);
    } else {
      let indexscroll = filteredInfoscrollbar?.findIndex(
        (elem: IChartData) => elem.id === id
      );
      console.log(indexscroll, "test");
      filteredInfo.push(filteredInfoscrollbar[indexscroll]);
      setFilteredInfo(filteredInfo);
    }
  };
  console.log(filteredInfoscrollbar);
  return (
    <>
      <div
        className="w-95 m-2"
        style={{ flex: "display", justifyContent: "space-evenly" }}
      >
        <div
          className="row w-70"
          style={{
            color: "white",
            backgroundColor: "purple",
          }}
        >
          <h1 style={{ fontFamily: "Segoe UI", color: "white" }}>
            Analysis Chart
          </h1>
          <h3>Number of lessons</h3>
          <div
            className="w-70"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <div className="w-25">
              <label>Select Country</label>
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
                options={countryOptions}
                value={countryOptions.filter(
                  (op: { value: string; label: string }) => op.value == country
                )}
              />
            </div>
            <div className="w-25">
              <label>Select Camp</label>
              <Select
                onChange={(e: { value: string; label: string }) =>
                  handleCampSelect(e, country)
                }
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base: Array<string>) => ({
                    ...base,
                    zIndex: 9999,
                    color: "black",
                  }),
                }}
                options={campOptions}
                value={campOptions.filter(
                  (op: { value: string; label: string }) => op.value == camp
                )}
              />
            </div>
            <div className="w-25">
              <label>Select School</label>
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
                options={schoolOptions}
                value={schoolOptions.filter(
                  (op: { value: string; label: string }) => op.value == school
                )}
              />
            </div>
          </div>
        </div>
        <div className="row w-100 ">
          <span
            style={{ width: "75%", marginLeft: "5%", borderRight: "1px solid" }}
          >
            <LineChart
              labels={months?.map((month: string) => month)}
              datasets={filteredInfo?.map(
                (chartitem: IChartData, index: number) => {
                  return {
                    label: chartitem.school,
                    data: info
                      ?.filter((item: IChartData) => {
                        if (item.school == chartitem.school) {
                          return item.lessons;
                        }
                      })
                      ?.map((filteredelem: IChartData) => filteredelem.lessons),
                    backgroundColor: colors[index],
                  };
                }
              )}
            />
          </span>
          <span
            style={{
              backgroundColor: "white",
              width: "17%",
              maxHeight: "500px",
              overflowY: "scroll",
            }}
          >
            <h1>
              {calculateSum(
                filteredInfo?.map(
                  (filtereditem: IChartData) => filtereditem.lessons
                )
              )}
            </h1>
            <h1> lessons</h1>
            <p>
              in {school ? school : camp ? camp : country ? country : "Dataset"}
            </p>

            {filteredInfoscrollbar?.map(
              (filtereditem: IChartData, index: number) => {
                return (
                  <div style={{ color: `${colors[index]}` }}>
                    <span>
                      <input
                        style={{ borderRadius: "100%" }}
                        id={`${filtereditem.id}`}
                        name={`${filtereditem.id}`}
                        type="checkbox"
                        checked={
                          document
                            .getElementById(filtereditem.id)
                            ?.getAttribute("checked")
                            ? true
                            : false
                        }
                        autoComplete="off"
                        onChange={(e) => handleChange(filtereditem.id)}
                      />
                    </span>
                    <a href={`http://localhost/school/${filtereditem.id}`}>
                      <h1>{filtereditem.lessons}</h1> in {filtereditem.school}
                    </a>
                  </div>
                );
              }
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
