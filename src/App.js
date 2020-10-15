import React from "react";

function App() {
  return (
    <>
      <main
        className="container [ mx-auto mt-12 px-4 ] [ flex flex-col justify-center ]"
        style={{ height: "600px" }}
      >
        <h1 className="[ text-4xl md:text-6xl font-bold uppercase leading-tight ] w-1/2">
          Emergency Procurement
        </h1>
        <p className="[ text-lg uppercase ] mt-6">
          Data, best practices and recommendations
        </p>

        <div className="mt-16 [ flex flex-wrap md:flex-no-wrap ]">
          <a href="" className="flex [ mr-12 mb-10 ]">
            <div className="home-circle mr-4 mt-1">{">"}</div>
            <div>
              <p className="[ text-2xl font-bold uppercase ]">Explore data</p>
              <p className="text-gray-600">Stats from countries</p>
            </div>
          </a>
          <a href="" className="flex">
            <div className="home-circle mr-4 mt-1">{">"}</div>
            <div>
              <p className="[ text-2xl font-bold uppercase ]">
                Explore library
              </p>
              <p className="text-gray-600">Best practices and resources</p>
            </div>
          </a>
        </div>
      </main>
      <section>
        <div className="container [ mx-auto px-4 ] [ flex md:justify-between flex-col md:flex-row ]">
          <div className="text-white bg-gray-800 [ flex flex-col justify-between ] [ p-10 ] mb-4 ">
            <p>We have aggregated best practices from all over the world</p>
            <a href="" className="uppercase text-white mt-10 inline-block">
              <p>explore</p>
              <p className="text-2xl">Library {">"}</p>
            </a>
          </div>
          <div className="text-white bg-gray-800 [ flex flex-col justify-between ] [ p-10 md:mx-4 mb-4 ]">
            <p>Monitor and explore Covid-19 related procurement data</p>
            <a href="" className="uppercase text-white mt-10 inline-block">
              <p>explore</p>
              <p className="text-2xl">Data {">"}</p>
            </a>
          </div>
          <div className="text-white bg-gray-800 [ flex flex-col justify-between ] [ p-10 ] mb-4">
            <p>Track your country's Covid-19 procurement status</p>
            <a href="" className="uppercase text-white mt-10 inline-block">
              <p>explore</p>
              <p className="text-2xl">Countries {">"}</p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
