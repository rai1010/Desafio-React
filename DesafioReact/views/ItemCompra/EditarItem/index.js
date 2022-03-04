import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Alert,
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from "reactstrap";
import { api } from "../../../config";

export const EditarItemCompra = (props) => {
    const [id, setId] = useState(props.match.params.id);
    const [quantidade, setQuantidade] = useState("");
    const [valor, setValor] = useState("");
    const [ProdutoId, setProdutoId] = useState("");
    const [status, setStatus] = useState({
        type: "",
        message: "",
    });

    const edtItemCompra = async (e) => {
        e.preventDefault();

        const headers = {
            "Content-Type": "application/json",
        };

        await axios
            .put(
                api + "/editaritem/compra/" + id,
                { id, quantidade, valor, ProdutoId },
                { headers }
            )
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
        const getItemCompra = async () => {
            await axios
                .get(api + "/itemcompra/compra/" + id)
                .then((response) => {
                    const compra = response.data.compras.item_compras.find((item) => {
                        return item.CompraId === Number(id);
                    });
                    setId(compra.CompraId);
                    setQuantidade(compra.quantidade);
                    setValor(compra.valor);
                    setProdutoId(compra.ProdutoId);
                })
                .catch((erro) => {
                    console.log("Erro: Não foi se conectar a API.", erro);
                });
        };
        getItemCompra();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Item da Compra</h1>
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
                            to="/listar-produto"
                            className="btn btn-outline-primary btn-sm"
                        >
                            Produtos
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
                    <div className="p-2">
                        <Link
                            to="/listar-itemcompra"
                            className="btn btn-outline-primary btn-sm"
                        >
                            Item Compras
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

                <Form className="p-2" onSubmit={edtItemCompra}>
                    <FormGroup className="p-2">
                        <Label>ID Compra:</Label>
                        <Input
                            type="number"
                            name="id"
                            placeholder="id da Compra"
                            disabled
                            defaultValue={id}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Quantidade:</Label>
                        <Input
                            type="number"
                            name="quantidade"
                            placeholder="Quantidade"
                            defaultValue={quantidade}
                            onChange={(item) => setQuantidade(item.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Valor:</Label>
                        <Input
                            type="number"
                            name="valor"
                            placeholder="Valor da Compra"
                            defaultValue={valor}
                            onChange={(item) => setValor(item.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Produto ID:</Label>
                        <Input
                            type="number"
                            name="ProdutoId"
                            placeholder="Serviço ID"
                            disabled
                            defaultValue={ProdutoId}
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