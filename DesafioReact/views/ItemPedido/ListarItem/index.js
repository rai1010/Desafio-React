import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarItemPedido = () => {
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: "",
        message: "",
    });

    const getItensPedidos = async () => {
        axios
            .get(api + "/listaitempedidos")
            .then((response) => {
                console.log(response.data.itens);
                setData(response.data.itens);
            })
            .catch((erro) => {
                console.log("Erro: Sem conexão com a API.", erro);
            });
    };

    const apagarItemPedido = async (idPedido) => {
        console.log(idPedido);

        const headers = {
            "Content-type": "application/json",
        };

        await axios
            .get(api + "/excluiritem/pedido/" + idPedido, { headers })
            .then((response) => {
                console.log(response.data.error);
                getItensPedidos();
            })
            .catch(() => {
                setStatus({
                    type: "error",
                    message: "Não foi possível conectar-se a API.",
                });
            });
    };

    useEffect(() => {
        getItensPedidos();
    }, []);

    return (
        <div>
            <Container>
                <div className="p-2">
                    {status.type === "error" ? (
                        <Alert className="m-3" color="danger">
                            {status.message}
                        </Alert>
                    ) : (
                        " "
                    )}
                </div>
                <div className="d-flex">
                    <div className="m-auto">
                        <h1>Visualizar Itens de Pedidos</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link
                            to="/inserir-itempedido"
                            className="btn btn-outline-success btn-sm"
                        >
                            Cadastrar
                        </Link>
                    </div>
                </div>
                <Table striped className="text-center">
                    <thead>
                        <tr>
                            <th>Pedido ID</th>
                            <th>Serviço ID</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((itens) => (
                            <tr key={itens.PedidoId}>
                                <td>{itens.PedidoId}</td>
                                <td>{itens.ServicoId}</td>
                                <td>{itens.quantidade}</td>
                                <td>
                                    {itens.valor.toLocaleString("pt-br", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}{" "}
                                </td>
                                <td>
                                    <Link
                                        to={"/editar-itempedido/" + itens.PedidoId}
                                        className="m-1 btn btn-outline-warning btn-sm"
                                    >
                                        Editar
                                    </Link>
                                    <span
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => apagarItemPedido(itens.PedidoId)}
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