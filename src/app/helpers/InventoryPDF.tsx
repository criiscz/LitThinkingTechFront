import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

interface Product {
  code: string;
  name: string;
  stock: number;
  price: number;
  currency: string;
}

interface InventoryPDFProps {
  products: Product[];
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  table: {
    display: "flex",
    width: "100%",
    border: "1px solid #000",
  },
  row: {
    flexDirection: "row",
    borderBottom: "1px solid #000",
    padding: 5,
  },
  header: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 10,
  },
});

function InventoryPDF({ products }: InventoryPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Inventario</Text>

        <View style={styles.table}>
          <View style={[styles.row, styles.header]}>
            <Text style={styles.cell}>Código</Text>
            <Text style={styles.cell}>Nombre</Text>
            <Text style={styles.cell}>Stock</Text>
            <Text style={styles.cell}>Precio</Text>
            <Text style={styles.cell}>Moneda</Text>
          </View>

          {products.map((product, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{product.code}</Text>
              <Text style={styles.cell}>{product.name}</Text>
              <Text style={styles.cell}>{product.stock}</Text>
              <Text style={styles.cell}>
                {product.price.toFixed(2)}
              </Text>
              <Text style={styles.cell}>{product.currency}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default InventoryPDF;
