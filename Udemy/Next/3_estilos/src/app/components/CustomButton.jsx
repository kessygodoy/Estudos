"use client"

import styled from "styled-components"

const MyStyledButton = styled.button`
    background-color: #4ac;
    color: #fff;
    padding: 5px 10px;
    border: none;
    border-radius: 10px;
    `;

export default function CustomButton({ children }) {
  return (
    <MyStyledButton>{children}</MyStyledButton>
  );
}