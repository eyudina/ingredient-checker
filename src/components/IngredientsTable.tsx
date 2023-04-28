import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/lib/table";
import { Table, Button, Tag, Space } from "antd";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { RootState } from "../redux/store";
import { TIngredient, TProperty } from "../types";
import AddIngredientModal from "./modals/AddIngredientModal";
import UpdateIngredientModal from "./modals/UpdateIngredientModal";
import RemoveIngredientModal from "./modals/RemoveIngredientModal";
import { useIsAdmin } from "./auth";

export const IngredientsTable = () => {
  const navigate = useNavigate();

  const isAdmin = useIsAdmin();

  const [showAddIngredientModal, setShowAddIngredientModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<TIngredient | undefined>(
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
        record.properties.some((ingredientProperty) =>
          properties
            .find((property) => property.id === ingredientProperty.id)
            ?.name.toLowerCase()
            .includes(value.toString().toLowerCase())
        ),
      filterSearch: true,
      render: (ingredientProperties: TProperty[]) => (
        <Space size="small" wrap>
          {properties
            .filter((property) =>
              ingredientProperties
                .map((property) => property.id)
                .includes(property.id)
            )
            .map((property) => (
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
    isAdmin
      ? {
          title: "Action",
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
                    properties: record.properties,
                  })
                }
              >
                <EditTwoTone style={{ fontSize: 16 }} />
              </a>
              <a onClick={() => setRecordToDelete(record)}>
                <DeleteTwoTone style={{ fontSize: 16 }} />
              </a>
            </Space>
          ),
        }
      : {},
  ];

  return (
    <>
      {recordToDelete && (
        <RemoveIngredientModal
          record={recordToDelete}
          callback={handleDelete}
        />
      )}
      {recordToUpdate && (
        <UpdateIngredientModal
          record={recordToUpdate}
          callback={handleUpdate}
        />
      )}
      {isAdmin && (
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
      )}
      <Table<TIngredient>
        scroll={{ x: 460 }}
        dataSource={ingredients}
        columns={columns}
      />
    </>
  );
};
