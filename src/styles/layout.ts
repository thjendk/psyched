import styled from 'styled-components';

export const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const ContentContainer = styled.div`
  margin: 1em auto;
  width: 100%;

  @media only screen and (max-width: 600px) {
    margin-top: 0;
  }
`;
