import * as React from 'react';
import * as $ from 'jquery';
import 'bootstrap-colorpicker';

interface Props {
  onColorPick: (color: string) => void;
  color?: string;
}

export class ColorPicker extends React.Component<Props, {}> {
  private inputPicker: HTMLInputElement;

  constructor(props: Props) {
    super(props);

    this.pickColor = this.pickColor.bind(this);
    this.setInputPicker = this.setInputPicker.bind(this);
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label className="control-label col-sm-5" htmlFor="txtColor">Color</label>
          <div className="col-sm-7">
            <input id="txtColor" type="text" className="form-control readonly" readOnly placeholder="Pick a color"
              ref={this.setInputPicker} onBlur={this.pickColor} />
          </div>
        </div>
      </div>
    );
  }

  private setInputPicker(inputPicker: HTMLInputElement) {
    return this.inputPicker = inputPicker;
  }

  pickColor(event: React.FocusEvent<HTMLInputElement>) {
    // Send back color to <App />
    this.props.onColorPick(event.currentTarget.value);
  }

  componentDidMount() {
    // Initialize jQuery colorpicker
    $(this.inputPicker)['colorpicker']({
      color: this.props.color,
      align: 'right'
    });
  }

  componentDidUpdate() {
    // Apply the new value in colorpicker
    $(this.inputPicker)['colorpicker']('setValue', this.props.color);
    $(this.inputPicker)['colorpicker']('show');

  }

  componentWillUnmount() {
    // Destroy jQuery colorpicker
    $(this.inputPicker)['colorpicker']('destroy');
  }

}
