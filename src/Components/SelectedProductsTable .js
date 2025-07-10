import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {DataTable} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SelectedProductsTable = ({
  selectedProducts,
  updateQuantity,
  removeProduct,
}) => {
  return (
    <ScrollView horizontal>
      <DataTable>
        {/* Table Header */}
        <DataTable.Header>
          <DataTable.Title>Sr. No</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title numeric>Quantity</DataTable.Title>
          <DataTable.Title>Actions</DataTable.Title>
        </DataTable.Header>

        {/* Table Rows */}
        {selectedProducts.map(item => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{item?.sr_no}</DataTable.Cell>
            <DataTable.Cell>{item?.name}</DataTable.Cell>
            <DataTable.Cell numeric>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/* Decrease Quantity */}
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 0}>
                  <AntDesign
                    name="minuscircle"
                    size={20}
                    color={item.quantity > 0 ? 'black' : 'gray'}
                  />
                </TouchableOpacity>

                {/* Quantity Display */}
                <Text style={{marginHorizontal: 10}}>{item.quantity}</Text>

                {/* Increase Quantity */}
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                  <AntDesign name="pluscircle" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </DataTable.Cell>

            {/* Remove Button */}
            <DataTable.Cell>
              <TouchableOpacity onPress={() => removeProduct(item.id)}>
                <Text style={{color: 'red'}}>Remove</Text>
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

export default SelectedProductsTable;
