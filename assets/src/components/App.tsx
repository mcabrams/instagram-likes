import * as React from 'react';
import { Container, Hero, Icon, Title, Section } from 'reactbulma';
import LoginContainer from '../containers/LoginContainer';
import InstagramStatsContainer from '../containers/InstagramStatsContainer';

export interface IAppProps { appName: string; }

export const App: React.SFC<IAppProps> = (props) => {
  return (
    <Container>
      <Section>
        <Hero>
          <Title spaced={true}>
            Who likes your Instagrams the most?
          </Title>
        </Hero>
      </Section>
      <Section>
        <LoginContainer />
      </Section>
      <Section>
        <InstagramStatsContainer />
      </Section>
    </Container>
  );
};
