import { useDispatch } from "react-redux";
import { removeIngredient } from "../../store/ingredientSlice";
import ConfirmationModal from "./ConfirmationModal";

type Props = {
  id: string;
  callback?: () => any;
};

export const RemoveIngredientModal = (props: Props) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeIngredient({ id: props.id }));
    props.callback && props.callback();
  };

  return (
    <ConfirmationModal title="Remove Ingredient" onConfirm={handleDelete} />
  );
};
