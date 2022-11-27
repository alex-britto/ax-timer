import styled, { css } from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const BaseCountdownButton = styled.button`
  ${({ theme }) => css`
    width: 100%;
    border: 0;
    padding: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
    font-weight: bold;

    color: ${theme.colors["gray-100"]};

    cursor: pointer;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  `}
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  ${({ theme }) => css`
    background-color: ${theme.colors["green-500"]};

    &:not(:disabled):hover {
      background-color: ${theme.colors["green-700"]};
    }
  `}
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
  ${({ theme }) => css`
    background-color: ${theme.colors["red-500"]};

    &:not(:disabled):hover {
      background-color: ${theme.colors["red-700"]};
    }
  `}
`;
