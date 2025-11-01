import styled from "styled-components";
import { useDarkMode } from "../hooks/useDarkMode";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  width: 15rem;
  height: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? "/logo-dark.webp" : "/logo-light.webp";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" loading="lazy" width={150} height={150} />
    </StyledLogo>
  );
}

export default Logo;
