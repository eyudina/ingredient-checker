import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addIngredient } from "../../store/ingredientSlice";
import { TIngredient } from "../../types";
import { Input, Select, Space } from "antd";
import { v4 as uuidv4 } from "uuid";
import ConfirmationModal from "./ConfirmationModal";

type Props = {
  callback?: () => any;
};

const AddIngredientModal = (props: Props) => {
  const allProperties = useSelector((state: RootState) => state.property);

  const [ingredientName, setIngredientName] = useState("");
  const [selectedProperties, setSelectedProperties] = useState<string[]>(
    allProperties.map((property) => property.name)
  );

  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientName(e.target.value);
  };

  const handleSelectChange = (property: string[]) => {
    setSelectedProperties(property);
  };

  const handleAddIngredient = () => {
    if (ingredientName.trim() !== "") {
      const newIngredient: TIngredient = {
        id: uuidv4(),
        name: ingredientName,
        properties: allProperties
          .filter((property) =>
            selectedProperties.find((p) => p === property.name)
          )
          .map((property) => {
            return { id: property.id, name: property.name };
          }),
      };
      dispatch(addIngredient(newIngredient));
      setIngredientName("");
    }
    props.callback && props.callback();
  };

  const modalContent = (
    <Space direction="vertical" size="small" style={{ width: "100%" }}>
      <Input
        value={ingredientName}
        placeholder="Enter ingredient name"
        onChange={handleInputChange}
      />
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        allowClear
        placeholder="Please select properties"
        onChange={handleSelectChange}
        options={allProperties.map((option) => ({
          value: option.name,
          laber: option.name,
        }))}
      />
    </Space>
  );

  return (
    <ConfirmationModal
      title="Add Ingredient"
      onConfirm={handleAddIngredient}
      okText="Add"
      onCancel={() => props.callback && props.callback()}
    >
      {modalContent}
    </ConfirmationModal>
  );
};

export default AddIngredientModal;
