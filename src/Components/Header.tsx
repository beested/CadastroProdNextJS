import { Flex, Text, Button, Icon, Spinner } from '@chakra-ui/react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Link from 'next/link';
import { useState } from 'react';

export function Header() {
    const [isLoading, setIsLoading] = useState(false);

    function handleClick() {
        setIsLoading(true);
    }

    return (
        <Flex display="flex" flexDirection="column" p="5px" ml="50px" mr="50px">
            <Flex
                justify="space-between"
                borderBottom="1px"
                p="5px"
                borderRadius={9}
            >
                <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    letterSpacing="tight"
                    w="64"
                >
                    Produtos
                </Text>

                {isLoading ? (
                    <Button
                        isLoading
                        loadingText="Carregando"
                        colorScheme="teal"
                        variant="outline"
                    >
                        Submit
                    </Button>
                ) : (
                    <Link href="/addProdutos">
                        <Button
                            bg="green.400"
                            _hover={{
                                bgColor: 'green.300',
                            }}
                            onClick={handleClick}
                            color="white"
                        >
                            <Icon as={AiOutlinePlusCircle} />
                            <span>Adicionar</span>
                        </Button>
                    </Link>
                )}
            </Flex>
        </Flex>
    );
}
