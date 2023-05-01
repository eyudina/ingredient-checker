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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientName(e.target.value);
  };

  const handleSelectChange = (value: string[]) => {
    const selectedProperties = allProperties.filter((prop) =>
      value.includes(prop.name)
    );
    setSelectedProperties(selectedProperties);
  };

  const handleUpdateIngredient = () => {
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
        value={allProperties
          .filter((prop) =>
            selectedProperties
              .map((selectedProp) => selectedProp.id)
              .includes(prop.id)
          )
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
      onCancel={() => props.callback && props.callback()}
    >
      {modalContent}
    </ConfirmationModal>
  );
};

export default UpdateIngredientModal;
