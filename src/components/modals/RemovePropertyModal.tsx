import { useDispatch } from "react-redux";
import { removeProperty } from "../../redux/propertySlice";
import ConfirmationModal from "./ConfirmationModal";
import { message } from "antd";

type Props = {
  id: string;
  callback?: () => any;
};

const RemovePropertyModal = (props: Props) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeProperty({ id: props.id }));
    message.success("Property removed successfully");
    props.callback && props.callback();
  };

  return <ConfirmationModal title="Remove Property" onConfirm={handleDelete} />;
};

export default RemovePropertyModal;
