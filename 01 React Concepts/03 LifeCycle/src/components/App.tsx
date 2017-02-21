import * as React from 'react';
import { ColorPicker } from './ColorPicker';

interface State {
  color: string;
  sent: boolean;
}

const commonColors = {
  Darkgreen: '#347B4F',
  Flesh: '#DBAE73',
  Earth: '#944C11',
  Moon: '#466579',
};


export class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      color: '',
      sent: false,
    };

    this.saveColor = this.saveColor.bind(this);
  }

  render() {
    return (
      <main className="container">
        <header>
          <h2 className="col-sm-6 col-sm-offset-1">React component lifecycle methods</h2>
        </header>
        <form className="form-horizontal">
          <div className="row">
            <div className="col-sm-8">
              <div className="form-group">
                <ColorPicker color={this.state.color} onColorPick={this.saveColor} />
              </div>
              <div className="form-group">
                <label className="control-label col-sm-5" htmlFor="txtSkin">Common colors</label>
                <div className="col-sm-7">
                  <button
                    type="button"
                    onClick={this.onCommonColorPick(commonColors.Darkgreen)}
                    className="btn btn-default white"
                    style={{ backgroundColor: commonColors.Darkgreen }}>Darkgreen</button>
                  <button
                    type="button"
                    onClick={this.onCommonColorPick(commonColors.Flesh)}
                    className="btn btn-default white"
                    style={{ backgroundColor: commonColors.Flesh }}>Flesh</button>
                  <button
                    type="button"
                    onClick={this.onCommonColorPick(commonColors.Earth)}
                    className="btn btn-default white"
                    style={{ backgroundColor: commonColors.Earth }}>Earth</button>
                  <button
                    type="button"
                    onClick={this.onCommonColorPick(commonColors.Moon)}
                    className="btn btn-default white"
                    style={{ backgroundColor: commonColors.Moon }}>Moon</button>
                  <span className="help-block">Pick one by clicking on it</span>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-4 col-sm-offset-5">
                  <button type="submit" className="btn btn-success btn-block">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main >
    );
  }

  onCommonColorPick(color: string) {
    // Create a new function based on color parameter to set it in the state
    return (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      this.saveColor(color);
    }
  }

  saveColor(color: string) {
    this.setState({ color });
  }

  shouldComponentUpdate(nextProps, nextState: State) {
    // Do not trigger render if colors are the same
    return this.state.color !== nextState.color;
  }

}
