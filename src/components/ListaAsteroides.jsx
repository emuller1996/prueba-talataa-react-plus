import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ListaAsteroide.css";
export default function ListaAsteroidesComponent() {
  const [listaAsteroides, setListaAsteroides] = useState(undefined);
  const [keys, setKeys] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("montaje");
    getAllAsteroides();
  }, []);

  async function getAllAsteroides() {
    setLoading(true);

    try {
      const result = await axios.get(
        "https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-09-07&api_key=YbbMNWeWX2BqxoPKXEiWWcKMgNlUHhHXgqWG5XBt"
      );
      setListaAsteroides(Object.values(result.data.near_earth_objects));
      setKeys(Object.keys(result.data.near_earth_objects));

      console.log(Object.values(result.data.near_earth_objects));
      console.log(Object.keys(result.data.near_earth_objects));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && (
        <div className="container text-center  mx-auto my-5">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div className="row g-3">
        {!loading &&
          listaAsteroides &&
          listaAsteroides.flat().map((c) => (
            <div className="col-6 col-md-6 col-xl-4">
              <div class="card card-asteroide">
                <div class="card-body">
                  <h6 class="card-title">{c.name}</h6>
                  <p class="card-text m-0 p-0 fs-7">
                    Magnitud : {c.absolute_magnitude_h}
                  </p>
                  <p class="card-text m-0 p-0 fs-7">
                    Diametro :{" "}
                    {c.estimated_diameter.meters.estimated_diameter_max}m{" "}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
