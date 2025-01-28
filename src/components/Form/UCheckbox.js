"use client";

import { Checkbox, ConfigProvider, Form, Input } from "antd";
import { Controller } from "react-hook-form";

const UCheckbox = ({
    type,
    name,
    label,
    size,
    placeholder,
    defaultValue,
    disabled = false,
    labelStyles = {},
    className,
    suffix,
    style,
    max,
    required,
}) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorInfo: "#000000",
                },
                components: {
                    Table: {
                        headerBg: "#0A0A0B",
                    }
                }
            }}
        >
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item
                        validateStatus={error ? "error" : ""}
                        help={error ? error.message : ""}
                    >

                        <Checkbox
                            {...field}
                            id={name}
                            size={size}
                            placeholder={placeholder}
                            defaultChecked={defaultValue}
                            disabled={disabled}
                            className={`h-9 ${className}`}
                            suffix={suffix}
                            style={style}
                            max={max}
                        >
                            <span className="!mt-8">{Object.keys(labelStyles)?.length > 0 ? (
                            <label style={labelStyles}>{label}</label>
                        ) : (
                            label
                        )}</span>
                        </Checkbox>

                    </Form.Item>
                )}
            />
        </ConfigProvider>
    );
};

export default UCheckbox;
