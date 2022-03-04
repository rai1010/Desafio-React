import axios from "axios";
import { useState } from "react/cjs/react.development";
import { Button, Container, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { api } from "../../../config";

export const InserirCliente = () => {
  const [cliente, setCliente] = useState({
    nome: "",
    endereco: "",
    cidade: "",
    uf: "",
    nascimento: "",
    clienteDesde: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const valorInput = (e) =>
    setCliente({ ...cliente, [e.target.name]: e.target.value });

  const cadCliente = async (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
    };

    await axios
      .post(api + "/cliente", cliente, { headers })
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

  return (
    <div>
      <Container>
        <div className="d-flex">
          <div className="m-auto p-2">
            <h1>Cadastrar Cliente</h1>
          </div>
          <div className="p-2">
            <Link
              to="/listar-cliente"
              className="btn btn-outline-success btn-sm"
            >
              Clientes
            </Link>
          </div>
        </div>
        <hr className="m-1" />

        {status.type === "error" ? (
          <Alert className="m-3" color="danger">{status.message}</Alert>
        ) : (
          ""
        )}

        {status.type === "success" ? (
          <Alert className="m-3" color="success">{status.message}</Alert>
        ) : (
          ""
        )}

        {status.type === "404" ? (
          <Alert className="m-3" color="danger">{status.message}</Alert>
        ) : (
          ""
        )}
        <Form className="p-2" onSubmit={cadCliente}>
          <FormGroup className="p-2">
            <Label>Nome:</Label>
            <Input
              type="text"
              name="nome"
              placeholder="Nome"
              required
              onChange={valorInput}
            />
          </FormGroup>
          <FormGroup className="p-2">
            <Label>Endereço:</Label>
            <Input
              type="text"
              name="endereco"
              placeholder="Endereço"
              required
              onChange={valorInput}
            />
          </FormGroup>
          <FormGroup className="p-2">
            <Label>Cidade:</Label>
            <Input
              type="text"
              name="cidade"
              placeholder="Cidade"
              required
              onChange={valorInput}
            />
          </FormGroup>
          <FormGroup className="p-2">
            <Label>UF:</Label>
            <Input
              type="text"
              name="uf"
              placeholder="UF"
              required
              onChange={valorInput}
            />
          </FormGroup>
          <FormGroup className="p-2">
            <Label>Nascimento:</Label>
            <Input
              type="date"
              name="nascimento"
              placeholder="data de nascimento"
              required
              onChange={valorInput}
            />
          </FormGroup>
          <FormGroup className="p-2">
            <Label>Cliente Desde:</Label>
            <Input
              type="date"
              name="clienteDesde"
              placeholder="Cliente desde"
              onChange={valorInput}
            />
          </FormGroup>
          <Button className="m-2" type="submit" outline color="success">
            Cadastrar
          </Button>
          <Button type="reset" outline color="warning">
            Limpar
          </Button>
        </Form>
      </Container>
    </div>
  );
};