import React from "react";
import { StyleSheet, Button, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as productsActions from "../../store/actions/products";

import ProductItem from "../../components/shop/ProductItem";

import Colors from "../../constants/Colors";

const UserProductsScreen = ({ props, navigation }) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    Alert.alert("Are you sure", "Do you really want to delete this item", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        },
      },
    ]);
  };
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          image={itemData.item.imageUrl}
          price={itemData.item.price}
          onSelect={() => {}}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              navigation.navigate("Edit", {
                title: itemData.item.title,
                price: itemData.item.price,
                imageUrl: itemData.item.imageUrl,
                description: itemData.item.description,
                productId: itemData.item.id,
                edit: true,
              });
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              deleteHandler(itemData.item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;

const styles = StyleSheet.create({});
