import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProperty } from "../../redux/propertySlice";
import { TProperty } from "../../types";
import { Input, Space, message } from "antd";
import { v4 as uuidv4 } from "uuid";
import ConfirmationModal from "./ConfirmationModal";

const { TextArea } = Input;

type Props = {
  callback?: () => any;
};

const AddPropertyModal = (props: Props) => {
  const [propertyName, setPropertyName] = useState("");
  const [descriptionName, setDescriptionName] = useState("");

  const dispatch = useDispatch();

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPropertyName(e.target.value);
  };

  const handleDescriptionInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescriptionName(e.target.value);
  };

  const handleAddProperty = () => {
    if (propertyName.trim() !== "") {
      const newProperty: TProperty = {
        id: uuidv4(),
        name: propertyName,
        description: descriptionName,
      };
      dispatch(addProperty(newProperty));
      message.success(`Property "${newProperty.name}" added successfully`);
      setPropertyName("");
    } else {
      message.error("Property name cannot be empty");
    }
    props.callback && props.callback();
  };

  const modalContent = (
    <Space direction="vertical" size="small" style={{ width: "100%" }}>
      <Input
        value={propertyName}
        placeholder="Enter property name"
        onChange={handleNameInputChange}
      />
      <TextArea
        rows={4}
        value={descriptionName}
        placeholder="Enter description"
        onChange={handleDescriptionInputChange}
      />
    </Space>
  );
  return (
    <ConfirmationModal
      title="Add Property"
      onConfirm={handleAddProperty}
      okText="Add"
      onCancel={() => props.callback && props.callback()}
    >
      {modalContent}
    </ConfirmationModal>
  );
};

export default AddPropertyModal;
