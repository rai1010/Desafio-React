import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarItemCompra = () => {
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: "",
        message: "",
    });

    const getItensCompras = async () => {
        axios
            .get(api + "/listaitemcompras")
            .then((response) => {
                console.log(response.data.itens);
                setData(response.data.itens);
            })
            .catch((erro) => {
                console.log("Erro: Sem conexão com a API.", erro);
            });
    };

    const apagarItemCompra = async (idCompra) => {
        console.log(idCompra);

        const headers = {
            "Content-Type": "application/json",
        };
        await axios
            .get(api + "/excluiritem/compra/" + idCompra, { headers })
            .then((response) => {
                console.log(response.data.error);
                getItensCompras();
            })
            .catch(() => {
                setStatus({
                    type: "error",
                    message: "Não foi possível conectar-se a API.",
                });
            });
    };

    useEffect(() => {
        getItensCompras();
    }, []);

    return (
        <div>
            <Container>
                <div className="p-2">
                    {status.type === "error" ? (
                        <Alert className="m-3" color="danger"></Alert>
                    ) : (
                        ""
                    )}
                </div>
                <div className="d-flex">
                    <div className="m-auto">
                        <h1>Visualizar Itens de Compras</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link
                            to="/inserir-itemcompra"
                            className="btn btn-outline-success btn-sm"
                        >
                            Cadastrar
                        </Link>
                    </div>
                </div>
                <Table striped className="text-center">
                    <thead>
                        <tr>
                            <th>Compra ID</th>
                            <th>Produto ID</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((itens) => (
                            <tr key={itens.CompraId}>
                                <td>{itens.CompraId}</td>
                                <td>{itens.ProdutoId}</td>
                                <td> {itens.quantidade} </td>
                                <td>
                                    {" "}
                                    {itens.valor.toLocaleString("pt-br", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </td>
                                <td>
                                    <Link
                                        to={"/editar-itemcompra/" + itens.CompraId}
                                        className="m-1 btn btn-outline-warning btn-sm"
                                    >
                                        Editar
                                    </Link>
                                    <span
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => apagarItemCompra(itens.CompraId)}
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