import React, { useEffect, useState } from "react";

import axios from "axios";
import swal from "sweetalert2";
import { Link } from "react-router-dom";

import { useParams, useNavigate, useLocation } from "react-router-dom";

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
  let navigate = useNavigate();
  let ploaction = useLocation();
  const { id } = useParams<{ id?: string }>();
  const { country } = useParams<{ country?: string }>();
  const { camp } = useParams<{ camp?: string }>();
  const { filteredarr } = useParams<{ filteredarr?: string }>();
  const { school } = useParams<{ school?: string }>();
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
  }, []);
  console.log(
    `http://localhost:3000?countryvalue=${
      ploaction.search.split("?")[1].split("=")[1]
    }&campvalue=${ploaction.search.split("&")[1].split("=")[1]}&schoolvalue=${
      ploaction.search.split("&")[2].split("=")[1]
    }&filteredarr=${ploaction.search.split("&")[3].split("=")[1]}`
  );
  return (
    <>
      <div style={{ margin: "10%" }}>
        <button
          className="btn btn-danger my-2"
          onClick={() =>
            window.location.replace(
              `http://localhost:3000?countryvalue=${
                ploaction.search.split("?")[1].split("=")[1].split("&")[0]
              }&campvalue=${
                ploaction.search.split("&")[1].split("=")[1]
              }&schoolvalue=${
                ploaction.search.split("&")[2].split("=")[1]
              }&filteredarr=${ploaction.search.split("&")[3].split("=")[1]}`
            )
          }
        >
          Back
        </button>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>School</th>
                <th>Camp</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              <td>{record?.id}</td>
              <td>{record?.school}</td>
              <td>{record?.camp}</td>
              <td>{record?.country}</td>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
