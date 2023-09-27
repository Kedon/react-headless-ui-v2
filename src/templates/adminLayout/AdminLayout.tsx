import React from "react";
import Header from "./components/header/Header";
import Aside from "./components/aside/Aside";
import Content from "./components/content/Content";
import GridLayout from "./styles";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <GridLayout>
            <Header />
            <Aside />
            <Content>
                {children}
            </Content>
        </GridLayout>
    );
};

export default AdminLayout;