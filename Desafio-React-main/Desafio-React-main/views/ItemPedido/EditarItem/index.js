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

export const EditarItemPedido = (props) => {
    const [id, setId] = useState(props.match.params.id);
    const [quantidade, setQuantidade] = useState("");
    const [valor, setValor] = useState("");
    const [ServicoId, setServicoId] = useState("");
    const [status, setStatus] = useState({
        type: "",
        message: "",
    });

    const edtItemPedido = async (e) => {
        e.preventDefault();

        const headers = {
            "Content-Type": "application/json",
        };

        await axios
            .put(
                api + "/editaritem/pedido/" + id,
                { id, quantidade, valor, ServicoId },
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
        const getItemPedido = async () => {
            await axios
                .get(api + "/itempedido/pedido/" + id)
                .then((response) => {
                    const pedido = response.data.pedidos.item_pedidos.find((item) => {
                        return item.PedidoId === Number(id);
                    });
                    setId(pedido.PedidoId);
                    setQuantidade(pedido.quantidade);
                    setValor(pedido.valor);
                    setServicoId(pedido.ServicoId);
                })
                .catch((erro) => {
                    console.log("Erro: Não foi possível se conectar a API.", erro);
                });
        };
        getItemPedido();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Item do Pedido</h1>
                    </div>
                    <div className="p-2">
                        <Link
                            to="/listar-pedido"
                            className="btn btn-outline-primary btn-sm"
                        >
                            Pedidos
                        </Link>
                    </div>
                    <div className="p-2">
                        <Link
                            to="/listar-servico"
                            className="btn btn-outline-primary btn-sm"
                        >
                            Serviços
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

                <Form className="p-2" onSubmit={edtItemPedido}>
                    <FormGroup className="p-2">
                        <Label>ID Pedido:</Label>
                        <Input
                            type="number"
                            name="id"
                            placeholder="id do pedido"
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
                            placeholder="Valor do Pedido"
                            defaultValue={valor}
                            onChange={(item) => setValor(item.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Serviço ID:</Label>
                        <Input
                            type="number"
                            name="ServicoId"
                            placeholder="Serviço ID"
                            disabled
                            defaultValue={ServicoId}
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