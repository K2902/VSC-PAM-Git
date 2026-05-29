import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function TaskItem({
  item,
  onToggle,
  onDelete,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.taskContainer}
        onPress={() => onToggle(item.id)}
      >
        <Text
          style={[
            styles.taskText,
            item.done && styles.completed,
          ]}
        >
          {item.text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Text style={styles.deleteText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginVertical: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },

  taskContainer: {
    flex: 1,
  },

  taskText: {
    fontSize: 16,
    color: "#333",
  },

  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },

  deleteButton: {
    backgroundColor: "#ff4444",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },

  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});