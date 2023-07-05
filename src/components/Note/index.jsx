import { Container } from "./styles";
import { Tag } from "../Tag";

export function Note({data, ...rest}){
  return(
    <Container {...rest}>
      <h1>{data.title}</h1>
      
      {
        data.tag &&
        <footer>
          {
            data.tag.map(tag => <Tag key={tag.id} title={tag.name} />)
          }
        </footer>
      }
    </Container>
  );
};