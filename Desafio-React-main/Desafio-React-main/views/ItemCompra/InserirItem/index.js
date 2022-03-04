import axios from "axios";
import { useState } from "react";
import {
    Button,
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
} from "reactstrap";
import { Link } from "react-router-dom";
import { api } from "../../../config";

export const InserirItemCompra = () => {
    const [itemCompra, setItemCompra] = useState({
        quantidade: "",
        valor: "",
    });

    const [status, setStatus] = useState({
        type: "",
        message: "",
    });

    const valorInput = (e) =>
        setItemCompra({ ...itemCompra, [e.target.name]: e.target.value });

    const cadItemCompra = async (e) => {
        e.preventDefault();

        const headers = {
            "Content-Type": "application/json",
        };

        await axios
            .post(api + "/itemcompra", itemCompra, { headers })
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
            .catch((erro) => {
                setStatus({
                    type: "404",
                    message: "Compra ID já existente.",
                });
            });
    };

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar Item da Compra</h1>
                </div>
                <div className="p-2">
                    {" "}
                    <Link
                        to="/listar-itemcompra"
                        className="btn btn-outline-success btn-sm"
                    >
                        Itens Compras
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
            <Form className="p-2" onSubmit={cadItemCompra}>
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
                        placeholder="Valor da Compra"
                        required
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Compra ID:</Label>
                    <Input
                        type="number"
                        name="CompraId"
                        placeholder="ID da Compra"
                        required
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Produto ID:</Label>
                    <Input
                        type="number"
                        name="ProdutoId"
                        placeholder="ID do Produto"
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