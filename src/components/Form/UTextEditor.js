"use client";

import { Controller } from "react-hook-form";
import { Form } from "antd";
// import JoditEditor, { Jodit } from "jodit-react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export default function UTextEditor({
  name,
  label,
  placeholder,
  height,
  onChange,
  onBlur,
}) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
        >
          <JoditEditor
            value={field.value || ""} // Set the initial value from the field
            config={{
              height: height || 500,
              placeholder: placeholder,
              uploader: {
                insertImageAsBase64URI: true,
              },
            }}
            onBlur={(content) => onBlur(content)} // Handle blur event
            onChange={(content) => onChange(content)} // Update form value
          />
        </Form.Item>
      )}
    />
  );
}
