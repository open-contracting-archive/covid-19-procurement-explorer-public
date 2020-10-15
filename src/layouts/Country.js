import React from "react";
import Iframe from "react-iframe";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import CountryProfile from "../components/countryProfile";
import Profile from "../components/profile";

function Country() {
  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
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
                      <span className="text-lg inline-block">Population</span>
                      <h2 className="text-3xl">126.2M</h2>
                    </div>
                  </div>
                  <div className="w-full xs:w-1/2 px-4 mb-4">
                    <div>
                      <span className="text-lg inline-block">GDP</span>
                      <h2 className="text-3xl">
                        1.221T
                        <span className="inline-block uppercase text-xl tracking-tight">
                          usd
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div className="w-full xs:w-1/2 px-4 mb-4">
                    <div>
                      <span className="text-lg font-extrabold  inline-block">
                        Healthcare budget
                      </span>
                      <h2 className="text-3xl">
                        $495
                        <span className="inline-block uppercase text-sm tracking-tight">
                          usd
                        </span>
                      </h2>
                      <span className="block text-lg font-extrabold">
                        per capita
                      </span>
                    </div>
                  </div>
                  <div className="w-full xs:w-1/2 px-4 mb-4">
                    <div>
                      <span className="text-lg font-extrabold  inline-block">
                        % of GDP to healthcare
                      </span>
                      <h2 className="text-3xl">
                        5.52
                        <span className="inline-block uppercase text-sm tracking-tight">
                          %
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div className="w-full px-4 mb-4">
                    <div>
                      <p className="text-sm font-normal">
                        Source:
                        <a
                          href="#"
                          className="ml-1 text-blue-600"
                          title="John Hopkins University"
                        >
                          John Hopkins University
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
                        Total Covid-19 cases
                      </span>
                      <h2 className="text-3xl">790K</h2>
                    </div>
                  </div>
                  <div className="w-full xs:w-1/2 px-4 mb-4">
                    <div>
                      <span className="text-lg inline-block">
                        Total deaths by Covid-19
                      </span>
                      <h2 className="text-3xl">81,887</h2>
                    </div>
                  </div>
                  <div className="w-full px-4 mb-4">
                    <div>
                      <p className="text-sm font-normal">
                        Source:
                        <a
                          href="#"
                          className="ml-1 text-blue-600"
                          title="John Hopkins University"
                        >
                          John Hopkins University
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
              <Tab>Tenders</Tab>
              <Tab>Profile</Tab>
            </TabList>

            <TabPanel>
              <CountryProfile />
            </TabPanel>
            <TabPanel>
              <Profile />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default Country;
