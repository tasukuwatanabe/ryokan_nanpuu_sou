import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from "styled-components";

const MAIN_content = styled.main`
  flex-grow: 1;
`;

const App = () => {
  return (
    <Wrapper>
      <Header />
      <MAIN_content />
      <Footer />
    </Wrapper>
  );
};

export default App;
