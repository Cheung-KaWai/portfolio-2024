import styled from "styled-components";
import { Project } from "@customTypes/Data";
import { data } from "@data/projects";

export const Home = () => {
  return (
    <Container>
      <Column>
        <div>
          <h2>{data.lab.name}</h2>
          {data.lab.data.map((x: Project) => (
            <Link href={`${data.lab.baseRoute}/${x.route}`}>{x.name}</Link>
          ))}
        </div>
        <div>
          <h2>{data.projects.name}</h2>
          {data.projects.data.map((x: Project) => (
            <Link href={`${data.projects.baseRoute}/${x.route}`}>{x.name}</Link>
          ))}
        </div>
      </Column>
      <Column></Column>
    </Container>
  );
};

const Container = styled.p`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  display: flex;
  gap: 10rem;
`;

const Link = styled.a`
  all: unset;
  cursor: pointer;
  color: white;
  display: block;
  margin: 1rem 0;
`;
