import { useHistory } from "react-router-dom";
import { useState } from "react";

import generarHorarios from "../utils/generarHorarios";
import Horario from "../components/Horario";
import InfoSeccion from "../components/InfoSeccion";

const Horarios = () => {
  const history = useHistory();
  const ramos = history.location.state;
  const [combinacionActual, setCombinacionActual] = useState(0);

  if (!ramos) {
    return <h1>ERRROR</h1>;
  }
  const combinaciones = generarHorarios(ramos.ramos.filter((x) => x));
  const secciones = combinaciones[combinacionActual].secciones;
  console.log(secciones);

  return (
    <>
      <div
        className="row"
        style={{
          height: "100vh",
          display: "flex",
          // justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="col-8" style={{ paddingRight: 0 }}>
          <Horario
            secciones={secciones}
            horario={combinaciones[combinacionActual].horario}
          />
          <p className="">También puedes probar otras combinaciones:</p>
          <div style={{ width: "fit-content", margin: "auto" }}>
            <ul className="pagination">
              <li
                className={`page-item ${combinacionActual === 0 && "disabled"}`}
              >
                <button
                  disabled={combinacionActual === 0}
                  className="page-link disabled"
                  onClick={() => {
                    setCombinacionActual(combinacionActual - 1);
                  }}
                >
                  &laquo;
                </button>
              </li>
              <li className="page-item active">
                <span className="page-link">{combinacionActual + 1}</span>
              </li>
              <li className="page-item">
                <button
                  disabled={combinacionActual + 1 === combinaciones.length}
                  className="page-link disabled"
                  onClick={() => {
                    setCombinacionActual(combinacionActual + 1);
                  }}
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-4 pe-4">
          <div className="list-group">
            {secciones.map((s) => (
              <InfoSeccion seccion={s} key={s.paquete} secciones={secciones} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Horarios;
