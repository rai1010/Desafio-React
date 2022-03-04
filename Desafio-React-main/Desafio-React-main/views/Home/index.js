import { Container } from "reactstrap";

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1> Home </h1>
                    </div>
                    <div className="p-2">
                        <a
                            href="/listar-cliente"
                            className="btn btn-outline-success btn-sm"
                        >
                            Clientes
                        </a>
                    </div>
                    <div className="p-2">
                        <a href="/listar-pedido" className="btn btn-outline-success btn-sm">
                            Pedidos
                        </a>
                    </div>
                    <div className="p-2">
                        <a
                            href="/listar-itempedido"
                            className="btn btn-outline-success btn-sm"
                        >
                            Itens Pedidos
                        </a>
                    </div>
                    <div className="p-2">
                        <a
                            href="/listar-servico"
                            className="btn btn-outline-success btn-sm"
                        >
                            Serviços
                        </a>
                    </div>
                    <div className="p-2">
                        <a href="/listar-compra" className="btn btn-outline-success btn-sm">
                            Compras
                        </a>
                    </div>
                    <div className="p-2">
                        <a
                            href="/listar-itemcompra"
                            className="btn btn-outline-success btn-sm"
                        >
                            Itens Compras
                        </a>
                    </div>
                    <div className="p-2">
                        <a
                            href="/listar-produto"
                            className="btn btn-outline-success btn-sm"
                        >
                            Produtos
                        </a>
                    </div>
                </div>
            </Container>
        </div>
    );
};