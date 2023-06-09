import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ColumnsType } from "antd/lib/table";
import { Table, Tag, Button, Space } from "antd";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { RootState } from "../redux/store";
import { TProperty } from "types/types";
import AddPropertyModal from "./modals/AddPropertyModal";
import UpdatePropertyModal from "./modals/UpdatePropertyModal";
import RemovePropertyModal from "./modals/RemovePropertyModal";
import { IsAdmin } from "./AuthUtils";

const PropertiesTable = () => {
  const location = useLocation();

  const isAdmin = IsAdmin();

  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);

  const [recordToDelete, setRecordToDelete] = useState<string | undefined>(
    undefined
  );
  const [recordToUpdate, setRecordToUpdate] = useState<TProperty | undefined>(
    undefined
  );

  const handleDelete = () => {
    setRecordToDelete(undefined);
  };

  const handleUpdate = () => {
    setRecordToUpdate(undefined);
  };

  // If clicking on the property tag, show the properties table filtered by the selected property
  const queryParams = new URLSearchParams(location.search);
  const selectedPropertyName = queryParams.get("name");

  const [filteredName, setFilteredName] = useState<string | undefined>(
    selectedPropertyName || undefined
  );

  const properties = useSelector((state: RootState) => state.property);

  const columns: ColumnsType<TProperty> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
      render: (property) => (
        <Tag
          color="blue"
          bordered={false}
          key={property}
          style={{ cursor: "default" }}
        >
          {property}
        </Tag>
      ),
      filters: Array.from(
        new Set(properties.map((property) => property.name))
      ).map((name) => ({
        text: name,
        value: name,
      })),
      filteredValue: filteredName ? [filteredName] : undefined,
      onFilter: (value, record) => {
        setFilteredName(undefined);
        return record.name.includes(value.toString());
      },
      filterSearch: true,
      sorter: (a: TProperty, b: TProperty) => a.name.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    // Only show the action column if the user is an admin
    isAdmin
      ? {
          title: "Action",
          dataIndex: "action",
          key: "action",
          width: 120,
          fixed: "right",
          render: (_, record) => (
            <Space size="middle">
              <a
                onClick={() =>
                  setRecordToUpdate({
                    id: record.id,
                    name: record.name,
                    description: record.description,
                  })
                }
              >
                <EditTwoTone style={{ fontSize: 16 }} />
              </a>
              <a onClick={() => setRecordToDelete(record.id)}>
                <DeleteTwoTone style={{ fontSize: 16 }} />
              </a>
            </Space>
          ),
        }
      : {},
  ];

  return (
    <div style={{ maxWidth: 1280 }}>
      {recordToDelete && (
        <RemovePropertyModal id={recordToDelete} callback={handleDelete} />
      )}
      {recordToUpdate && (
        <UpdatePropertyModal
          id={recordToUpdate.id}
          name={recordToUpdate.name}
          description={recordToUpdate.description ?? ""}
          callback={handleUpdate}
        />
      )}
      {isAdmin && (
        <Space style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setShowAddPropertyModal(true)}
          >
            Add Property
          </Button>
          {showAddPropertyModal && (
            // When the modal is closed, setShowAddPropertyModal is called with false as the argument
            <AddPropertyModal callback={() => setShowAddPropertyModal(false)} />
          )}
        </Space>
      )}
      <Table<TProperty>
        dataSource={properties}
        columns={columns}
        scroll={{ x: 460 }}
      ></Table>
    </div>
  );
};

export default PropertiesTable;
