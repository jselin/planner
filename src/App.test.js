import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import units from


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('tex', () => { expect(App.prototype.toTex('tex', 1)).toBeCloseTo(1); })
it('dtex', () => { expect(App.prototype.toTex('dtex', 10)).toBeCloseTo(1); })
it('den', () => { expect(App.prototype.toTex('den', 9)).toBeCloseTo(1); })
