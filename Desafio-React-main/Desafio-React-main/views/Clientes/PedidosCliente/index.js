import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Table } from "reactstrap";
import { api } from "../../../config";
import moment from "moment";

export const PedidosCliente = (props) => {
  console.log(props.match.params.id);

  const [data, setData] = useState([]);

  const [id] = useState(props.match.params.id);

  useEffect(() => {
    const getPedidos = async () => {
      await axios
        .get(api + "/cliente/" + id + "/pedidos")
        .then((response) => {
          console.log(response.data.pedidos);
          setData(response.data.pedidos);
        })
        .catch(() => {
          console.log("Erro. Sem conexão com a API.");
        });
    };
    getPedidos();
  }, [id]);

  return (
    <div>
      <Container>
        <div className="d-flex">
          <div className="m-auto p-2">
            <h1>Pedidos do cliente</h1>
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
              to="/listar-pedido"
              className="btn btn-outline-primary btn-sm"
            >
              Pedidos
            </Link>
          </div>
        </div>
        <Table striped className="text-center">
          <thead>
            <tr>
              <th>Pedido ID</th>
              <th>Cliente ID</th>
              <th>Data do pedido</th>
            </tr>
          </thead>
          <tbody>
            {data.map((pedidos) => (
              <tr key={pedidos.id}>
                <td>{pedidos.id}</td>
                <td>{pedidos.ClienteId}</td>
                <td>{moment(pedidos.dataPedido).format("DD/MM/YYYY")}</td>
                <td className="text-center">
                  <Link
                    to={"/editar-pedido/" + pedidos.id}
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