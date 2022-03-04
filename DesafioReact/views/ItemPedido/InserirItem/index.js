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

export const InserirItemPedido = () => {
    const [itemPedido, setItemPedido] = useState({
        quantidade: "",
        valor: "",
    });

    const [status, setStatus] = useState({
        type: "",
        message: "",
    });

    const valorInput = (e) =>
        setItemPedido({ ...itemPedido, [e.target.name]: e.target.value });

    const cadItemPedido = async (e) => {
        e.preventDefault();

        const headers = {
            "Content-Type": "application/json",
        };

        await axios
            .post(api + "/itempedido", itemPedido, { headers })
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
                    <h1>Cadastrar Item do Pedido</h1>
                </div>
                <div className="p-2">
                    <Link
                        to="listar-itempedido"
                        className="btn btn-outline-success btn-sm"
                    >
                        Itens Pedidos
                    </Link>
                </div>
            </div>
            <hr className="m-1" />

            {status.type === "error" ? (
                <Alert className="m-3" color="danger">
                    {status.message}
                </Alert>
            ) : (
                ""
            )}

            {status.type === "success" ? (
                <Alert className="m-3" color="success">
                    {status.message}
                </Alert>
            ) : (
                ""
            )}

            {status.type === "404" ? (
                <Alert className="m-3" color="danger">
                    {status.message}
                </Alert>
            ) : (
                ""
            )}
            <Form className="p-2" onSubmit={cadItemPedido}>
                <FormGroup className="p-2">
                    <Label>Quantidade de Itens:</Label>
                    <Input
                        type="number"
                        name="quantidade"
                        placeholder="Quantidade de Itens"
                        required
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Valor:</Label>
                    <Input
                        type="number"
                        name="valor"
                        placeholder="Valor do Pedido"
                        required
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Pedido ID:</Label>
                    <Input
                        type="number"
                        name="PedidoId"
                        placeholder="ID do Pedido"
                        required
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Serviço ID:</Label>
                    <Input
                        type="number"
                        name="ServicoId"
                        placeholder="ID do Serviço"
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