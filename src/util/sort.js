// sort algorithm
// 1. sort by name
// 2. sort by username
// 3. sort by email
// 4. sort by phone
// 5. sort by website
// 6. sort by company name
// 7. sort by company catch phrase
// 8. sort by company bs
// 9. sort by address street
// 10. sort by address suite
// 11. sort by address city
// 12. sort by address zipcode
// 13. sort by address geo lat
// 14. sort by address geo lng

// sorting using react-router-dom
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
//
const sortBy = (key) => {
  return function (a, b) {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  };
}; // end of sortBy function - it is a higher order function
//
