import { Modal, Button } from "antd";

type Props = {
  title?: string;
  children?: React.ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
  cancelText?: string;
  okText?: string;
  callback?: () => any;
};

const ConfirmationModal = (props: Props) => {
  const handleCancel = () => {
    props.onCancel && props.onCancel();
  };

  const handleOk = () => {
    props.onConfirm();
  };

  return (
    <Modal
      title={props.title}
      open={true}
      afterClose={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          {props.cancelText || "Cancel"}
        </Button>,
        <Button key="ok" type="primary" onClick={handleOk}>
          {props.okText || "OK"}
        </Button>,
      ]}
      onCancel={handleCancel}
    >
      {props.children || <p>Are you sure?</p>}
    </Modal>
  );
};

export default ConfirmationModal;
