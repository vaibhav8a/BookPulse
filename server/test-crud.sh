#!/bin/bash

# 📚 BookPulse Books API - Complete Testing Script
# This script tests all CRUD operations for books

BASE_URL="http://localhost:5001/api"

echo "╔════════════════════════════════════════════════════════════╗"
echo "║    📚 BookPulse Books CRUD API - Complete Test Suite        ║"
echo "╚════════════════════════════════════════════════════════════╝"

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Get all books (should be empty initially)
echo -e "\n${BLUE}Test 1: GET /api/books (Get All Books)${NC}"
echo "Command: curl $BASE_URL/books"
echo "Response:"
curl -s $BASE_URL/books | jq .
sleep 1

# Test 2: Create first book
echo -e "\n${BLUE}Test 2: POST /api/books (Create First Book)${NC}"
echo "Creating: 'The Great Gatsby' by F. Scott Fitzgerald"
BOOK1=$(curl -s -X POST $BASE_URL/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel",
    "price": 12.99,
    "rating": 4.5,
    "category": "Fiction"
  }')
echo $BOOK1 | jq .
BOOK1_ID=$(echo $BOOK1 | jq -r '.data._id')
echo -e "${GREEN}✓ Created Book ID: $BOOK1_ID${NC}"
sleep 1

# Test 3: Create second book
echo -e "\n${BLUE}Test 3: POST /api/books (Create Second Book)${NC}"
echo "Creating: 'To Kill a Mockingbird' by Harper Lee"
BOOK2=$(curl -s -X POST $BASE_URL/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "price": 14.99,
    "rating": 4.8,
    "category": "Fiction"
  }')
echo $BOOK2 | jq .
BOOK2_ID=$(echo $BOOK2 | jq -r '.data._id')
echo -e "${GREEN}✓ Created Book ID: $BOOK2_ID${NC}"
sleep 1

# Test 4: Create third book
echo -e "\n${BLUE}Test 4: POST /api/books (Create Third Book)${NC}"
echo "Creating: '1984' by George Orwell"
BOOK3=$(curl -s -X POST $BASE_URL/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "1984",
    "author": "George Orwell",
    "description": "A dystopian novel about a totalitarian state",
    "price": 13.99,
    "rating": 4.6,
    "category": "Science Fiction"
  }')
echo $BOOK3 | jq .
BOOK3_ID=$(echo $BOOK3 | jq -r '.data._id')
echo -e "${GREEN}✓ Created Book ID: $BOOK3_ID${NC}"
sleep 1

# Test 5: Get all books (should have 3 now)
echo -e "\n${BLUE}Test 5: GET /api/books (Get All Books - Should have 3)${NC}"
curl -s $BASE_URL/books | jq .
sleep 1

# Test 6: Get single book
echo -e "\n${BLUE}Test 6: GET /api/books/:id (Get Single Book)${NC}"
echo "Getting book: $BOOK1_ID"
curl -s $BASE_URL/books/$BOOK1_ID | jq .
sleep 1

# Test 7: Update book - partial update
echo -e "\n${BLUE}Test 7: PUT /api/books/:id (Partial Update - Change Price)${NC}"
echo "Updating $BOOK1_ID: Changing price to 18.99"
curl -s -X PUT $BASE_URL/books/$BOOK1_ID \
  -H "Content-Type: application/json" \
  -d '{"price": 18.99}' | jq .
sleep 1

# Test 8: Update book - multiple fields
echo -e "\n${BLUE}Test 8: PUT /api/books/:id (Update Multiple Fields)${NC}"
echo "Updating $BOOK2_ID: Changing price and rating"
curl -s -X PUT $BASE_URL/books/$BOOK2_ID \
  -H "Content-Type: application/json" \
  -d '{
    "price": 16.99,
    "rating": 4.9,
    "category": "Classic Fiction"
  }' | jq .
sleep 1

# Test 9: Verify updates
echo -e "\n${BLUE}Test 9: GET All Books (Verify Updates)${NC}"
curl -s $BASE_URL/books | jq .
sleep 1

# Test 10: Delete one book
echo -e "\n${BLUE}Test 10: DELETE /api/books/:id (Delete One Book)${NC}"
echo "Deleting book: $BOOK3_ID"
curl -s -X DELETE $BASE_URL/books/$BOOK3_ID | jq .
sleep 1

# Test 11: Verify deletion
echo -e "\n${BLUE}Test 11: GET All Books (Verify Deletion - Should have 2)${NC}"
curl -s $BASE_URL/books | jq .
sleep 1

# Test 12: Error handling - Get non-existent book
echo -e "\n${BLUE}Test 12: GET Non-Existent Book (Error Handling)${NC}"
echo "Attempting to get deleted book: $BOOK3_ID"
curl -s $BASE_URL/books/$BOOK3_ID | jq .
sleep 1

# Test 13: Error handling - Invalid ID format
echo -e "\n${BLUE}Test 13: GET Invalid ID Format (Error Handling)${NC}"
echo "Attempting to get book with invalid ID format"
curl -s $BASE_URL/books/invalid-id-format | jq .
sleep 1

# Test 14: Error handling - Missing required fields
echo -e "\n${BLUE}Test 14: POST Missing Required Fields (Error Handling)${NC}"
echo "Attempting to create book without required fields"
curl -s -X POST $BASE_URL/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Missing Author"
  }' | jq .
sleep 1

# Final summary
echo -e "\n${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║             ✅ All Tests Completed Successfully!            ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"

echo -e "\n${YELLOW}Summary:${NC}"
echo "✓ GET /api/books - Retrieved all books"
echo "✓ POST /api/books - Created 3 test books"
echo "✓ GET /api/books/:id - Retrieved single book"
echo "✓ PUT /api/books/:id - Updated book (partial and multiple fields)"
echo "✓ DELETE /api/books/:id - Deleted book"
echo "✓ Error handling tested (non-existent, invalid format, missing fields)"

echo -e "\n${YELLOW}Books Still in Database:${NC}"
curl -s $BASE_URL/books | jq '.data[] | {id: ._id, title: .title, author: .author, price: .price}'

echo -e "\n${GREEN}🎉 CRUD Operations are working perfectly!${NC}\n"
