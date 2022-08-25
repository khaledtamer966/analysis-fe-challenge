import React, { useEffect, useState } from "react";
import LineChart from "../components/LineChart/LineChart";
import axios from "axios";
import swal from "sweetalert2";
import CountrySelect from "../components/CountrySelect/CountrySelect";
import CampSelect from "../components/CampSelect/CampSelect";
import SchoolSelect from "../components/SchoolSelect/SchoolSelect";
import {
  removeStringDuplicateUsingFilter,
  removeObjDuplicateUsingFilter,
  calculateSum,
  removeObjDuplicateUsingFilterByCountryAndSchool,
  getValuesCorrectlyFromURLForChart,
  colors,
  months,
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

  const [filteredInfoscrollbar, setFilteredInfoScrollbar] = useState<
    IChartData[]
  >([]);

  const [filteredInfo, setFilteredInfo] = useState<IChartData[]>([]);
  let params = new URLSearchParams(window.location.search);
  console.log(window.location.search, "search");
  useEffect(() => {
    swal.showLoading();
    axios
      .get(
        `https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json`
      )
      .then((res) => {
        //save full array
        setInfo(removeObjDuplicateUsingFilter(res.data));
        if (window.location.href.search("countryvalue") === -1) {
          window.history.pushState(
            {},
            "",
            `http://localhost:3000?countryvalue=&campvalue=&schoolvalue=`
          );
        }

        setFilteredInfo(
          removeObjDuplicateUsingFilterByCountryAndSchool(
            getValuesCorrectlyFromURLForChart(
              params.get("countryvalue") ?? "",
              params.get("campvalue") ?? "",
              params.get("schoolvalue") ?? "",
              res.data,
              location.search
            ) ?? []
          )
        );
        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterByCountryAndSchool(
            getValuesCorrectlyFromURLForChart(
              params.get("countryvalue") ?? "",
              params.get("campvalue") ?? "",
              params.get("schoolvalue")?.replaceAll("_", " ") ?? "",
              res.data,
              location.search
            ) ?? []
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
    let tempinfo = [...filteredInfo];
    let tempscrollbar = [...filteredInfoscrollbar];
    let indexinfo = filteredInfo?.findIndex(
      (elem: IChartData) => elem.id === id
    );
    let scrollindex = tempscrollbar?.findIndex(
      (elem: IChartData) => elem.id === id
    );
    status === "true"
      ? tempinfo.splice(indexinfo, 1)
      : tempinfo.push(tempscrollbar[scrollindex]);

    setFilteredInfo(tempinfo);
    tempscrollbar[scrollindex].checked = status;
    setFilteredInfoScrollbar(tempscrollbar);
  };
  return (
    <>
      <div className="col-md-12">
        <div
          className="col-md-12"
          style={{
            color: "white",
            backgroundColor: "purple",
          }}
        >
          <h1
            style={{
              fontSize: "4vw",
              fontFamily: "Segoe UI",
              color: "white",
              marginLeft: "2%",
            }}
          >
            Analysis Chart
          </h1>
          <h3 style={{ fontSize: "4vw", marginLeft: "2%" }}>
            Number of lessons
          </h3>
          <div className="row" style={{ marginLeft: "2%", marginRight: "2%" }}>
            <div className="col-md-4" style={{ marginBottom: "1%" }}>
              <label>Select Country</label>
              <CountrySelect
                id="countryselect"
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
            </div>
            <div className="col-md-4" style={{ marginBottom: "1%" }}>
              <label>Select Camp</label>
              <CampSelect
                id="campselect"
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
            </div>
            <div className="col-md-4" style={{ marginBottom: "1%" }}>
              <label>Select School</label>
              <SchoolSelect
                id="schoolselect"
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
            </div>
          </div>
        </div>
        <div className="row">
          <span
            className="col-md-9"
            style={{ marginLeft: "5%", borderRight: "1px solid" }}
          >
            <LineChart
              labels={months?.map((month: string) => month)}
              datasets={filteredInfo?.map(
                (chartitem: IChartData, index: number) => {
                  return {
                    label: chartitem.school,
                    tension: 0.5,
                    borderWidth: 3,
                    data: info
                      ?.filter((item: IChartData) => {
                        if (item.school === chartitem.school) {
                          return item.lessons;
                        }
                      })
                      ?.map((filteredelem: IChartData) => filteredelem.lessons),
                    backgroundColor: colors[index],
                    borderColor: colors[index],
                  };
                }
              )}
            />
          </span>
          <span
            className="col-md-2"
            style={{
              backgroundColor: "white",
              marginLeft: "2%",
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
              in{" "}
              {params.get("schoolvalue")?.replaceAll("_", " ")
                ? params.get("schoolvalue")?.replaceAll("_", " ")
                : params.get("campvalue")
                ? params.get("campvalue")
                : params.get("countryvalue")
                ? params.get("countryvalue")
                : "Dataset"}
            </p>

            {filteredInfoscrollbar?.map(
              (filtereditem: IChartData, index: number) => {
                return (
                  <div
                    key={filtereditem.id}
                    style={{
                      color: `${colors[index]}`,
                      display: "flex",
                    }}
                  >
                    {filtereditem?.checked === "true" ? (
                      <>
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
                            handleChange(filtereditem.id, "false");
                          }}
                        ></span>
                        <a
                          style={{ color: `${colors[index]}`, opacity: 0.5 }}
                          href={`http://localhost:3000/school/${
                            filtereditem.id
                          }?countryvalue=${params.get(
                            "countryvalue"
                          )}&campvalue=${params.get(
                            "campvalue"
                          )}&schoolvalue=${params
                            .get("schoolvalue")
                            ?.replaceAll(" ", "_")}`}
                        >
                          <h1>{filtereditem.lessons}</h1> in{" "}
                          {filtereditem.school}
                        </a>
                      </>
                    ) : (
                      <>
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
                            handleChange(filtereditem.id, "true");
                          }}
                        ></span>
                        <a
                          style={{ color: `${colors[index]}` }}
                          href={`http://localhost:3000/school/${
                            filtereditem.id
                          }?countryvalue=${params.get(
                            "countryvalue"
                          )}&campvalue=${params.get(
                            "campvalue"
                          )}&schoolvalue=${params
                            .get("schoolvalue")
                            ?.replaceAll(" ", "_")}`}
                        >
                          <h1>{filtereditem.lessons}</h1> in{" "}
                          {filtereditem.school}
                        </a>
                      </>
                    )}
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
