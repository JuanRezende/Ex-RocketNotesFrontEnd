import { Container } from "./styles";

export function ButtonText({title, isActive = false, ...rest}) {
  return (
    <Container 
    title="button"
    isActive={isActive}
    {...rest}>
      {title}
    </Container>
  );
};