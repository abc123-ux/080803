const orderData = [
    {
      orderNumber: "ORD001",
      status: "Processing",
      orderDate: "2023-01-15",
      deliveryAddress: "123 Main St, City, Country",
      // Add more order-related information here
    },
    {
      orderNumber: "ORD002",
      status: "Shipped",
      orderDate: "2023-02-05",
      deliveryAddress: "456 Elm St, Town, Country",
      // Add more order-related information here
    },
    // Add more orders as needed
  ];
  
  export const getOrders = () => {
    return orderData;
  };
  
  export const getOrderDetails = (orderNumber) => {
    // Implement logic to retrieve order details by orderNumber if needed
  };
  