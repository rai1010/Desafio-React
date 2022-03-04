
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Table } from "reactstrap";
import { api } from "../../../config";
import moment from "moment";

export const ComprasCliente = (props) => {
  console.log(props.match.params.id)

  const [data, setData] = useState([]);

  const [id] = useState(props.match.params.id);

  useEffect(() => {
    const getCompras = async () => {
      await axios
        .get(api + "/cliente/" + id + "/compras")
        .then((response) => {
          console.log(response.data.compras);
          setData(response.data.compras);
        })
        .catch(() => {
          console.log("Erro. Sem conexão com a API.");
        });
    };
    getCompras();
  }, [id]);

  return (
    <div>
      <Container>
        <div className="d-flex">
          <div className="m-auto p-2">
            <h1>Compras do cliente</h1>
          </div>
          <div className="p-2">
            <Link
              to="/listar-cliente"
              className="btn btn-outline-primary btn-sm"
            >
              Clientes
            </Link>
          </div>
          <div className="p-2">
            <Link
              to="/listar-compra"
              className="btn btn-outline-primary btn-sm"
            >
              Compras
            </Link>
          </div>
        </div>
        <Table striped className="text-center">
          <thead>
            <tr>
              <th>Compra ID</th>
              <th>Cliente ID</th>
              <th>Data do compra</th>
            </tr>
          </thead>
          <tbody>
            {data.map((compras) => (
              <tr key={compras.id}>
                <td>{compras.id}</td>
                <td>{compras.ClienteId}</td>
                <td>{moment(compras.dataCompra).format("DD/MM/YYYY")}</td>
                <td className="text-center">
                  <Link
                    to={"/editar-compra/" + compras.id}
                    className="btn btn-outline-warning btn-sm"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};