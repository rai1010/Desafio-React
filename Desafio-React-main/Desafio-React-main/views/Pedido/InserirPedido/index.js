import axios from "axios";
import { useState } from "react";
import {
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Alert,
} from "reactstrap";
import { Link } from "react-router-dom";
import { api } from "../../../config";

export const InserirPedido = () => {
    const [pedido, setPedido] = useState({
        nome: "",
        dataPedido: "",
    });

    const [status, setStatus] = useState({
        type: "",
        message: "",
    });

    const valorInput = (e) =>
        setPedido({ ...pedido, [e.target.name]: e.target.value });

    const cadPedido = async (e) => {
        e.preventDefault();

        const headers = {
            "Content-Type": "application/json",
        };

        await axios
            .post(api + "/pedido", pedido, { headers })
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
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar pedido</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-pedido" className="btn btn-outline-success btn-sm">
                        Pedidos
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
            <Form className="p-2" onSubmit={cadPedido}>
                <FormGroup className="p-2">
                    <Label>Data do Pedido:</Label>
                    <Input
                        type="date"
                        name="dataPedido"
                        placeholder="Data do Pedido"
                        required
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Id do Cliente:</Label>
                    <Input
                        type="text"
                        name="ClienteId"
                        placeholder="Id do Cliente"
                        required
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
    );
};