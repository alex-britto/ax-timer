import styled, { css } from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";

interface ButtonProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: "purple",
  secondary: "orange",
  danger: "red",
  success: "green",
};

export const ButtonContainer = styled.button<ButtonProps>`
  ${({ theme, variant }) => css`
    width: 100px;
    height: 40px;
    border-radius: 4px;
    border: 0;
    margin: ${theme.space.s2};

    background-color: ${theme.colors["green-500"]};
    color: ${theme.colors.white};
    /* background-color: ${buttonVariants[variant]}; */
  `}
`;
