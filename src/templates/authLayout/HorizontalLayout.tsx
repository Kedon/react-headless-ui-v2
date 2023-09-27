import React from "react";
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import GridLayout from "./styles";

const HorizontalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <GridLayout>
            <Header />
            <Content>
                {children}
            </Content>
            <Header />
        </GridLayout>
    );
};

export default HorizontalLayout;