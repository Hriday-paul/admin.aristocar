import { Button, Upload } from "antd";
import { Form, Input } from "antd";
import { Camera, UploadCloud } from "lucide-react"; 
import Image from "next/image";
import { Controller } from "react-hook-form";

export default function UUpload({
  name,
  requiredMessage="Please upload",
  setSelectedFile,
  label,
  required=false,
  imageUrl,
  listType,
  multiple=false,
  showUploadList=false,
  size,
  placeholder,
  defaultValue,
  disabled = false,
  labelStyles = {},
  className,
  suffix,
  style,
  max, 
}) {
  const customRequest = ({ file } ) => {
    setSelectedFile(file);
  }; 
 const props ={
  name:name || "file",
   listType:listType || "picture",
  maxCount:max || 1, 
  customRequest:customRequest,
  disabled: disabled, 
  imageUrl: imageUrl,
  multiple:multiple,
  showUploadList: showUploadList,
 }
 
  return (
    <div className="flex justify-center">
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          name={name}
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          rules={[
            {
              required: required,
              message: requiredMessage,
            },
          ]}
          style={{
            textAlign: "center",
            border: "2px dashed #D9D9D9",
            paddingBlock: "30px",
            borderRadius: "10px",
            border:"2px solid #D9D9D9",
            position:"relative",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            overflow:"hidden",
            cursor:"pointer",
            width:"150px",
            height:"150px",
          }}
          // className="!h-[100px] !w-[100px] flex items-center justify-center overflow-hidden  "
        >
          
        <Upload { ...field} {...props} >
        {imageUrl ? (
         
            <Image
            height={1200}
            width={1200}
              className="rounded-md"
              src={imageUrl}
              alt="avatar"
            
              style={{
                width: "100%",
                height: "100%", 
                border: "none",
                display: "block",
              }}
            /> 
        
        ) : (
          <Button icon={<UploadCloud />}>{label}</Button>
        )} 
          </Upload>

         
        </Form.Item>
      
    )}
    /> 
    </div>
  );
}
