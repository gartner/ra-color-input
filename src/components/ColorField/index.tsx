import React from "react";
import {useFieldValue} from 'react-admin';
import {LightenDarkenColor} from '@palustris/js-utils'

export interface ColorFieldType {
    source: string;
    className?: string;
    type?: "square" | "circle";
    marginColor?: string;
}

export const ColorField = ({
                               source,
                               className = "",
                               type = "square",
                               marginColor = "auto",
                               ...rest
                           }: ColorFieldType) => {

    const fieldValue = useFieldValue({source: source});

    const getMarginColor = (): string => {
        if (marginColor === "auto") {
            return LightenDarkenColor(fieldValue, -20);
        }

        return marginColor;
    }


    let typeCss = {
        width: '20px',
        height: '20px',
        background: fieldValue,
        marginRight: '5px',
        borderWidth: '2px',
        borderColor: getMarginColor(),
        borderStyle: 'solid',
    };

    if (type === "circle") {
        typeCss = {
            // @ts-ignore
            alignItems: 'center',
            backgroundColor: fieldValue,
            borderRadius: 10,
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: getMarginColor(),
            display: 'inline-block',
            verticalAlign: 'middle',
            marginRight: '8px',
            height: '20px',
            width: '20px',
        };
    }

    return (
        <div style={{display: 'flex'}}>
            <div style={typeCss}/>
            <span className="{className}">{fieldValue}</span>
        </div>
    );
}
