import { render } from '@testing-library/react';

import { Container } from '..';

describe('Container component', () => {
  it('Should render.', () => {
    const { getByTestId } = render(<Container />);
    const container: HTMLElement = getByTestId('container');
    expect(container).toBeTruthy();
  });

  it('Should render the children element.', () => {
    const text = 'Hello World';
    const { getByText } = render(
      <Container>
        <h1>{text}</h1>
      </Container>,
    );
    getByText(text);
  });
});
