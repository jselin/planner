import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { units } from './App';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('tex', () => { expect(App.prototype.toTex(units.tex.label, 1)).toBeCloseTo(1); })
it('dtex', () => { expect(App.prototype.toTex(units.dtex.label, 10)).toBeCloseTo(1); })
it('den', () => { expect(App.prototype.toTex(units.den.label, 9)).toBeCloseTo(1); })

