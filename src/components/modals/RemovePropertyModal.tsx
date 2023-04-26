import { useDispatch } from "react-redux";
import { removeProperty } from "../../store/propertySlice";
import ConfirmationModal from "./ConfirmationModal";

type Props = {
  id: string;
  callback?: () => any;
};

const RemovePropertyModal = (props: Props) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeProperty({ id: props.id }));
    props.callback && props.callback();
  };

  return <ConfirmationModal title="Remove Property" onConfirm={handleDelete} />;
};

export default RemovePropertyModal;
