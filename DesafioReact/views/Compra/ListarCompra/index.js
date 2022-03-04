import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";
import moment from "moment";

export const ListarCompra = () => {
  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const getCompras = async () => {
    axios
      .get(api + "/listacompras")
      .then((response) => {
        console.log(response.data.compras);
        setData(response.data.compras);
      })
      .catch(() => {
        console.log("Erro: Sem conexão com a API.");
      });
  };

  const apagarCompra = async (idCompra) => {
    console.log(idCompra);

    const headers = {
      "Content-type": "application/json",
    };

    await axios
      .get(api + "/excluircompra/" + idCompra, { headers })
      .then((response) => {
        console.log(response.data.error);
        getCompras();
      })
      .catch(() => {
        setStatus({
          type: "error",
          message: "Não foi possível conetar-se a API.",
        });
      });
  };

  useEffect(() => {
    getCompras();
  }, []);

  return (
    <div>
      <Container>
        <div className="p-2">
          {status.type === "error" ? (
            <Alert color="danger">{status.message}</Alert>
          ) : (
            ""
          )}
        </div>
        <div className="d-flex">
          <div className="m-auto">
            <h1>Visualizar Compras</h1>
          </div>
          <div className="m-auto p-2">
            <Link
              to="/inserir-compra"
              className="btn btn-outline-success btn-sm"
            >
              Cadastrar
            </Link>
          </div>
        </div>
        <Table striped className="text-center">
          <thead>
            <tr>
              <th>Compra ID</th>
              <th>Data da Compra</th>
              <th>Cliente ID</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((compras) => (
              <tr key={compras.id}>
                <th>{compras.id}</th>
                <td>{moment(compras.data).format("DD/MM/YYYY")}</td>
                <td>{compras.ClienteId}</td>
                <td>
                  <Link
                    to={"/editar-compra/" + compras.id}
                    className="m-1 btn btn-outline-warning btn-sm"
                  >
                    Editar
                  </Link>

                  <span
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => apagarCompra(compras.id)}
                  >
                    Excluir
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};