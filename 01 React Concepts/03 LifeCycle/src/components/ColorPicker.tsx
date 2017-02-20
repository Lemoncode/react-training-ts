import * as React from 'react';
import { Slider } from './Slider';
import { Color } from '../entity/Color';

interface Props {
  onColorPick: (color: string) => void;
  color?: string;
}

interface State {
  green: number;
  red: number;
  blue: number;
}


class ColorPicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const color = this.getColor(props.color);
    this.state = {
      red: color.red || 0,
      green: color.green || 0,
      blue: color.blue || 0,
    };

    this.onChangeRed = this.onChangeRed.bind(this);
    this.onChangeGreen = this.onChangeGreen.bind(this);
    this.onChangeBlue = this.onChangeBlue.bind(this);
    this.pickColor = this.pickColor.bind(this);
  }

  static defaultProps = {
    color: ''
  };

  onChangeRed(event: React.ChangeEvent<HTMLInputElement>) {
    const red = +event.currentTarget.value;
    this.setState({ red });
  }
  onChangeGreen(event: React.ChangeEvent<HTMLInputElement>) {
    const green = +event.currentTarget.value;
    this.setState({ green });
  }
  onChangeBlue(event: React.ChangeEvent<HTMLInputElement>) {
    const blue = +event.currentTarget.value;
    this.setState({ blue });
  }

  pickColor() {
    const color = this.RGB2Hex(this.state.red, this.state.green, this.state.blue);
    this.props.onColorPick(color);
  }

  private RGB2Hex(red: number, green: number, blue: number) {
    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
  }

  render() {
    const backgroundColor = `rgb(${this.state.red}, ${this.state.green}, ${this.state.blue})`;
    return (
      <div>
        <div className="form-control" style={{ backgroundColor }}></div>
        <Slider id="red" value={this.state.red} onChange={this.onChangeRed} />
        <Slider id="green" value={this.state.green} onChange={this.onChangeGreen} />
        <Slider id="blue" value={this.state.blue} onChange={this.onChangeBlue} />
        <div className="row">
          <div className="col-xs-12" style={{ marginTop: 25 }}>
            <button onClick={this.pickColor} className="btn btn-primary btn-block btn-sm">Pick</button>
          </div>
        </div>
      </div>
    );
  }

  private getColor(color: string) {
    const splitColor = color.slice(1);
    return {
      red: parseInt(splitColor.slice(0, 2), 16),
      green: parseInt(splitColor.slice(2, 4), 16),
      blue: parseInt(splitColor.slice(4), 16)
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    console.log('Colorpicker --> componentWillReceiveProps', nextProps);
    if (nextProps.color) {
      const {red, green, blue} = this.getColor(nextProps.color || '');
      this.setState({ red, green, blue });
    }
  }

  componentWillUnmount() {
    console.log('Colorpicker --> componentWillUnmount');
  }
}

export {
  ColorPicker
};
