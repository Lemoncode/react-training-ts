import * as React from 'react';
import { ColorPicker } from './ColorPicker';
import { Color } from '../entity/Color';

interface State {
  isColorPickerOpen: boolean;
  color: string;
  editingColor: string
}

const commonColors = {
  Darkgreen: '#347B4F',
  Flesh: '#DBAE73',
  Earth: '#944C11',
  Moon: '#466579',
};


class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      isColorPickerOpen: false,
      color: '',
      editingColor: '',
    };
    this.openColorPicker = this.openColorPicker.bind(this);
    this.closeColorPicker = this.closeColorPicker.bind(this);
    this.saveColor = this.saveColor.bind(this);
  }

  render() {
    console.log('App --> render');
    return (
      <main className="container">
        <header>
          <h2 className="col-sm-6 col-sm-offset-1">React lifecycle methods</h2>
        </header>
        <form className="form-horizontal">
          <div className="row">
            <div className="col-sm-8">
              <div className="form-group">
                <ColorPicker color={this.state.editingColor} onColorPick={this.saveColor} />
                {/*<label className="control-label col-sm-5" htmlFor="txtColor">Color</label>
                <div className="col-sm-7">
                  <input id="txtColor" type="text" className="form-control readonly" readOnly
                    placeholder="Pick a color"
                    onClick={this.openColorPicker}
                    value={this.state.color || ''}
                     />
                </div>*/}
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
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-4 col-sm-offset-5">
                  <button type="submit" className="btn btn-success btn-block">Submit</button>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="col-sm-6">
                {/*this.state.isColorPickerOpen && <ColorPicker color={this.state.editingColor} onColorPick={this.saveColor} />*/}
              </div>
            </div>
          </div>
        </form>
      </main >
    );
  }

  onCommonColorPick(editingColor: string) {
    return (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const isColorPickerOpen = true;
      this.setState({ editingColor, isColorPickerOpen });
    }
  }

  saveColor(color: string) {
    const isColorPickerOpen = false;
    this.setState({ color, isColorPickerOpen });
  }

  openColorPicker() {
    console.log('App --> openColorPicker');
    const editingColor = this.state.color
    const isColorPickerOpen = true;
    this.setState({ isColorPickerOpen, editingColor });
  }

  closeColorPicker() {
    console.log('App --> closeColorPicker');
    this.setState({ isColorPickerOpen: false });
  }

  componentDidMount() {
    // document.addEventListener('click', this.closeColorPicker, false);
  }

  componentWillReceiveProps() {
    console.log('App --> componentWillReceiveProps()');
  }

  shouldComponentUpdate(nextProps, nextState: State) {
    console.log('App --> shouldComponentUpdate', this.state, nextState);
    return (
      this.state.isColorPickerOpen !== nextState.isColorPickerOpen
      || this.state.editingColor !== nextState.editingColor
    );
  }

  componentWillUpdate() {
    console.log('App --> componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('App --> componentDidUpdate');
  }

  componentWillUnmount() {
    // document.removeEventListener('click', this.closeColorPicker, false);
  }
}

export {
  App
};
