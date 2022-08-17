import React, { useEffect, useState } from "react";

import axios from "axios";
import swal from "sweetalert2";

import { useParams } from "react-router-dom";

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
  let params = new URLSearchParams(window.location.search);
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
  });

  return (
    <>
      <div style={{ margin: "10%" }}>
        <button
          className="btn btn-danger my-2"
          onClick={() =>
            window.location.replace(
              `http://localhost:3000?countryvalue=${params.get(
                "countryvalue"
              )}&campvalue=${params.get("campvalue")}&schoolvalue=${params.get(
                "schoolvalue"
              )}`
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
              <tr>
                <td>{record?.id}</td>
                <td>{record?.school}</td>
                <td>{record?.camp}</td>
                <td>{record?.country}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
