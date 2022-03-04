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

export const EditarProduto = (props) => {
    const [id, setId] = useState(props.match.params.id);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    console.log(props);
    const [status, setStatus] = useState({
        type: "",
        message: "",
    });

    const edtProduto = async (e) => {
        e.preventDefault();

        const headers = {
            "Content-Type": "application/json",
        };

        await axios
            .put(api + "/atualizaproduto/" + id, { id, nome, descricao }, { headers })
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
        const getProduto = async () => {
            await axios
                .get(api + "/produto/" + id)
                .then((response) => {
                    setId(response.data.produto.id);
                    setNome(response.data.produto.nome);
                    setDescricao(response.data.produto.descricao);
                })
                .catch(() => {
                    console.log("Erro: Não foi possível se conectar a API.");
                });
        };
        getProduto();
    }, [id]);

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Editar Produto</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-produto" className="btn btn-outline-primary btn-sm">
                        Produtos
                    </Link>
                </div>
                <div className="p-2">
                    <Link to="/listar-cliente" className="btn btn-outline-primary btn-sm">
                        Clientes
                    </Link>
                </div>
                <div className="p-2">
                    <Link to="/listar-compra" className="btn btn-outline-primary btn-sm">
                        {" "}
                        Compras
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
                    {" "}
                    {status.message}{" "}
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
                ""
            )}

            <Form className="p-2" onSubmit={edtProduto}>
                <FormGroup className="p-2">
                    <Label>Produto ID:</Label>
                    <Input
                        type="number"
                        name="id"
                        disabled
                        placeholder="ID do Produto"
                        defaultValue={id}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Produto:</Label>
                    <Input
                        type="text"
                        name="nome"
                        placeholder="Nome do Produto"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Descrição:</Label>
                    <Input
                        type="text"
                        name="descricao"
                        placeholder="Descrição do Produto"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </FormGroup>
                <Button className="m-2" type="submit" outline color="success">
                    Salvar
                </Button>
            </Form>
        </Container>
    );
};