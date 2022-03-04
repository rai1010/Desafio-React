import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { api } from "../../../config";

export const EditarCompra = (props) => {
  const [id, setId] = useState(props.match.params.id);
  const [data, setData] = useState("");
  const [ClienteId, setClienteId] = useState("");
  console.log(props);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const edtCompra = async (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
    };

    await axios
      .put(api + "/atualizacompra/" + id, { id, data, ClienteId }, { headers })
      .then((response) => {
        if (response.data.error) {
          setStatus({
            type: "error",
            message: response.data.message,
          });
        } else {
          setStatus({
            type: "success",
            message: response.data.message,
          });
        }
      })
      .catch(() => {
        setStatus({
          type: "404",
          message: "Sem conexão com a API.",
        });
      });
  };

  useEffect(() => {
    const getCompra = async () => {
      await axios
        .get(api + "/compra/" + id)
        .then((response) => {
          setId(response.data.compra.id);
          setData(response.data.compra.data);
          setClienteId(response.data.compra.ClienteId);
        })
        .catch(() => {
          console.log("Erro: não foi possível se conectar a API.");
        });
    };
    getCompra();
  }, [id]);

  return (
    <div>
      <Container>
        <div className="d-flex">
          <div className="m-auto p-2">
            <h1>Editar Compra</h1>
          </div>
          <div className="p-2">
            <Link
              to="/listar-compra"
              className="btn btn-outline-primary btn-sm"
            >
              Compras
            </Link>
          </div>
          <div className="p-2">
            <Link
              to="/listar-cliente"
              className="btn btn-outline-primary btn-sm"
            >
              Clientes
            </Link>
          </div>
        </div>
        <hr className="m-1" />
        {status.type === "error" ? (
          <Alert className="m-3" color="danger">{status.message}</Alert>
        ) : (
          " "
        )}
        {status.type === "success" ? (
          <Alert className="m-3" color="success">{status.message}</Alert>
        ) : (
          " "
        )}

        <Form className="p-2" onSubmit={edtCompra}>
          <FormGroup className="p-2">
            <Label>ID Compra</Label>
            <Input
              type="number"
              name="id"
              placeholder="id da compra"
              disabled
              defaultValue={id}
            />
          </FormGroup>
          <FormGroup className="p-2">
            <Label>Data:</Label>
            <Input
              type="date"
              name="data"
              placeholder="data da compra"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="p-2">
            <Label>ClienteId:</Label>
            <Input
              type="number"
              name="ClienteId"
              placeholder="id do cliente"
              disabled
              defaultValue={ClienteId}
            />
          </FormGroup>
          <Button className="m-2" type="submit" outline color="success">
            Salvar
          </Button>
        </Form>
      </Container>
    </div>
  );
};