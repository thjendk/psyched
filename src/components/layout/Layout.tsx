import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
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

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize(window.innerWidth);
    });

    return window.removeEventListener('resize', () => setWindowSize(window.innerWidth));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);

  if (windowSize > 400)
    return (
      <MainLayout>
        <Header />
        <ContentContainer>{children}</ContentContainer>
        <div style={{ flexGrow: 1 }} />
        <Footer />
      </MainLayout>
    );
  return (
    <Sidebar>
      <ContentContainer>{children}</ContentContainer>
      <div style={{ flexGrow: 1 }} />
      <Footer />
    </Sidebar>
  );
};

export default Layout;
