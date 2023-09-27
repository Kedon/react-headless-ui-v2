import React from "react";
import {Container, MenuContainer, MenuItemLink, MenuItemButton, Header} from "./styles";

import { useAuth } from "../../../../hooks/useAuth";

const Aside: React.FC = () => {

    const { signOut } = useAuth()
    return (
        <Container>
            <aside>
                <Header>Headless UI V2</Header>
                <MenuContainer>
                    <MenuItemLink href="/products">
                        Products
                    </MenuItemLink>
                    <MenuItemButton onClick={signOut}>
                        Sair
                    </MenuItemButton>
                </MenuContainer>
            </aside>
        </Container>
    );
};

export default Aside;