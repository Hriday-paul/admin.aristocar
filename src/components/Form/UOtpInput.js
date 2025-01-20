"use client";

import { ConfigProvider, Form, Input } from "antd";
import { Controller } from "react-hook-form";

const UOtpInput = ({
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
        components: {
          Input: {
            activeBorderColor: '#882578'
          }
        }
      }

      }
    >
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label={
              Object.keys(labelStyles)?.length > 0 ? (
                <label style={labelStyles}>{label}</label>
              ) : (
                label
              )
            }
            validateStatus={error ? "error" : ""}
            help={error ? error.message : ""}
          >
            <Input.OTP size="large" {...field} />
          </Form.Item>
        )}
      />
    </ConfigProvider>
  );
};

export default UOtpInput;
