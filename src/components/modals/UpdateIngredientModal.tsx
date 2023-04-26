import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { TIngredient, TProperty } from "../../types";
import { Input, Select, Space, Tag } from "antd";
import { updateIngredient } from "../../store/ingredientSlice";
import ConfirmationModal from "./ConfirmationModal";

type Props = {
  id: string;
  name: string;
  properties: TProperty[];
  callback?: () => any;
};

const UpdateIngredientModal = (props: Props) => {
  const allProperties = useSelector((state: RootState) => state.property);

  const [ingredientName, setIngredientName] = useState(props.name);
  const [selectedProperties, setSelectedProperties] = useState<string[]>(
    props.properties.map((property) => property.name)
  );

  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientName(e.target.value);
  };

  const handleSelectChange = (value: string[]) => {
    setSelectedProperties(value);
  };

  const handleUpdateIngredient = () => {
    if (ingredientName.trim() !== "") {
      const updatedIngredient: TIngredient = {
        id: props.id,
        name: ingredientName,
        properties: allProperties
          .filter((prop) => selectedProperties.find((p) => p === prop.name))
          .map((prop) => {
            return { id: prop.id, name: prop.name };
          }),
      };
      dispatch(updateIngredient(updatedIngredient));
      setIngredientName("");
    }
    props.callback && props.callback();
  };

  const tagRender = (props: any) => {
    const { label, closable, onClose } = props;

    return (
      <Tag
        color="blue"
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  const modalContent = (
    <Space direction="vertical" size="small" style={{ width: "100%" }}>
      <Input
        value={ingredientName}
        placeholder="Enter new ingredient name"
        onChange={handleInputChange}
      />
      <Select
        mode="multiple"
        value={selectedProperties}
        style={{ width: "100%" }}
        allowClear
        placeholder="Please select properties"
        onChange={handleSelectChange}
        options={allProperties.map((option) => ({
          value: option.name,
          label: option.name,
        }))}
        tagRender={tagRender}
      />
    </Space>
  );

  return (
    <ConfirmationModal
      title="Update Ingredient"
      onConfirm={handleUpdateIngredient}
      okText="Update"
      onCancel={() => props.callback && props.callback()}
    >
      {modalContent}
    </ConfirmationModal>
  );
};

export default UpdateIngredientModal;
