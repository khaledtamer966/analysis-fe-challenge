import React, { useEffect, useState, useContext } from "react";
import LineChart from "@components/LineChart/LineChart";
import axios from "axios";
import swal from "sweetalert2";
import CountrySelect from "@components/CountrySelect/CountrySelect";
import CampSelect from "@components/CampSelect/CampSelect";
import SchoolSelect from "@components/SchoolSelect/SchoolSelect";
import { Link } from "react-router-dom";
import {
  removeStringDuplicateUsingFilter,
  removeObjDuplicateUsingFilter,
  calculateSum,
  removeObjDuplicateUsingFilterByCountryAndSchool,
  getValuesCorrectlyFromURLForChart,
  colors,
  months,
  getValuesCorrectlyFromURLForCampOptions,
  getValuesCorrectlyFromURLForSchoolOptions,
} from "@variables/general";
import { CountryContext } from "@context/CountryContext";
import { CampContext } from "@context/CampContext";
import { SchoolContext } from "@context/SchoolContext";

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

const Dashboard = () => {
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
  const { country } = useContext(CountryContext);
  const { camp } = useContext(CampContext);
  const { school } = useContext(SchoolContext);

  useEffect(() => {
    swal.showLoading();
    axios
      .get(
        `https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json`
      )
      .then((res) => {
        let dataarr = res?.data?.map((item: IChartData, index: number) => {
          item.color = colors[Math.floor(Math.random() * colors.length)];
          return item;
        });
        //save full array
        setInfo(removeObjDuplicateUsingFilter(dataarr));
        setFilteredInfo(
          removeObjDuplicateUsingFilterByCountryAndSchool(
            getValuesCorrectlyFromURLForChart(
              country ?? "",
              camp ?? "",
              school ?? "",
              dataarr
            ) ?? []
          )
        );

        setFilteredInfoScrollbar(
          removeObjDuplicateUsingFilterByCountryAndSchool(
            getValuesCorrectlyFromURLForChart(
              country ?? "",
              camp ?? "",
              school ?? "",
              dataarr
            ) ?? []
          )
        );

        //remove Duplicates in countries,camps,and schools
        let filteredCountryArr = removeStringDuplicateUsingFilter(
          dataarr.map((record: IChartData) => record.country)
        );

        let newCountryOptions: { value: string; label: string }[] =
          filteredCountryArr?.map((country: string) => {
            return {
              value: country,
              label: `${country}`,
            };
          });

        setCountryOptions(newCountryOptions);
        setCampOptions(
          getValuesCorrectlyFromURLForCampOptions(
            country ?? "",
            camp ?? "",
            school ?? "",
            dataarr
          ) ?? []
        );
        setSchoolOptions(
          getValuesCorrectlyFromURLForSchoolOptions(
            country ?? "",
            camp ?? "",
            school ?? "",
            dataarr
          ) ?? []
        );
        swal.close();
      })
      .catch((e) => {
        swal.fire("Seasion Ends Please Resign In Again", "", "error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(country, camp, school);
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
              {countryOptions.length !== 0 ? (
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
              ) : null}
            </div>
            <div className="col-md-4" style={{ marginBottom: "1%" }}>
              <label>Select Camp</label>
              {campOptions.length !== 0 ? (
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
              ) : null}
            </div>
            <div className="col-md-4" style={{ marginBottom: "1%" }}>
              <label>Select School</label>
              {schoolOptions.length !== 0 ? (
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
              ) : null}
            </div>
          </div>
        </div>
        <div className="row   justify-content-center ">
          <span
            className="col-md-9 col-sm-12"
            style={{ borderRight: "1px solid", marginRight: "1%" }}
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
                      // eslint-disable-next-line array-callback-return
                      ?.filter((item: IChartData) => {
                        if (item.school === chartitem.school) {
                          return item.lessons;
                        }
                      })
                      ?.map((filteredelem: IChartData) => filteredelem.lessons),
                    backgroundColor: chartitem.color,
                    borderColor: chartitem.color,
                  };
                }
              )}
            />
          </span>
          <span
            style={{
              backgroundColor: "light grey",
              marginLeft: "1%",
              maxHeight: "550px",
              overflowY: "scroll",
            }}
            className="col-md-2 col-sm-12 "
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
                    key={filtereditem.id}
                    style={{
                      color: `${filtereditem.color}`,
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
                        <Link
                          style={{
                            color: `${filtereditem.color}`,
                            opacity: 0.5,
                          }}
                          to={`/school/${filtereditem.id}`}
                        >
                          <h1>{filtereditem.lessons}</h1> in{" "}
                          {filtereditem.school}
                        </Link>
                      </>
                    ) : (
                      <>
                        <span
                          style={{
                            margin: "15px",
                            width: "10px",
                            height: "10px",
                            backgroundColor: `${filtereditem.color}`,
                            border: "1px solid #000",
                            borderRadius: "50%",
                            cursor: "pointer",
                          }}
                          id={`${filtereditem.id}`}
                          onClick={() => {
                            handleChange(filtereditem.id, "true");
                          }}
                        ></span>
                        <Link
                          style={{ color: `${filtereditem.color}` }}
                          to={`/school/${filtereditem.id}`}
                        >
                          <h1>{filtereditem.lessons}</h1> in{" "}
                          {filtereditem.school}
                        </Link>
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
