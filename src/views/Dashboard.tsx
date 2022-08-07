import React, { useEffect, useState, SyntheticEvent } from "react";
import LineChart from "../components/LineChart/LineChart";
import Select from "../components/Select/Select";
import axios from "axios";
import swal from "sweetalert2";
import { months } from "../variables/general";
import { colors } from "../variables/general";
import CountrySelect from "../components/CountrySelect/CountrySelect";
import CampSelect from "../components/CampSelect/Campselect";
import SchoolSelect from "../components/SchoolSelect/SchoolSelect";
import {
  removeStringDuplicateUsingFilter,
  removeObjDuplicateUsingFilter,
  calculateSum,
  removeObjDuplicateUsingFilterbycountryandschool,
} from "../variables/general";

import { useLocation } from "react-router-dom";
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
  let location = useLocation();
  const [country, setCountry] = useState<string>(
    location.search?.split("?")[1]?.split("=")[1]?.split("&")[0] !== ""
      ? location.search?.split("?")[1]?.split("=")[1]?.split("&")[0]
      : ""
  );
  const [camp, setCamp] = useState<string>(
    location.search?.split("&")[1]?.split("=")[1] !== ""
      ? location.search?.split("&")[1]?.split("=")[1]
      : ""
  );
  const [school, setSchool] = useState<string>(
    location.search?.split("&")[2]?.split("=")[1] !== ""
      ? location.search?.split("&")[2]?.split("=")[1]?.replaceAll("_", " ")
      : ""
  );
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
  const [checked, setChecked] = useState("true");

  const [ChosenIndex, setChosenIndex] = useState(-1);
  const [filteredInfoscrollbar, setFilteredInfoScrollbar] = useState<
    IChartData[]
  >([]);

  const [filteredInfo, setFilteredInfo] = useState<IChartData[]>([]);

  useEffect(() => {
    swal.showLoading();
    axios
      .get(
        `https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json`
      )
      .then((res) => {
        //save full array
        setInfo(removeObjDuplicateUsingFilter(res.data));

        location.search === ""
          ? setFilteredInfo(
              removeObjDuplicateUsingFilterbycountryandschool(res.data)
            )
          : location.search?.split("?")[1]?.split("=")[1]?.split("&")[0] &&
            location.search?.split("&")[1]?.split("=")[1] &&
            location.search?.split("&")[2]?.split("=")[1]
          ? setFilteredInfo(
              removeObjDuplicateUsingFilterbycountryandschool(
                res.data?.filter(
                  (filteredItem: IChartData) =>
                    filteredItem.country ===
                      location.search
                        ?.split("?")[1]
                        ?.split("=")[1]
                        ?.split("&")[0] &&
                    filteredItem.camp ===
                      location.search?.split("&")[1]?.split("=")[1] &&
                    filteredItem.school ===
                      location.search
                        ?.split("&")[2]
                        ?.split("=")[1]
                        ?.replaceAll("_", " ")
                )
              )
            )
          : location.search?.split("&")[1]?.split("=")[1] &&
            location.search?.split("&")[2]?.split("=")[1]
          ? setFilteredInfo(
              removeObjDuplicateUsingFilterbycountryandschool(
                res.data?.filter(
                  (filteredItem: IChartData) =>
                    filteredItem.camp ===
                      location.search?.split("&")[1]?.split("=")[1] &&
                    filteredItem.school ===
                      location.search
                        ?.split("&")[2]
                        ?.split("=")[1]
                        ?.replaceAll("_", " ")
                )
              )
            )
          : location.search === ""
          ? setFilteredInfoScrollbar(
              removeObjDuplicateUsingFilterbycountryandschool(res.data)
            )
          : setFilteredInfoScrollbar(
              removeObjDuplicateUsingFilterbycountryandschool(
                res.data?.filter(
                  (filteredItem: IChartData) =>
                    filteredItem.country ===
                      location.search
                        ?.split("?")[1]
                        ?.split("=")[1]
                        ?.split("&")[0] &&
                    filteredItem.camp ===
                      location.search?.split("&")[1]?.split("=")[1] &&
                    filteredItem.school ===
                      location.search
                        ?.split("&")[2]
                        ?.split("=")[1]
                        ?.replaceAll("_", " ")
                )
              )
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

  const handleChange = (id: string, status: string) => {
    let indexinfo = filteredInfo?.findIndex(
      (elem: IChartData) => elem.id === id
    );
    let scrollindex = filteredInfoscrollbar?.findIndex(
      (elem: IChartData) => elem.id === id
    );
    filteredInfoscrollbar[scrollindex].checked = status;
    console.log("test", filteredInfoscrollbar);
    setFilteredInfoScrollbar(filteredInfoscrollbar);
  };
  console.log("filtededddd", filteredInfoscrollbar);
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
              {countryOptions.length !== 0 ? (
                <CountrySelect
                  camp={camp}
                  school={school}
                  setCountry={(country: string) => setCountry(country)}
                  country={country}
                  countryOptions={countryOptions}
                  info={info}
                  setFilteredInfo={(filteredInfo: Array<IChartData>) =>
                    setFilteredInfo(filteredInfo)
                  }
                  filteredInfoscrollbar={filteredInfoscrollbar}
                  filteredInfo={filteredInfo}
                  setFilteredInfoScrollbar={(
                    filteredInfoscrollbar: Array<IChartData>
                  ) => setFilteredInfoScrollbar(filteredInfoscrollbar)}
                  setCampOptions={(
                    campOptions: Array<{ value: string; label: string }>
                  ) => setCampOptions(campOptions)}
                  campOptions={campOptions}
                />
              ) : null}
            </div>
            <div className="w-25">
              <label>Select Camp</label>
              {campOptions.length !== 0 ? (
                <CampSelect
                  camp={camp}
                  school={school}
                  setCamp={(camp: string) => setCamp(camp)}
                  country={country}
                  SchoolOptions={schoolOptions}
                  info={info}
                  setFilteredInfo={(filteredInfo: Array<IChartData>) =>
                    setFilteredInfo(filteredInfo)
                  }
                  filteredInfoscrollbar={filteredInfoscrollbar}
                  filteredInfo={filteredInfo}
                  setFilteredInfoScrollbar={(
                    filteredInfoscrollbar: Array<IChartData>
                  ) => setFilteredInfoScrollbar(filteredInfoscrollbar)}
                  setSchoolOptions={(
                    SchoolOptions: Array<{ value: string; label: string }>
                  ) => setSchoolOptions(SchoolOptions)}
                  campOptions={campOptions}
                />
              ) : null}
            </div>
            <div className="w-25">
              <label>Select School</label>
              {schoolOptions.length !== 0 ? (
                <SchoolSelect
                  camp={camp}
                  school={school}
                  setSchool={(school: string) => setSchool(school)}
                  country={country}
                  schoolOptions={schoolOptions}
                  info={info}
                  setFilteredInfo={(filteredInfo: Array<IChartData>) =>
                    setFilteredInfo(filteredInfo)
                  }
                  filteredInfoscrollbar={filteredInfoscrollbar}
                  filteredInfo={filteredInfo}
                  setFilteredInfoScrollbar={(
                    filteredInfoscrollbar: Array<IChartData>
                  ) => setFilteredInfoScrollbar(filteredInfoscrollbar)}
                  setSchoolOptions={(
                    SchoolOptions: Array<{ value: string; label: string }>
                  ) => setSchoolOptions(SchoolOptions)}
                  campOptions={campOptions}
                />
              ) : null}
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
                  <div
                    style={{
                      color: `${colors[index]}`,
                      display: "flex",
                    }}
                  >
                    {filtereditem?.checked === "true" ? (
                      <span
                        style={{
                          margin: "15px",
                          width: "10px",
                          height: "10px",
                          backgroundColor: `#fff`,
                          border: "1px solid #000",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                        id={`${filtereditem.id}`}
                        onClick={() => {
                          handleChange(filtereditem.id, "true");
                        }}
                      ></span>
                    ) : (
                      <span
                        style={{
                          margin: "15px",
                          width: "10px",
                          height: "10px",
                          backgroundColor: `${colors[index]}`,
                          border: "1px solid #000",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                        id={`${filtereditem.id}`}
                        onClick={() => {
                          handleChange(filtereditem.id, "false");
                        }}
                      ></span>
                    )}

                    <a
                      style={{ color: `${colors[index]}` }}
                      href={`http://localhost:3000/school/${
                        filtereditem.id
                      }?countryvalue=${country}&campvalue=${camp}&schoolvalue=${school?.replaceAll(
                        " ",
                        "_"
                      )}&filtedarr=${JSON.stringify(filteredInfo)}`}
                    >
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
