import styled from 'styled-components';
const List = styled.ul`
  display: grid;
  max-width: calc((100vw - 48px));
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
const Section = styled.section``;
export { List, Section };
