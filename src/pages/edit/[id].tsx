import { useState, useEffect, FormEvent } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    ChakraProvider,
    Grid,
    Flex,
    InputGroup,
    InputLeftElement,
    Icon,
    Box,
    Text,
    Spinner,
    IconButton,
} from '@chakra-ui/react';
import { FaMoneyBillAlt } from 'react-icons/fa';

import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { ArrowLeftIcon } from '@chakra-ui/icons';

const API = 'https://www.homologacao.windel.com.br:3000';

export default function editProduto(props: { id: string }) {
    const router = useRouter();

    const { id } = router.query;
    const [nome, setNome] = useState('');
    const [valorVenda, setValorVenda] = useState('');
    const [referencia, setReferencia] = useState('');
    const [unidadeMedida, setUnidadeMedida] = useState('');
    const [fabricante, setFabricante] = useState('');
    const [estoque, setEstoque] = useState('');
    const [imagemProduto, setImagemProduto] = useState('');
    const [loading, setLoading] = useState(true); // inicia com "true"

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API}/teste-front/${id}`);
                const data = response.data; // os dados do produto
                setNome(data.nome);
                setValorVenda(data.valorVenda);
                setReferencia(data.referencia);
                setUnidadeMedida(data.unidadeMedida);
                setFabricante(data.fabricante);
                setEstoque(data.estoque);
                setImagemProduto(data.imagemProduto);
                setLoading(false); // indica que os dados foram carregados
            } catch (error) {
                console.error(error);
                setLoading(false); // trata o erro, caso ocorra
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();

        const data = {
            nome,
            valorVenda: parseFloat(valorVenda),
            referencia,
            unidadeMedida,
            fabricante,
            estoque: parseFloat(estoque),
            imagemProduto,
        };

        try {
            await axios.patch(`${API}/teste-front/${id}`, data);
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    const limpCampos = () => {
        setNome('');
        setValorVenda('');
        setReferencia('');
        setUnidadeMedida('');
        setFabricante('');
        setEstoque('');
        setImagemProduto('');
    };

    if (loading) {
        return (
            <Flex>
                <Spinner
                    color="red.500"
                    width="100vh"
                    height="100vh"
                    ml="400px"
                />
            </Flex>
        );
    }

    return (
        <ChakraProvider>
            <Flex
                w="50%"
                m="auto"
                borderBottom="1px solid"
                borderColor="gray.300"
                borderRadius="lg"
                p="16px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    letterSpacing="tight"
                    w="64"
                >
                    Editar Produto
                </Text>
                <Link href="/">
                    <IconButton
                        colorScheme=""
                        aria-label="Call Segun"
                        size="lg"
                        children={<Icon as={ArrowLeftIcon} color="gray.300" />}
                        _hover={{ transform: 'scale(1.4)' }}
                    />
                </Link>
            </Flex>
            <Box
                w="50%"
                m="auto"
                border="1px solid"
                borderColor="gray.300"
                borderRadius="lg"
                p="16px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt="10px"
            >
                <Flex display="flex" flexDirection="column" p="5px">
                    <Flex justifyContent="center" align="flex-end">
                        <form onSubmit={handleSubmit}>
                            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                                <FormControl gridColumn="span 2" isRequired>
                                    <FormLabel>Nome do produto</FormLabel>
                                    <Input
                                        type="text"
                                        value={nome}
                                        onChange={(event) =>
                                            setNome(event.target.value)
                                        }
                                        placeholder="Descrição"
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Valor de Venda</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={
                                                <Icon
                                                    as={FaMoneyBillAlt}
                                                    color="gray.300"
                                                />
                                            }
                                        />
                                        <Input
                                            type="number"
                                            value={valorVenda}
                                            onChange={(event) =>
                                                setValorVenda(
                                                    event.target.value
                                                )
                                            }
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl gridColumn="span 2" isRequired>
                                    <FormLabel>Referencia</FormLabel>
                                    <Input
                                        type="text"
                                        value={referencia}
                                        onChange={(event) =>
                                            setReferencia(event.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Unidade de Medida</FormLabel>
                                    <Input
                                        type="text"
                                        value={unidadeMedida}
                                        onChange={(event) =>
                                            setUnidadeMedida(event.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Fabricante</FormLabel>
                                    <Input
                                        type="text"
                                        value={fabricante}
                                        onChange={(event) =>
                                            setFabricante(event.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Estoque</FormLabel>
                                    <Input
                                        type="text"
                                        value={estoque}
                                        onChange={(event) =>
                                            setEstoque(event.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl gridColumn="span 3">
                                    <FormLabel>Imagem</FormLabel>
                                    <Input
                                        type="text"
                                        value={imagemProduto}
                                        onChange={(event) =>
                                            setImagemProduto(event.target.value)
                                        }
                                        placeholder="URL da imagem"
                                    />
                                    <Box
                                        border="1px solid"
                                        borderColor="gray.300"
                                        borderRadius="lg"
                                        p="10px"
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        mt="10px"
                                        maxHeight="500px"
                                        maxWidth="500px"
                                    >
                                        {imagemProduto && (
                                            <img
                                                src={imagemProduto}
                                                alt="Pré-visualização da imagem"
                                            />
                                        )}
                                    </Box>
                                </FormControl>
                            </Grid>
                            <Flex
                                align="center"
                                justify="right"
                                marginBottom="10px"
                                marginRight="25px"
                                mt="25px"
                            >
                                <Button
                                    mt={4}
                                    colorScheme="red"
                                    onClick={limpCampos}
                                    style={{ margin: '0 4px' }}
                                >
                                    Apagar Campos
                                </Button>
                                <Button
                                    mt={4}
                                    colorScheme="blue"
                                    type="submit"
                                    style={{ margin: '0 4px' }}
                                >
                                    Editar Produto
                                </Button>
                            </Flex>
                        </form>
                    </Flex>
                </Flex>
            </Box>
        </ChakraProvider>
    );
}
