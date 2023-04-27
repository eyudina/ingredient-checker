import { useDispatch } from "react-redux";
import { removeIngredient } from "../../redux/ingredientSlice";
import ConfirmationModal from "./ConfirmationModal";
import { message } from "antd";

type Props = {
  id: string;
  callback?: () => any;
};

const RemoveIngredientModal = (props: Props) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeIngredient({ id: props.id }));
    message.success("Ingredient removed successfully");
    props.callback && props.callback();
  };

  return (
    <ConfirmationModal title="Remove Ingredient" onConfirm={handleDelete} />
  );
};

export default RemoveIngredientModal;
