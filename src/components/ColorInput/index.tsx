import React, {useState} from 'react';
// import { Color, ColorChangeHandler, SliderPicker } from 'react-color';
import {FieldTitle} from 'ra-core';
import {useInput, TextInput} from 'react-admin';
import * as ReactColor from 'react-color';
import { useController, useFormContext } from 'react-hook-form';
import classes from './ColorInput.module.css';

/*
ColorField.propTypes = {
  addLabel: PropTypes.bool,
  className: PropTypes.string,
  elStyle: PropTypes.object,
  label: PropTypes.string,
  // record: PropTypes.object,
  source: PropTypes.string.isRequired,
};

ColorField.defaultProps = {
  addLabel: true,
};
*/

export interface ColorInputProps {
    label?: string;
    source: string;
    picker: "Alpha" | "Block" | "Chrome" | "Circle" | "Compact" | "Github" | "Hue" | "Material" | "Photoshop" | "Sketch" | "Slider" | "Swatches" | "Twitter";
    options: any;
    required: boolean;
    className?: string;
}

export const ColorInput = (
    {
        label = "Select a color",
        source,
        picker = 'Chrome',
        required = false,
        className = '',
        options,
        ...props
    }: ColorInputProps
) => {

    const formContext = useFormContext();
    const [color, setColor] = useState(formContext.getValues()[source]);
    const handleChange = (color: any) => {
        // Save the color to state
        setColor(color);
        // Save the color to the input field
        formContext.setValue(source, color.hex, { shouldDirty: true });
    }

    // Init the colorpicker
    const Picker = ReactColor[`${picker}Picker`];
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <TextInput
                source={source}
                margin="normal"
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => setIsOpen(true)}
                label={
                    <FieldTitle
                        label={label}
                        source={source}
                        isRequired={required}
                    />
                }
                className={className}
            />
            {
                isOpen ?
                    <div className={classes['ColorInput-popup']}>
                        <div
                            className={classes['ColorInput-cover']}
                            onClick={() => setIsOpen(false)}
                        />
                        <Picker
                            {...options}
                            color={color}
                            onChangeComplete={handleChange}
                        />
                    </div>
                    : null
            }
        </div>
    );

}

/*
export class ColorInputComponent extends React.Component {
    state = {
        show: false
    };

    handleOpen = () => this.setState({show: true});
    handleClose = () => this.setState({show: false});
    handleChange = ({hex}) => {
        this.props.input.onChange(hex);
        this.forceUpdate();
    };

    render() {
        const {
            label,
            source,
            meta,
            className,
            options,
            picker,
            input,
            resource,
            helperText,
            isRequired,
        } = this.props;

        const {
            touched,
            error,
        } = meta;

        const Picker = ReactColor[`${picker}Picker`];

        return (
            <div>
                <TextField
                    {...input}
                    margin="normal"
                    onFocus={this.handleOpen}
                    label={
                        <FieldTitle
                            label={label}
                            source={source}
                            resource={resource}
                            isRequired={isRequired}
                        />
                    }
                    error={!!(touched && error)}
                    helperText={touched && error || helperText}
                    className={className}
                />
                {
                    this.state.show ?
                        <div className="ColorInput-popup">
                            <div
                                className="ColorInput-cover"
                                onClick={this.handleClose}
                            />
                            <Picker
                                {...options}
                                color={input.value}
                                onChange={this.handleChange}
                            />
                        </div>
                        : null
                }
            </div>
        )
    }
};
*/
/*
ColorInputComponent.propTypes = {
  label: PropTypes.string,
  options: PropTypes.object,
  source: PropTypes.string,
  input: PropTypes.object,
  helperText: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  className: PropTypes.string,
  picker: (props, propName, componentName) =>
    !ReactColor[`${props[propName]}Picker`] &&
    new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`.`)
};

ColorInputComponent.defaultProps = {
  picker: 'Chrome',
  options: {
    disableAlpha: true
  },
};

*/
// export const ColorField = ColorFieldComponent;
// export const ColorInput = addField(ColorInputComponent);
