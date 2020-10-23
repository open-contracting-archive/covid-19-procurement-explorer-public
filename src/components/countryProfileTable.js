import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const CountryProfileTable = () => {
  // console.log(tenderData);
  const [tenderData, setTenderData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://covid19admin.py.staging.yipl.com.np/api/v1/tender/?country=1"
      )
      .then((res) => {
        // console.log(res.data);
        setTenderData(res.data);
      });
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th style={{ width: "35%" }}>Project Title</th>
            <th>Procurement Method</th>
            <th>Supplier</th>
            <th>Status</th>
            <th>Value (USD)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tenderData &&
            tenderData.map((tender, index) => {
              return (
                <tr key={index}>
                  <td>{tender.project_title}</td>
                  <td>{tender.procurement_method}</td>
                  <td className="uppercase">{tender.supplier_name}</td>
                  <td>{tender.status}</td>
                  <td>{tender.value_usd.toLocaleString("en")}</td>
                  <td>
                    {tender.red_flag && (
                      <span className="bg-gray-300 inline-block px-4 rounded-full text-orange-500 text-xs">
                        {tender.red_flag}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CountryProfileTable;
