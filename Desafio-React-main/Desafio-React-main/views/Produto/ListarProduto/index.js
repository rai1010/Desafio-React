import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarProduto = () => {
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: "",
        message: "",
    });

    const getProdutos = async () => {
        axios
            .get(api + "/listaprodutos")
            .then((response) => {
                console.log(response.data.produtos);
                setData(response.data.produtos);
            })
            .catch(() => {
                console.log("Erro: Sem conexão com a API");
            });
    };

    const apagarProduto = async (idProduto) => {
        console.log(idProduto);

        const headers = {
            "Content-type": "application/json",
        };

        await axios
            .get(api + "/excluirproduto/" + idProduto, { headers })
            .then((response) => {
                console.log(response.data.error);
                getProdutos();
            })
            .catch(() => {
                setStatus({
                    type: "error",
                    message: "Não foi possível conectar-se a API.",
                });
            });
    };

    useEffect(() => {
        getProdutos();
    }, []);

    return (
        <Container>
            <div className="p-2">
                <hr className="m-1" />
                {status.type === "error" ? (
                    <Alert className="m-3" color="danger">
                        {" "}
                        {status.message}{" "}
                    </Alert>
                ) : (
                    " "
                )}
                {status.type === "success" ? (
                    <Alert className="m-3" color="succcess">
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
                    " "
                )}
            </div>
            <div className="d-flex">
                <div className="m-auto">
                    <h1> Visualizar Produtos</h1>
                </div>
                <div className="m-auto p-2">
                    <Link
                        to="/inserir-produto"
                        className="btn btn-outline-success btn-sm"
                    >
                        Cadastrar
                    </Link>
                </div>
            </div>
            <Table striped className="text-center">
                <thead>
                    <tr>
                        <th>Produto ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((produtos) => (
                        <tr key={produtos.id}>
                            <th> {produtos.id} </th>
                            <td> {produtos.nome} </td>
                            <td> {produtos.descricao} </td>
                            <td>
                                <Link
                                    to={"/editar-produto/" + produtos.id}
                                    className="m-1 btn btn-outline-warning btn-sm"
                                >
                                    Editar
                                </Link>

                                <span
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => apagarProduto(produtos.id)}
                                >
                                    Excluir
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};