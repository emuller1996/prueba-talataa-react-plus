import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ListaAsteroide.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from "react-paginate";

export default function ListaAsteroidesComponent() {
  const [listaAsteroides, setListaAsteroides] = useState(undefined);
  const [listaAsteroidesActual, setListaAsteroidesActual] = useState(undefined);

  const [keys, setKeys] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [total, setTotal] = useState(undefined);

  const [pageCurrent, setPageCurrent] = useState(0);
  const [porPag, setPorPage] = useState(12);
  const [pageCount, setPageCount] = useState(12);

  useEffect(() => {
    if (pageCurrent !== 0) {
      setListaAsteroidesActual(
        listaAsteroides
          .flat()
          .slice(
            (pageCurrent + 1) * porPag - porPag,
            (pageCurrent + 1) * porPag
          )
      );
    } else {
    }
  }, [pageCurrent]);

  useEffect(() => {
    getAllAsteroides();
  }, [startDate]);

  async function getAllAsteroides() {
    setLoading(true);
    setPageCurrent(0);
    try {
      const result = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate
          .toJSON()
          .substring(0, 10)}&api_key=YbbMNWeWX2BqxoPKXEiWWcKMgNlUHhHXgqWG5XBt`
      );
      setListaAsteroides(Object.values(result.data.near_earth_objects).flat());
      setListaAsteroidesActual(
        Object.values(result.data.near_earth_objects)
          .flat()
          .slice(0, (0 + 1) * porPag)
      );

      setTotal(Object.values(result.data.near_earth_objects).flat().length);
      setKeys(Object.keys(result.data.near_earth_objects));
      setLoading(false);
      setPageCount(
        Math.ceil(
          Object.values(result.data.near_earth_objects).flat().length / porPag
        )
      );
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="row g-3">
        <div className="col-12">
          <div class="card mb-3 my-shadow">
            <div class="row g-0">
              <div class="col-md-4 text-start p-3">
                <p class="m-0 p-0  fs-6 fw-semibold">
                  Te Mostraremos los Asteroides de los Siguente 8 dias mas cerca
                  de la tierra.
                  {/* {startDate.toJSON().substring(0,10) } */}
                </p>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Seleccione Fecha Inicio</h5>
                  <p class="card-text">
                    {/* <input type="date" className="form-control" name="date_start" id="date_start" /> */}
                    <ReactDatePicker
                      className="form-control w-50"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                    <span class="m-0 p-0 fs-6 fw-semibold">
                      {" "}
                      Total de Asteroides : {total && !loading && total}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="container text-center  mx-auto my-5">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {!loading &&
          listaAsteroidesActual &&
          listaAsteroidesActual.flat().map((c) => (
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

        <div className="col-12">
          {!loading && (
            <ReactPaginate
              breakLabel="..."
              nextLabel=">>"
              onPageChange={(e) => {
                setPageCurrent(e.selected);
                if (e.selected === 0) {
                  setListaAsteroidesActual(
                    listaAsteroides
                      .flat()
                      .slice(e.selected, (e.selected + 1) * porPag)
                  );
                }
              }}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<<"
              renderOnZeroPageCount={null}
              className="pagination justify-content-center"
              pageClassName="page-item "
              pageLinkClassName="btn btn-secondary  text-decoration-none shadow text-white fw-semibold ms-1"
              activeClassName="page-item"
              activeLinkClassName="bg-dark border-dark text-white shadow-sm "
              previousClassName="page-item"
              nextClassName="page-item "
              previousLinkClassName="btn btn-secondary   text-decoration-none shadow text-white fw-semibold me-1"
              nextLinkClassName="btn btn-secondary  text-decoration-none shadow text-white fw-semibold ms-2"
            />
          )}
        </div>
      </div>
    </>
  );
}
