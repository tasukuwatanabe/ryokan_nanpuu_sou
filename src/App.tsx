import Wrapper from "./components/Wrapper";
import Container from "./components/Container";
import PageGrid from "./components/PageGrid";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from "styled-components";

const DIV_Content = styled.div`
  flex-grow: 1;
`;

const App = () => {
  return (
    <Wrapper>
      <Header />
      <DIV_Content>
        <Container>
          <PageGrid>
            <aside>Room Filter</aside>
            <main>Room List</main>
          </PageGrid>
        </Container>
      </DIV_Content>
      <Footer />
    </Wrapper>
  );
};

export default App;
