import styled from 'styled-components';


const GridLayout = styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 70px auto;
    grid-template-areas: 
        'MH' 
        'CT';
    height: 100vh;
`;

export default GridLayout;