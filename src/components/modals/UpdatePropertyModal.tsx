import { useState } from "react";
import { useDispatch } from "react-redux";
import { TProperty } from "../../types";
import { Input, Space } from "antd";
import { updateProperty } from "../../store/propertySlice";
import ConfirmationModal from "./ConfirmationModal";
const { TextArea } = Input;

type Props = {
  id: string;
  name: string;
  description: string;
  callback?: () => any;
};

export const UpdatePropertyModal = (props: Props) => {
  const [propertyName, setPropertyName] = useState(props.name);
  const [descriptionName, setDescriptionName] = useState(props.description);

  const dispatch = useDispatch();

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPropertyName(e.target.value);
  };

  const handleDescriptionInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescriptionName(e.target.value);
  };

  const handleUpdateProperty = () => {
    if (propertyName.trim() !== "") {
      const updatedProperty: TProperty = {
        id: props.id,
        name: propertyName,
        description: descriptionName,
      };
      dispatch(updateProperty(updatedProperty));
      setPropertyName("");
      setDescriptionName("");
    }
    props.callback && props.callback();
  };

  const modalContent = (
    <Space direction="vertical" size="small" style={{ width: "100%" }}>
      <Input
        value={propertyName}
        placeholder="Enter new property name"
        onChange={handleNameInputChange}
      />
      <TextArea
        rows={4}
        value={descriptionName}
        placeholder="Enter new description"
        onChange={handleDescriptionInputChange}
      />
    </Space>
  );
  return (
    <ConfirmationModal
      title="Update Property"
      onConfirm={handleUpdateProperty}
      okText="Update"
      onCancel={() => props.callback && props.callback()}
    >
      {modalContent}
    </ConfirmationModal>
  );
};