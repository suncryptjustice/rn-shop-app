import React from "react";
import { StyleSheet, Button, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";

import Colors from "../../constants/Colors";

const ProductsOverviewScreen = ({ props, navigation }) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            navigation.navigate("Details", {
              title: itemData.item.title,
              productId: itemData.item.id,
            });
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              navigation.navigate("Details", {
                title: itemData.item.title,
                productId: itemData.item.id,
              });
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
