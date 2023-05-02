import { useDispatch } from "react-redux";
import { message } from "antd";
import { TIngredient } from "types/types";
import { removeIngredient } from "../../redux/ingredientSlice";
import ConfirmationModal from "./ConfirmationModal";

type Props = {
  record: TIngredient;
  callback?: () => any;
};

const RemoveIngredientModal = (props: Props) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeIngredient({ id: props.record.id }));
    message.success("Ingredient removed successfully");
    // Call the callback function to close the modal
    props.callback?.();
  };

  return (
    <ConfirmationModal
      title="Remove Ingredient"
      onConfirm={handleDelete}
      onCancel={() => props.callback?.()}
    />
  );
};

export default RemoveIngredientModal;
