import * as React from "react";
import * as ReactDOMClient from "react-dom/client";
import { Box, Button, Center, ChakraProvider, Code, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import ReactGA from "react-ga4";

ReactGA.initialize("G-YDSW985FVQ");

const id = window.location.pathname.slice(1);

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  React.useEffect(() => {
    ReactGA.event({
      category: "acesso",
      action: id ?? "desconhecido"
    });
  }, []);
  function goTo(url, ref) {
    window.location.assign(url);

    ReactGA.event({
      category: "click",
      action: ref,
      label: id ?? "desconhecido"
    });
  }

  function openModal() {
    ReactGA.event({
      category: "click",
      action: 'pix',
      label: id ?? "desconhecido"
    });
    onOpen()
  }

  return (
    <Center
      padding={4}
      h="var(--chakra-vh)"
      display="flex"
      flexDirection="column"
      gap={3}
      sx={{
        "& button": {
          width: 250
        }
      }}
    >
      <Image src="https://amigoanimal.org.br/img/img-logo-amigo-animal.png" />
      <h2>Links Amigo Animal</h2>
      <Button
        onClick={() =>
          goTo("https://www.instagram.com/amigoanimalpr/", "instagram")
        }
        colorScheme="yellow"
      >
        Instagram
      </Button>
      <Button
        onClick={() =>
          goTo("https://www.facebook.com/AmigoAnimalCaes", "facebook")
        }
        colorScheme="yellow"
      >
        Facebook
      </Button>
      <Button
        onClick={() =>
          goTo(
            "https://app.picpay.com/payment?type=store&hash=aYhPRKrmPIKg4cTW",
            "picpay"
          )
        }
        colorScheme="yellow"
      >
        Doar via PicPay
      </Button>
      <Button onClick={openModal} colorScheme="yellow">Doar via PIX</Button>


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Doar via PIX</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src="/qrcode-pix.png" />

            <Code w="100%">00020126360014BR.GOV.BCB.PIX0114040862380001325204000053039865802BR5912Amigo Animal6008Curitiba62210517AMIGOANIMALCARTAZ6304CFB0</Code>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='yellow' mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
