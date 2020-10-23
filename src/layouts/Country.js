import React, { useState, useEffect } from "react";
import Iframe from "react-iframe";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import CountryProfileTable from "../components/countryProfileTable";
import CountryProfile from "../components/countryProfile";
import JsonServices from "../services/jsonServices";
import useTrans from "../hooks/useTrans";
import axios from "axios";

function Country() {
  const [selectedCountry] = useState("mexico");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"];

  const formatNumber = (number) => {
    // what tier? (determines SI symbol)
    var tier = (Math.log10(number) / 3) | 0;

    // if zero, we don't need a suffix
    if (tier == 0) return number;

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(1) + suffix;
  };

  useEffect(() => {
    // JsonServices.getProfileByCountry(selectedCountry).then((response) => {
    //   if (response) {
    //     setData(response);
    //   }
    //   setLoading(false);
    // });
    axios
      .get("https://covid19admin.py.staging.yipl.com.np/api/v1/country/1/")
      .then((res) => {
        setData(res.data);
      });
  }, [selectedCountry]);
  //   console.log(data);
  const { trans } = useTrans();

  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <h2 className="font-bold mb-5 text-3xl text-gray-900">{data.name}</h2>
        <div className="flex flex-wrap -mx-4 -mb-4">
          <div className="w-full md:w-1/2 lg:w-7/12 px-4 mb-4">
            <div className="">
              <Iframe
                url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15010268.98948006!2d-111.65143694146222!3d23.293382281181213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84043a3b88685353%3A0xed64b4be6b099811!2sMexico!5e0!3m2!1sen!2snp!4v1602666699465!5m2!1sen!2snp"
                width="100%"
                height="450px"
                id=""
                className=""
                display="initial"
                position="relative"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-5/12 px-4 mb-4">
            <div className="flex flex-col text-gray-800 font-extrabold">
              <div className="p-8 py-4 border border-gray-800">
                <div className="flex flex-wrap -mx-4 -mb-4">
                  <div className="w-full xs:w-1/2 px-4 mb-4">
                    <div>
                      <span className="text-lg inline-block">
                        {trans("general.Population")}{" "}
                      </span>
                      <h2 className="text-3xl">
                        {formatNumber(data.population)}
                      </h2>
                    </div>
                  </div>
                  <div className="w-full xs:w-1/2 px-4 mb-4">
                    <div>
                      <span className="text-lg inline-block">
                        {trans("GDP")}
                      </span>
                      <h2 className="text-3xl">
                        {formatNumber(data.gdp)}
                        <span className="inline-block uppercase text-xl tracking-tight">
                          {data.currency}
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div className="w-full xs:w-1/2 px-4 mb-4">
                    <div>
                      <span className="text-lg font-extrabold  inline-block">
                        {trans("general.Healthcare budget")}
                      </span>
                      <h2 className="text-3xl">
                        ${data.healthcare_budget}
                        <span className="inline-block uppercase text-sm tracking-tight">
                          {data.currency}
                        </span>
                      </h2>
                      <span className="block text-lg font-extrabold">
                        {trans("general.per capita")}
                      </span>
                    </div>
                  </div>
                  <div className="w-full xs:w-1/2 px-4 mb-4">
                    <div>
                      <span className="text-lg font-extrabold  inline-block">
                        {trans("general.% of GDP to healthcare")}
                      </span>
                      <h2 className="text-3xl">
                        {data.healthcare_gdp_pc}
                        <span className="inline-block uppercase text-sm tracking-tight">
                          %
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div className="w-full px-4 mb-4">
                    <div>
                      <p className="text-sm font-normal">
                        {trans("general.Source")}:
                        <a
                          href={data.source}
                          className="ml-1 text-blue-600"
                          title="John Hopkins University"
                        >
                          {trans("general.John Hopkins University")}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 py-4 border border-t-0 border-gray-800">
                <div className="flex flex-wrap -mx-4 -mb-4">
                  <div className="w-full xs:w-1/2 px-4 mb-4">
                    <div>
                      <span className="text-lg inline-block">
                        {trans("general.Total Covid-19 cases")}
                      </span>
                      <h2 className="text-3xl">
                        {data.covid_cases_total &&
                          data.covid_cases_total.toLocaleString("en")}
                      </h2>
                    </div>
                  </div>
                  <div className="w-full xs:w-1/2 px-4 mb-4">
                    <div>
                      <span className="text-lg inline-block">
                        {trans("general.Total deaths by Covid-19")}
                      </span>
                      <h2 className="text-3xl">
                        {data.covid_deaths_total &&
                          data.covid_deaths_total.toLocaleString("en")}
                      </h2>
                    </div>
                  </div>
                  <div className="w-full px-4 mb-4">
                    <div>
                      <p className="text-sm font-normal">
                        {trans("general.Source")}:
                        <a
                          href={data.source}
                          className="ml-1 text-blue-600"
                          title="John Hopkins University"
                        >
                          {trans("general.John Hopkins University")}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Tabs>
            <TabList>
              <Tab>{trans("general.Tenders")}</Tab>
              <Tab>{trans("general.Profile")}</Tab>
            </TabList>
            <TabPanel>
              <CountryProfileTable />
            </TabPanel>
            <TabPanel>
              <CountryProfile profileData={data} />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default Country;
