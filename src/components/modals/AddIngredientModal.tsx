import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addIngredient } from "../../redux/ingredientSlice";
import { TIngredient } from "../../types/types";
import { Input, Select, Space, message } from "antd";
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
    // If the ingredient name is not empty, create a new ingredient object and dispatch the addIngredient action
    if (ingredientName.trim() !== "") {
      const newIngredient: TIngredient = {
        id: uuidv4(),
        name: ingredientName,
        properties: allProperties
          // Find selected properties by name from the Redux store and return the property id
          .filter((property) =>
            selectedProperties.find((p) => p === property.name)
          )
          .map((property) => {
            return { id: property.id };
          }),
      };
      dispatch(addIngredient(newIngredient));
      message.success(`Ingredient "${newIngredient.name}" added successfully`);
      setIngredientName("");
    } else {
      message.error("Ingredient name cannot be empty");
    }
    // Call the callback function to close the modal
    props.callback?.();
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
      onCancel={() => props.callback?.()}
    >
      {modalContent}
    </ConfirmationModal>
  );
};

export default AddIngredientModal;
