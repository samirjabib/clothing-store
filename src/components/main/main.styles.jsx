import styled from 'styled-components';


export const MainContainer = styled.div `
  width: 100%;
  height:80vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position:relative;

  video{
    width:100%;
    height:100%;
    object-fit:cover
  }

`

export const TextContainer = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  color:white;
  position:absolute;
  width:100%;
  height:100%;
  object-fit:cover;
  font-size:4rem;
  flex-direction:column;
  backdrop-filter:blur(4px);
  font-weight:bold;
`