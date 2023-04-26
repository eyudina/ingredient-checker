import { Table, Button, Tag, Space } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TIngredient, TProperty } from "../types";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useState } from "react";
import AddIngredientModal from "./modals/AddIngredientModal";
import { RemoveIngredientModal } from "./modals/RemoveIngredientModal";
import UpdateIngredientModal from "./modals/UpdateIngredientModal";
import { useNavigate } from "react-router-dom";

export const IngredientsTable = () => {
  const navigate = useNavigate();

  const [showAddIngredientModal, setShowAddIngredientModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | undefined>(
    undefined
  );
  const [recordToUpdate, setRecordToUpdate] = useState<TIngredient | undefined>(
    undefined
  );

  const ingredients = useSelector((state: RootState) => state.ingredient);
  const properties = useSelector((state: RootState) => state.property);

  const handleDelete = () => {
    setRecordToDelete(undefined);
  };

  const handleUpdate = () => {
    setRecordToUpdate(undefined);
  };

  const handlePropertyClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const propertyName = e.currentTarget.innerText;
    navigate(`/properties?name=${propertyName}`);
  };

  const columns: ColumnsType<TIngredient> = [
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
      render: (ingredient) => (
        <div style={{ cursor: "default" }}>{ingredient}</div>
      ),
      filters: Array.from(
        new Set(ingredients.map((ingredient) => ingredient.name))
      ).map((name) => ({
        text: name,
        value: name,
      })),

      onFilter: (value, record) => record.name.includes(value.toString()),
      filterSearch: true,

      sorter: (a: TIngredient, b: TIngredient) => a.name.localeCompare(b.name),
    },
    {
      title: "Properties",
      dataIndex: "properties",
      filters: properties.map((property) => {
        return {
          text: property.name,
          value: property.name,
        };
      }),

      onFilter: (value, record) =>
        record.properties.some((property) =>
          property.name.startsWith(value.toString())
        ),
      filterSearch: true,
      render: (properties: TProperty[]) => (
        <Space size="small" wrap>
          {properties.map((property) => (
            <Tag
              color="blue"
              bordered={false}
              key={property.id}
              style={{ cursor: "pointer" }}
              onClick={handlePropertyClick}
            >
              {property.name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() =>
              setRecordToUpdate({
                id: record.id,
                name: record.name,
                properties: record.properties,
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
        <RemoveIngredientModal id={recordToDelete} callback={handleDelete} />
      )}
      {recordToUpdate && (
        <UpdateIngredientModal
          id={recordToUpdate.id}
          name={recordToUpdate.name}
          properties={recordToUpdate.properties}
          callback={handleUpdate}
        />
      )}
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowAddIngredientModal(true)}
        >
          Add Ingredient
        </Button>
        {showAddIngredientModal && (
          <AddIngredientModal
            callback={() => setShowAddIngredientModal(false)}
          />
        )}
      </Space>
      <Table<TIngredient> dataSource={ingredients} columns={columns} />
    </>
  );
};
