import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/lib/table";
import { Table, Button, Tag, Space, Select, Row, Col } from "antd";
import {
  DeleteTwoTone,
  EditTwoTone,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { RootState } from "../redux/store";
import { TIngredient, TProperty } from "../types/types";
import AddIngredientModal from "./modals/AddIngredientModal";
import UpdateIngredientModal from "./modals/UpdateIngredientModal";
import RemoveIngredientModal from "./modals/RemoveIngredientModal";
import { IsAdmin } from "./AuthUtils";

const IngredientsTable = () => {
  const isAdmin = IsAdmin();

  const [showAddIngredientModal, setShowAddIngredientModal] = useState(false);

  const [recordToDelete, setRecordToDelete] = useState<TIngredient | undefined>(
    undefined
  );
  const [recordToUpdate, setRecordToUpdate] = useState<TIngredient | undefined>(
    undefined
  );

  const handleDelete = () => {
    setRecordToDelete(undefined);
  };

  const handleUpdate = () => {
    setRecordToUpdate(undefined);
  };

  const ingredients = useSelector((state: RootState) => state.ingredient);
  const properties = useSelector((state: RootState) => state.property);

  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

  const handlePropertySelect = (values: string[]) => {
    setSelectedProperties(values);
  };

  // If clicking on the property tag, show the properties table filtered by the selected property
  const navigate = useNavigate();

  const handlePropertyClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const propertyName = e.currentTarget.innerText;
    // The selected property name is passed as a query parameter
    navigate(`/properties?name=${propertyName}`);
  };

  // The options for the Select (Search) component
  const options = properties.map((property) => ({
    text: property.name,
    value: property.name,
    selected: selectedProperties.includes(property.name),
  }));

  // Filter the ingredients table by the selected properties
  const filteredData =
    // If select is empty, show all ingredients, otherwise filter by selected properties
    selectedProperties.length > 0
      ? ingredients.filter((ingredient) =>
          ingredient.properties.some((property) =>
            selectedProperties.includes(
              properties.find((p) => p.id === property.id)?.name || ""
            )
          )
        )
      : ingredients;

  const columns: ColumnsType<TIngredient> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
      render: (name) => <div style={{ cursor: "default" }}>{name}</div>,
      filters: Array.from(
        // Get all unique ingredient names
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
      key: "properties",
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
    // If user is admin, show action column with edit and delete buttons
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
    <div style={{ maxWidth: 1280 }}>
      {recordToDelete && (
        <RemoveIngredientModal
          record={recordToDelete}
          // When the modal is closed, setRecordToDelete is set to undefined
          callback={handleDelete}
        />
      )}
      {recordToUpdate && (
        <UpdateIngredientModal
          record={recordToUpdate}
          // When the modal is closed, setRecordToUpdate is set to undefined
          callback={handleUpdate}
        />
      )}
      <Row gutter={[16, 16]} style={{ paddingBottom: 16 }}>
        {/* If user is admin, allow add new ingredients to the table */}
        {isAdmin && (
          <Col flex={"none"}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setShowAddIngredientModal(true)}
            >
              Add Ingredient
            </Button>
            {showAddIngredientModal && (
              <AddIngredientModal
                // When the modal is closed, setShowAddIngredientModal is set to false
                callback={() => setShowAddIngredientModal(false)}
              />
            )}
          </Col>
        )}
        <Col flex={"auto"}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Search for properties"
            onChange={handlePropertySelect}
            options={options}
            suffixIcon={<SearchOutlined />}
          />
        </Col>
      </Row>
      <Table<TIngredient>
        scroll={{ x: 460 }}
        dataSource={filteredData}
        columns={columns}
      />
    </div>
  );
};

export default IngredientsTable;
