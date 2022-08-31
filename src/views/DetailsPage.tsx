import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { CountryContext } from "@context/CountryContext";
import { CampContext } from "@context/CampContext";
import { SchoolContext } from "@context/SchoolContext";
import { Link } from "react-router-dom";
import FlagEgypt from "@images/EgyptFlag.png";
import FlagKenya from "@images/KenyaFlag.jpg";
import FlagTunisia from "@images/TunisiaFlag.png";
import FlagTanzania from "@images/Tanzania.png";
interface IChartData {
  camp: string;
  country: string;
  id: string;
  lessons: number;
  month: string;
  school: string;
  checked: string;
}

const DetailsPage = () => {
  const { country } = useContext(CountryContext);
  const { camp } = useContext(CampContext);
  const { school } = useContext(SchoolContext);
  console.log(country, camp, school);
  const { id } = useParams<{ id?: string }>();

  const [record, setRecord] = useState<IChartData>();

  useEffect(() => {
    swal.showLoading();
    axios
      .get(
        `https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json`
      )
      .then((res) => {
        //save full array
        let index = res.data.findIndex((find: IChartData) => find.id === id);
        setRecord(res.data[index]);
        swal.close();
      })
      .catch((e) => {
        swal.fire("Seasion Ends Please Resign In Again", "", "error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>
      <div style={{ margin: "7%" }}>
        <Link className="btn btn-danger my-2" to="/">
          Back
        </Link>
        <div className="card bg-light mb-3">
          <div className="card-header " style={{ backgroundColor: "purple" }}>
            <h1
              style={{ color: "white" }}
            >{`${record?.school} School Details`}</h1>
          </div>
          <div className="card-body row justify-content-center">
            <h5 className="card-title">School Details</h5>
            <div className="card bg-light m-3 col-md-3 col-sm-6">
              <div className="card-body text-center ">
                <h2>Country</h2>
                <h4 style={{ color: "purple" }}>{record?.country}</h4>
              </div>
            </div>
            <div className="card bg-light m-3 col-md-3 col-sm-6">
              <div className="card-body text-center ">
                <h2>Camp</h2>
                <h4 style={{ color: "purple" }}>{record?.camp}</h4>
              </div>
            </div>
            <div className="card bg-light m-3 col-md-3 col-sm-6">
              <div className="card-body text-center ">
                <h2>Lessons</h2>
                <h4 style={{ color: "purple" }}>{record?.lessons}</h4>
              </div>
            </div>
            <div className="card bg-light col-md-3 col-sm-6">
              <div className="card-body text-center  ">
                <h2>Flag</h2>
                {record?.country === "Egypt" ? (
                  <img
                    src={FlagEgypt}
                    style={{ maxHeight: "90%", maxWidth: "90%" }}
                    alt="Egypt"
                  />
                ) : record?.country === "Kenya" ? (
                  <img
                    src={FlagKenya}
                    style={{ maxHeight: "90%", maxWidth: "90%" }}
                    alt="Kenya"
                  />
                ) : record?.country === "Tanzania" ? (
                  <img
                    src={FlagTanzania}
                    style={{ maxHeight: "90%", maxWidth: "90%" }}
                    alt="Tanzania"
                  />
                ) : (
                  <img
                    src={FlagTunisia}
                    style={{ maxHeight: "90%", maxWidth: "90%" }}
                    alt="Tunisia"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
