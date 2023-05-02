import { useDispatch } from "react-redux";
import { message } from "antd";
import { removeProperty } from "../../redux/propertySlice";
import ConfirmationModal from "./ConfirmationModal";

type Props = {
  id: string;
  callback?: () => any;
};

const RemovePropertyModal = (props: Props) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeProperty({ id: props.id }));
    message.success("Property removed successfully");
    // Call the callback function to close the modal
    props.callback?.();
  };

  return (
    <ConfirmationModal
      title="Remove Property"
      onConfirm={handleDelete}
      onCancel={() => props.callback?.()}
    />
  );
};

export default RemovePropertyModal;
