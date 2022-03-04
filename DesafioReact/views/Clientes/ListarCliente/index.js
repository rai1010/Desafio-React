import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarCliente = () => {
  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const getClientes = async () => {
    axios
      .get(api + "/listaclientes")
      .then((response) => {
        console.log(response.data.clientes);
        setData(response.data.clientes);
      })
      .catch(() => {
        console.log("Erro: Sem conexão com a API.");
      });
  };

  const apagarCliente = async (idCliente) => {
    console.log(idCliente);

    const headers = {
      "Content-type": "application/json",
    };

    await axios
      .get(api + "/excluircliente/" + idCliente, { headers })
      .then((response) => {
        console.log(response.data.error);
        getClientes();
      })
      .catch(() => {
        setStatus({
          type: "error",
          message: "Não foi possível conetar-se a API.",
        });
      });
  };

  useEffect(() => {
    getClientes();
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
            <h1>Visualizar Clientes</h1>
          </div>
          <div className="m-auto p-2">
            <Link
              to="/inserir-cliente"
              className="btn btn-outline-success btn-sm"
            >
              Cadastrar
            </Link>
          </div>
        </div>
        <Table striped>
          <thead>
            <tr className="text-center">
              <th>Cliente ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Cidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((clientes) => (
              <tr key={clientes.id}>
                <th scope="row">{clientes.id}</th>
                <td>{clientes.nome}</td>
                <td>{clientes.endereco}</td>
                <td>{clientes.cidade}</td>
                <td>
                  <Link
                    to={"/cliente/" + clientes.id + "/pedidos"}
                    className="m-1 btn btn-outline-primary btn-sm"
                  >
                    Pedidos
                  </Link>
                  <Link
                    to={"/cliente/" + clientes.id + "/compras"}
                    className="m-1 btn btn-outline-primary btn-sm"
                  >
                    Compras
                  </Link>
                  <Link
                    to={"/editar-cliente/" + clientes.id}
                    className="m-1 btn btn-outline-warning btn-sm"
                  >
                    Editar
                  </Link>
                  <span
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => apagarCliente(clientes.id)}
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