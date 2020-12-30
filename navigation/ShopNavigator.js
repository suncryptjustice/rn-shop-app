import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Platform } from "react-native";

import Colors from "../constants/Colors";

import HeaderButton from "../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import ProductsDetailScreen from "../screens/shop/ProductsDetailScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import CartScreen from "../screens/shop/CartScreen";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const OrdersStack = createStackNavigator();
const OUserProductsStack = createStackNavigator();
const ShopNavigator = createDrawerNavigator();

function OrdersStackNavigator() {
  return (
    <OrdersStack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : "",
        },
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Cart"
              iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          </HeaderButtons>
        ),
      })}
    >
      <Stack.Screen name="Orders" component={OrdersScreen} />
    </OrdersStack.Navigator>
  );
}

function UserProductsStackNavigator() {
  return (
    <OUserProductsStack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : "",
        },
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Cart"
              iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          </HeaderButtons>
        ),
      })}
    >
      <Stack.Screen
        name="My Products"
        component={UserProductsScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Cart"
                iconName={
                  Platform.OS === "android" ? "md-create" : "ios-create"
                }
                onPress={() => {
                  navigation.navigate("Edit", {
                    title: "Add New Product",
                    edit: false,
                  });
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="Edit"
        component={EditProductScreen}
        options={({ route }) => ({
          title: route.params?.title,
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Cart"
                iconName={
                  Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
                }
                onPress={() => {
                  route.params.submit();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </OUserProductsStack.Navigator>
  );
}

function ShopStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : "",
        },
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Cart"
              iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              onPress={() => {
                navigation.navigate("Cart");
              }}
            />
          </HeaderButtons>
        ),
      })}
    >
      <Stack.Screen
        name="All Products"
        component={ProductsOverviewScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.openDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="Details"
        component={ProductsDetailScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <NavigationContainer>
      <ShopNavigator.Navigator
        initialRouteName="Shop"
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "",
          },
          headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
        })}
      >
        <ShopNavigator.Screen
          name="Shop"
          component={ShopStackNavigator}
          options={{
            drawerIcon: (drawerConfig) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                size={23}
                color={Platform.OS === "android" ? "white" : Colors.primary}
              />
            ),
          }}
        />
        <ShopNavigator.Screen
          name="Orders"
          component={OrdersStackNavigator}
          options={{
            drawerIcon: (drawerConfig) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
                color={Platform.OS === "android" ? "white" : Colors.primary}
              />
            ),
          }}
        />
        <ShopNavigator.Screen
          name="My Products"
          component={UserProductsStackNavigator}
          options={{
            drawerIcon: (drawerConfig) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-create" : "ios-create"}
                size={23}
                color={Platform.OS === "android" ? "white" : Colors.primary}
              />
            ),
          }}
        />
      </ShopNavigator.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;
