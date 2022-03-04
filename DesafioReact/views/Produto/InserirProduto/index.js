import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Alert,
} from "reactstrap";
import { api } from "../../../config";

export const InserirProduto = () => {
    const [produto, setProduto] = useState({
        nome: "",
        descricao: "",
    });

    const [status, setStatus] = useState({
        type: "",
        message: "",
    });

    const valorInput = (e) =>
        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
        });

    const cadProduto = async (e) => {
        e.preventDefault();

        const headers = {
            "Content-Type": "application/json",
        };
        await axios
            .post(api + "/produto", produto, { headers })
            .then((response) => {
                if (response.data.error) {
                    setStatus({
                        type: "error",
                        message: response.sata.message,
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
                    <h1>Cadastrar Produto</h1>
                </div>
                <div className="p-2">
                    <Link
                        to="/listar-produto"
                        className="btn btn-outline-success btn-sm"
                    >
                        Produtos
                    </Link>
                </div>
            </div>
            <hr className="m-1" />
            {status.type === "error" ? (
                <Alert className="m-3" color="danger">
                    {status.message}
                </Alert>
            ) : (
                " "
            )}
            {status.type === "success" ? (
                <Alert className="m-3" color="success">
                    {status.message}
                </Alert>
            ) : (
                " "
            )}
            {status.type === "404" ? (
                <Alert className="m-3" color="danger">
                    {" "}
                    {status.message}{" "}
                </Alert>
            ) : (
                " "
            )}

            <Form className="p-2" onSubmit={cadProduto}>
                <FormGroup className="p-2">
                    <Label>Nome:</Label>
                    <Input
                        name="nome"
                        required
                        placeholder="Nome do Produto"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Descrição:</Label>
                    <Input
                        name="descricao"
                        required
                        placeholder="Descrição do Produto"
                        type="text"
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