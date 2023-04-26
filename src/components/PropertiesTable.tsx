import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TProperty } from "types";
import { ColumnsType } from "antd/lib/table";
import { Table, Tag, Button, Space } from "antd";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { AddPropertyModal } from "./modals/AddPropertyModal";
import { UpdatePropertyModal } from "./modals/UpdatePropertyModal";
import { RemovePropertyModal } from "./modals/RemovePropertyModal";
import { useLocation } from "react-router-dom";

export const PropertiesTable = () => {
  const location = useLocation();

  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);

  const queryParams = new URLSearchParams(location.search);

  const selectedPropertyName = queryParams.get("name");

  const [filteredName, setFilteredName] = useState<string | undefined>(
    selectedPropertyName || undefined
  );
  const [recordToDelete, setRecordToDelete] = useState<string | undefined>(
    undefined
  );
  const [recordToUpdate, setRecordToUpdate] = useState<TProperty | undefined>(
    undefined
  );

  const properties = useSelector((state: RootState) => state.property);

  const handleDelete = () => {
    setRecordToDelete(undefined);
  };

  const handleUpdate = () => {
    setRecordToUpdate(undefined);
  };

  const columns: ColumnsType<TProperty> = [
    {
      title: "Name",
      dataIndex: "name",
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
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: 120,
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
    },
  ];

  return (
    <>
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
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowAddPropertyModal(true)}
        >
          Add Property
        </Button>
        {showAddPropertyModal && (
          <AddPropertyModal callback={() => setShowAddPropertyModal(false)} />
        )}
      </Space>
      <Table<TProperty> dataSource={properties} columns={columns}></Table>
    </>
  );
};