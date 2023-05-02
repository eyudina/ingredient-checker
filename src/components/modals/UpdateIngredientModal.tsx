import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TIngredient } from "../../types/types";
import { Input, Select, Space, Tag, message } from "antd";
import { updateIngredient } from "../../redux/ingredientSlice";
import ConfirmationModal from "./ConfirmationModal";

type Props = {
  record: TIngredient;
  callback?: () => any;
};

const UpdateIngredientModal = (props: Props) => {
  const allProperties = useSelector((state: RootState) => state.property);

  const [ingredientName, setIngredientName] = useState(props.record.name);
  const [selectedProperties, setSelectedProperties] = useState<
    Pick<TIngredient, "id">[]
  >(props.record.properties);

  const dispatch = useDispatch();

  // Set the ingredient name to the value of the input field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientName(e.target.value);
  };

  // Set the selected properties to the value of the select field
  const handleSelectChange = (value: string[]) => {
    const selectedProperties = allProperties.filter((prop) =>
      value.includes(prop.name)
    );
    setSelectedProperties(selectedProperties);
  };

  // Update the ingredient
  const handleUpdateIngredient = () => {
    // If the ingredient name is not empty, create a new ingredient object and dispatch the updateIngredient action
    if (ingredientName.trim() !== "") {
      const updatedIngredient: TIngredient = {
        id: props.record.id,
        name: ingredientName,
        properties: selectedProperties,
      };
      dispatch(updateIngredient(updatedIngredient));
      message.success(
        `Ingredient "${updatedIngredient.name}" updated successfully`
      );
      setIngredientName("");
    } else {
      message.error("Ingredient name cannot be empty");
    }
    props.callback?.();
  };

  // Render the selected properties as tags
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
        // If the id of the current prop is included in the selectedProperties array, then it passes the test and is included in the filtered array. Otherwise, it's excluded from the filtered array.
        value={allProperties
          .filter((prop) =>
            selectedProperties
              .map((selectedProp) => selectedProp.id)
              .includes(prop.id)
          )
          // Call the name property of each prop object to create a new array of property names
          .map((prop) => prop.name)}
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
      onCancel={() => props.callback?.()}
    >
      {modalContent}
    </ConfirmationModal>
  );
};

export default UpdateIngredientModal;
