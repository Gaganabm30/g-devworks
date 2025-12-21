import React from "react";
import styled from "styled-components";

const Circle = styled.div`
  width: 600px;
  height: 600px;
  border-radius: 50%;
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  background: #764c9a;
  filter: blur(200px);
  z-index: 0;
  opacity: 0.5;
  
  @media (max-width: 768px) {
    width: 400px;
    height: 400px;
    filter: blur(150px);
  }
`;

export default Circle;
