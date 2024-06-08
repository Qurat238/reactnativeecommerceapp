import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    let startPage = currentPage;
    let endPage = currentPage + 1;

    if (currentPage === totalPages) {
      startPage = Math.max(currentPage - 1, 1);
      endPage = currentPage;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <TouchableOpacity key={i} onPress={() => onPageChange(i)}>
          <Text
            style={[styles.pageNumber, i === currentPage && styles.activePage]}
          >
            {i}
          </Text>
        </TouchableOpacity>
      );
    }

    return pages;
  };

  const handlePrevPageClick = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };

  const handleNextPageClick = () => {
    onPageChange(Math.min(currentPage + 1, totalPages));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePrevPageClick}
        disabled={currentPage === 1}
      >
        <Text style={styles.navButton}>{"<"}</Text>
      </TouchableOpacity>
      {renderPageNumbers()}
      <TouchableOpacity
        onPress={handleNextPageClick}
        disabled={currentPage === totalPages}
      >
        <Text style={styles.navButton}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
  },
  pageNumber: {
    marginHorizontal: 5,
    backgroundColor: "#FF9B42",
    borderRadius: 10,
    padding: 20,
    fontWeight: "900",
    color: "#fff",
    fontSize: 20,
  },
  activePage: {
    fontWeight: "bold",
  },
  navButton: {
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 30,
    color: "#fff",
  },
});

export default Pagination;
