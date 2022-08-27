import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { CountryContext } from "../contexts/CountryContext";
import { CampContext } from "../contexts/CampContext";
import { SchoolContext } from "../contexts/SchoolContext";
import { Link } from "react-router-dom";

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
  }, []);

  return (
    <>
      <div style={{ margin: "10%" }}>
        <Link className="btn btn-danger my-2" to="/">
          Back
        </Link>
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

export default DetailsPage;
