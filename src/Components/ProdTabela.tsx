import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Flex,
    Img,
    IconButton,
    Button,
    Icon,
    Box,
    Text,
    InputGroup,
    InputLeftElement,
    Input,
} from '@chakra-ui/react';

import axios from 'axios';
;
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { FaSearch, FaSort } from 'react-icons/fa';

const API = 'https://homologacao.windel.com.br:3000';

interface IProduto {
    imagemProduto: string;
    nome: string;
    referencia: string;
    valorVenda: number;
    fabricante: string;
    estoque: number;
    id: number;
}

export function ProdTabela() {
    const [produtos, setProdutos] = useState<IProduto[]>([]);
    const [ordem, setOrdem] = useState('asc');
    const [produtoData, setProdutoData] = useState<any>({});
    const [filtroNome, setFiltroNome] = useState('');
    const [filtroReferencia, setFiltroReferencia] = useState('');
    const [filtroFabricante, setFiltroFabricante] = useState('');

    const router = useRouter();

    //deletar produto
    const handleDelete = async (id: number) => {
        await axios
            .delete(API + '/teste-front/' + id)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        setProdutos((prevState) => prevState.filter((data) => data.id !== id));
    };

    const handleSortByEstoque = () => {
        if (ordem === 'asc') {
            setProdutos([...produtos].sort((a, b) => a.estoque - b.estoque));
            setOrdem('desc');
        } else {
            setProdutos([...produtos].sort((a, b) => b.estoque - a.estoque));
            setOrdem('asc');
        }
    };

    const handleSortByVlrVenda = () => {
        if (ordem === 'asc') {
            setProdutos(
                [...produtos].sort((a, b) => a.valorVenda - b.valorVenda)
            );
            setOrdem('desc');
        } else {
            setProdutos(
                [...produtos].sort((a, b) => b.valorVenda - a.valorVenda)
            );
            setOrdem('asc');
        }
    };

    useEffect(() => {
        fetch(API + '/teste-front')
            .then((response) => response.json())
            .then((data) => setProdutos(data));
    }, []);
    const PRODUTOS_POR_PAGINA = 4;
    const [paginaAtual, setPaginaAtual] = useState(1);

    const indiceUltimoProduto = paginaAtual * PRODUTOS_POR_PAGINA;
    const indicePrimeiroProduto = indiceUltimoProduto - PRODUTOS_POR_PAGINA;

    const produtosExibidos = produtos
        .filter(
            (produto) =>
                produto.nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
                produto.referencia
                    .toLowerCase()
                    .includes(filtroReferencia.toLowerCase()) &&
                produto.fabricante
                    .toLowerCase()
                    .includes(filtroFabricante.toLowerCase())
        )
        .slice(indicePrimeiroProduto, indiceUltimoProduto);

    const limpCampos = () => {
        setFiltroFabricante('');
        setFiltroNome('');
        setFiltroReferencia('');
    };
    return (
        <Flex flexDirection="column">
            <Flex
                border="1px solid gray"
                borderRadius="8px"
                padding="10px"
                ml="50px"
                mr="50px"
                mb="10px"
                justifyContent="space-between"
            >
                <Flex>
                    <Box mb="10px">
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={
                                    <Icon as={FaSearch} color="gray.300" />
                                }
                            />
                            <Input
                                type="text"
                                placeholder="Filtrar por nome"
                                value={filtroNome}
                                onChange={(e) => setFiltroNome(e.target.value)}
                            />
                        </InputGroup>
                    </Box>
                    <Box mb="10px">
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={
                                    <Icon as={FaSearch} color="gray.300" />
                                }
                            />
                            <Input
                                type="text"
                                placeholder="Filtrar por referência"
                                value={filtroReferencia}
                                onChange={(e) =>
                                    setFiltroReferencia(e.target.value)
                                }
                            />
                        </InputGroup>
                    </Box>
                    <Box mb="10px">
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={
                                    <Icon as={FaSearch} color="gray.300" />
                                }
                            />
                            <Input
                                type="text"
                                placeholder="Filtrar por fabricante"
                                value={filtroFabricante}
                                onChange={(e) =>
                                    setFiltroFabricante(e.target.value)
                                }
                            />
                        </InputGroup>
                    </Box>
                </Flex>
                <Button
                    mt={4}
                    colorScheme="red"
                    onClick={limpCampos}
                    style={{ margin: '0 4px' }}
                >
                    Apagar Campos
                </Button>
            </Flex>
            <Flex
                border="1px solid gray"
                borderRadius="8px"
                padding="10px"
                ml="50px"
                mr="50px"
            >
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Imagem</Th>
                            <Th>Nome</Th>
                            <Th>Referência</Th>
                            <Th onClick={handleSortByVlrVenda} cursor="pointer">
                                Valor de Venda{' '}
                                <IconButton
                                    as={FaSort}
                                    mb="1"
                                    minW="0.5"
                                    ml=".5rem"
                                    height="1rem"
                                    aria-label=""
                                />
                            </Th>
                            <Th>Fabricante</Th>
                            <Th onClick={handleSortByEstoque} cursor="pointer">
                                Estoque{' '}
                                <IconButton
                                    as={FaSort}
                                    mb="1"
                                    minW="0.5"
                                    ml=".5rem"
                                    height="1rem"
                                    aria-label=""
                                />
                            </Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {produtos.length === 0 && (
                            <Text align="center">Não há Produtos!</Text>
                        )}

                        {produtosExibidos.map((produto: IProduto) => (
                            <Tr key={produto.id}>
                                <Td>
                                    <Img
                                        maxWidth="100px"
                                        maxHeight="100px"
                                        src={produto.imagemProduto}
                                        alt={produto.nome}
                                    />
                                </Td>
                                <Td>
                                    <Box maxW="300px" wordBreak="break-word">
                                        {produto.nome}
                                    </Box>
                                </Td>
                                <Td>{produto.referencia}</Td>
                                <Td>
                                    {Intl.NumberFormat('pt-br', {
                                        style: 'currency',
                                        currency: 'BRL',
                                        minimumFractionDigits: 2,
                                    }).format(produto.valorVenda)}
                                </Td>
                                <Td>{produto.fabricante}</Td>
                                <Td
                                    style={{
                                        color:
                                            produto.estoque === 0
                                                ? 'red'
                                                : 'black',
                                    }}
                                >
                                    {produto.estoque === 0
                                        ? 'ESGOTADO'
                                        : produto.estoque}
                                </Td>
                                <Td>
                                    <IconButton
                                        aria-label=""
                                        size="md"
                                        colorScheme="red"
                                        icon={<BsTrash />}
                                        onClick={() => handleDelete(produto.id)}
                                        _hover={{ transform: 'scale(1.2)' }}
                                        style={{ margin: '0 4px' }} // adicionei uma margem horizontal de 4px
                                    />

                                    <IconButton
                                        onClick={() =>
                                            router.push(`/edit/${produto.id}`)
                                        }
                                        aria-label=""
                                        size="md"
                                        colorScheme="blue"
                                        icon={<BsPencil />}
                                        _hover={{ transform: 'scale(1.2)' }}
                                        style={{ margin: '0 4px' }} // adicionei uma margem horizontal de 4px
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Flex
                        justify="space-between"
                        alignItems="center"
                        marginTop="20px"
                    >
                        <Button
                            isDisabled={paginaAtual === 1}
                            onClick={() => setPaginaAtual(paginaAtual - 1)}
                        >
                            Anterior
                        </Button>
                        <div>{`Página ${paginaAtual}`}</div>
                        <Button
                            isDisabled={
                                produtosExibidos.length < PRODUTOS_POR_PAGINA
                            }
                            onClick={() => setPaginaAtual(paginaAtual + 1)}
                        >
                            Próxima
                        </Button>
                    </Flex>
                </Table>
            </Flex>
        </Flex>
    );
}
